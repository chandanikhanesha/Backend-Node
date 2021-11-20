const Promise = require('bluebird');
import { generateRandomString } from '../functions';
import s3Upload from '../s3Upload';
import * as ImageService from './ImageService';
import AWS from 'aws-sdk';
import { Image } from '../../../models';

export const associateImages = async ({
  item_id,
  image,
  folder,
  model,
  subFolder,
  report_id,
}) => {
  let currentDate = new Date();
  const imageName = generateRandomString(4)+currentDate.getTime();
  let uploadedImage = null;
  await s3Upload(image, `${folder}/${report_id}/${subFolder}`, imageName).then(
    function (res) {
      if (res && res.key) {
        uploadedImage = res;
      }
    }
  );

  if (uploadedImage && uploadedImage.key) {
    await ImageService.createOrUpdateImage(
      model,
      item_id,
      uploadedImage.key,
      null,
      true
    );
  }
};

export const associateUpdateImages = async ({
  item_id,
  image,
  folder,
  model,
  subFolder,
  report_id,
}) => {
  const s3 = new AWS.S3();
  let currentDate = new Date();
  const imageName = generateRandomString(4)+currentDate.getTime();
  let uploadedImage = null;
  const img = await Image.findOne({
    where: { imagable_id: item_id, imagable_type: model },
  });
  if (image) {
    await s3Upload(
      image,
      `${folder}/${report_id}/${subFolder}`,
      imageName
    ).then(function (res) {
      if (res && res.key) {
        uploadedImage = res;
      }
    });
    if (img) {
      const delParams = {
        Bucket: process.env.CONNECTION_AWS_BUCKET,
        Key: img.thumbnail,
      };
      await new Promise((resolve, reject) => {
        s3.deleteObject(delParams, (err, data) =>
          err == null ? resolve(data) : reject(err)
        );
      });
      await Image.update(
        { thumbnail: uploadedImage.key },
        {
          where: { imagable_id: item_id, imagable_type: model },
        }
      );
      return;
    }

    if (uploadedImage && uploadedImage.key) {
      await ImageService.createOrUpdateImage(
        model,
        item_id,
        uploadedImage.key,
        null,
        true
      );
    }
  } else if (img) {
    const delParams = {
      Bucket: process.env.CONNECTION_AWS_BUCKET,
      Key: img.thumbnail,
    };
    await new Promise((resolve, reject) => {
      s3.deleteObject(delParams, (err, data) =>
        err == null ? resolve(data) : reject(err)
      );
    });
    await Image.destroy({
      where: { imagable_id: item_id, imagable_type: model },
    });
  }
};
