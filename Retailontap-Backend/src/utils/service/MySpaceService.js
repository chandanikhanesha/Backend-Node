const Promise = require('bluebird');
import AWS from 'aws-sdk';

export const createFolder = async ({ folderName, key }) => {
    const s3 = new AWS.S3();
    const res = await new Promise((resolve, reject) => {
        s3.upload(
            {
                Bucket: process.env.CONNECTION_AWS_BUCKET,
                Body: '',
                ACL: 'public-read',
                Key: `${key}${folderName}/`,
            },
            (err, data) => (err == null ? resolve(data) : reject(err))
        );
    });
    return res;
};

export const createFile = async ({ files, key }) => {
    const s3 = new AWS.S3();
    const res1 = [];
    await Promise.map(files, async ({ name, file: base64 }) => {
        const contentType = base64.split(';')[0].split(':')[1];
        const content = contentType && contentType.split('/')[0];
        const type = base64.split(';')[0].split('/')[1];
        const replace = '^data:' + content + '\\/\\w+;base64,';
        const regexp = new RegExp(replace);
        const base64Data = new Buffer.from(base64.replace(regexp, ' '), 'base64');
        await new Promise((resolve, reject) => {
            s3.upload(
                {
                    Bucket: process.env.CONNECTION_AWS_BUCKET,
                    Body: base64Data,
                    ACL: 'public-read',
                    Key: `${key}${name}.${type}`,
                    ContentEncoding: 'base64', // required
                    ContentType: contentType, // required. Notice the back ticks
                },
                (err, data) => (err == null ? resolve(data) : reject(err))
            );
        }).then(function (res) {
            if (res && res.key) {
                res1.push(res);
            }
        });
    });

    return res1;
};

export const getFolderFileLists = async ({ key }) => {
    const s3 = new AWS.S3();
    const params = {
        Bucket: process.env.CONNECTION_AWS_BUCKET,
        Delimiter: '/',
        Prefix: key,
    };
    const res = await new Promise((resolve, reject) => {
        s3.listObjects(params, function (err, data) {
            if (err) reject(err);
            const { Contents = [], CommonPrefixes = [] } = data;
            Contents.map(({ Key }, index) => {
                if (index !== 0) {
                    CommonPrefixes.push({ Prefix: Key });
                }
            });
            resolve(CommonPrefixes);
        });
    });
    return res;
};

export const renameAndMoveFolderFile = async ({ newKey, oldKey }) => {
    const s3 = new AWS.S3();
    const BucketName = process.env.CONNECTION_AWS_BUCKET;
    if (newKey[newKey.length - 1] !== '/') {
        const copyParams = {
            Bucket: BucketName,
            CopySource: `${BucketName}/${oldKey}`,
            Key: newKey,
            ACL: 'public-read',
        };
        const delParams = {
            Bucket: BucketName,
            Key: oldKey,
        };
        await new Promise((resolve, reject) => {
            s3.copyObject(copyParams, (err, data) =>
                err == null ? resolve(data) : reject(err)
            );
        });
        await new Promise((resolve, reject) => {
            s3.deleteObject(delParams, (err, data) =>
                err == null ? resolve(data) : reject(err)
            );
        });
    } else {
        const params = {
            Bucket: BucketName,
            Delimiter: '/',
            Prefix: oldKey,
        };
        await recursiveFunction({ params, newKey, action: renameMoveAction });
    }
};

export const renameMoveAction = ({ params, fileKey, newKey, reject }) => {
    const s3 = new AWS.S3();
    const BucketName = process.env.CONNECTION_AWS_BUCKET;
    const copyParams = {
        Bucket: BucketName,
        CopySource: BucketName + '/' + fileKey,
        Key: fileKey.replace(params.Prefix, newKey),
    };
    const delParams = {
        Bucket: BucketName,
        Key: fileKey,
    };

    s3.copyObject(copyParams, (err, data) => {
        if (err) {
            reject();
        } else {
            s3.deleteObject(delParams, (err, data) => {
                if (err) {
                    reject();
                }
            });
        }
    });
};

export const deleteFolderFile = async ({ key }) => {
    const s3 = new AWS.S3();
    const BucketName = process.env.CONNECTION_AWS_BUCKET;
    if (key[key.length - 1] !== '/') {
        const delParams = {
            Bucket: BucketName,
            Key: key,
        };

        const folderOfDeletedFile = key.slice(0, key.lastIndexOf('/') + 1);
        const params = {
            Bucket: BucketName,
            Delimiter: '/',
            Prefix: folderOfDeletedFile,
        };
        await new Promise((resolve, reject) => {
            s3.listObjects(params, function (err, data) {
                s3.deleteObject(delParams, (err, data) => {
                    if (err) {
                        reject();
                    } else {
                        resolve(data);
                    }
                });
                if (data.Contents.length === 2 && data.CommonPrefixes.length === 0) {
                    s3.upload(
                        {
                            Bucket: BucketName,
                            Body: '',
                            ACL: 'public-read',
                            Key: folderOfDeletedFile,
                        },
                        (err, data) => {
                            if (err) {
                                reject();
                            } else {
                                resolve(data);
                            }
                        }
                    );
                }
            });
        });
    } else {
        const params = {
            Bucket: BucketName,
            Delimiter: '/',
            Prefix: key,
        };
        await recursiveFunction({ params, newKey: key, action: deleteAction });
    }
};
export const deleteAction = ({ fileKey, reject }) => {
    const s3 = new AWS.S3();
    const BucketName = process.env.CONNECTION_AWS_BUCKET;
    const delParams = {
        Bucket: BucketName,
        Key: fileKey,
    };
    s3.deleteObject(delParams, (err, data) => {
        if (err) {
            reject();
        }
    });
};

export const copyFolderFile = async ({ newKey, oldKey }) => {
    const s3 = new AWS.S3();
    const BucketName = process.env.CONNECTION_AWS_BUCKET;
    if (oldKey[oldKey.length - 1] !== '/') {
        const copyParams = {
            Bucket: BucketName,
            CopySource: `${BucketName}/${oldKey}`,
            Key: newKey,
            ACL: 'public-read',
        };
        await new Promise((resolve, reject) => {
            s3.copyObject(copyParams, (err, data) =>
                err == null ? resolve(data) : reject(err)
            );
        });
    } else {
        const params = {
            Bucket: BucketName,
            Delimiter: '/',
            Prefix: oldKey,
        };
        await recursiveFunction({ params, newKey, action: copyAction });
    }
};

export const copyAction = ({ params, fileKey, newKey, reject }) => {
    const s3 = new AWS.S3();
    const BucketName = process.env.CONNECTION_AWS_BUCKET;
    const copyParams = {
        Bucket: BucketName,
        CopySource: BucketName + '/' + fileKey,
        Key: fileKey.replace(params.Prefix, newKey),
    };
    s3.copyObject(copyParams, function (copyErr, copyData) {
        if (copyErr) {
            reject();
        }
    });
};

export const recursiveFunction = async ({ params, newKey, action }) => {
    const s3 = new AWS.S3();
    const BucketName = process.env.CONNECTION_AWS_BUCKET;

    new Promise((resolve, reject) => {
        s3.listObjects(params, async function (err, data) {
            if (data.Contents.length) {
                await Promise.map(data.Contents, ({ Key: fileKey }) => {
                    action({ params, fileKey, newKey, reject });
                });
            }
            if (data.CommonPrefixes.length) {
                await Promise.map(data.CommonPrefixes, async ({ Prefix }) => {
                    const params = {
                        Bucket: BucketName,
                        Delimiter: '/',
                        Prefix,
                    };
                    const oldKeyLastPart = Prefix.split('/');
                    const key = `${newKey}${oldKeyLastPart[oldKeyLastPart.length - 2]}/`;
                    await recursiveFunction({ params, newKey: key, action });
                });
            }
        });
    });
};

export const getAction = async ({ folderName, key, reject }) => {
    const s3 = new AWS.S3();
    const params = {
        Bucket: process.env.CONNECTION_AWS_BUCKET,
        Delimiter: '/',
        Prefix: key,
    };
    const res = await new Promise((resolve, reject) => {
        s3.listObjects(params, function (err, data) {
            if (err) reject(err);
            const { CommonPrefixes = [] } = data;
            let folderExists = false;
            CommonPrefixes.map((p) => {
                //console.log("p: " + p.Prefix.search('/' + folderName + '/'));
                if (p.Prefix.search('/' + folderName + '/') > 0) {
                    folderExists = true;
                }
            });
            resolve(folderExists);
        });
    });
    return res;
};
