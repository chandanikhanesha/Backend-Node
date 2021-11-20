import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.CONNECTION_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.CONNECTION_AWS_SECRET_ACCESS_KEY,
});

const s3FileUpload = async (base64Data, path, type, fileName) => {
    // Getting the file type, ie: jpeg, png or gif
    const extension = base64Data.split(';')[0].split('/')[1];

    let base64;

    if (base64Data.includes('image')) {
        base64 = new Buffer.from(
            base64Data.replace(/^data:image\/\w+;base64,/, ' '),
            'base64'
        );
    }
    else {
        base64 = new Buffer.from(
            base64Data.replace(/^data:application\/\w+;base64,/, ' '),
            'base64'
        );
    }

    const s3 = new AWS.S3();
    const res = await new Promise((resolve, reject) => {
        s3.upload(
            {
                Bucket: process.env.CONNECTION_AWS_BUCKET,
                Body: base64,
                ACL: 'public-read',
                Key: path + '/' + fileName + '.' + extension,
                ContentEncoding: 'base64', // required
                ContentType: type, // required. Notice the back ticks
            },
            (err, data) => (err == null ? resolve(data) : reject(err))
        );
    });
    return res;
}

export default s3FileUpload;