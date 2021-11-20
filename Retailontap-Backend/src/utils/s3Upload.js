import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.CONNECTION_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.CONNECTION_AWS_SECRET_ACCESS_KEY,
});

const s3Upload = async (base64, path, fileName) => {
  // Let's assume the variable "base64" is one.
  const base64Data = new Buffer.from(
    base64.replace(/^data:image\/\w+;base64,/, ' '),
    'base64'
  );

  // Getting the file type, ie: jpeg, png or gif
  const type = base64.split(';')[0].split('/')[1];

  const s3 = new AWS.S3();
  const res = await new Promise((resolve, reject) => {
    s3.upload(
      {
        Bucket: process.env.CONNECTION_AWS_BUCKET,
        Body: base64Data,
        ACL: 'public-read',
        Key: path + '/' + fileName + '.' + type,
        ContentEncoding: 'base64', // required
        ContentType: `image/${type}`, // required. Notice the back ticks
      },
      (err, data) => (err == null ? resolve(data) : reject(err))
    );
  });
  return res;
};

export default s3Upload;
