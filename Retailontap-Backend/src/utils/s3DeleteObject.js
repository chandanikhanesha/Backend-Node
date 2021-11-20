import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.CONNECTION_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.CONNECTION_AWS_SECRET_ACCESS_KEY,
});

const s3DeleteObject = async (path) => {
  const s3 = new AWS.S3();
  const res = await new Promise((resolve, reject) => {
    s3.deleteObject(
      {
        Bucket: process.env.CONNECTION_AWS_BUCKET,
        Key: path,
      },
      (err, data) => (err == null ? resolve(data) : reject(err))
    );
  });
  return res;
};

export default s3DeleteObject;
