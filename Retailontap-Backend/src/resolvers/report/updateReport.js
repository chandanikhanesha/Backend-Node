const Promise = require('bluebird');
import { validateForm } from '../../utils/functions';
import { Report, Image } from '../../../models';
import ReportPageImage from '../../../models/ReportPageImage';
import ReportImageDetail from '../../../models/ReportImageDetail';
import * as ReportService from '../../utils/service/ReportService';
import * as ImageService from '../../utils/service/ImageService';

export default {
  Mutation: {
    updateReport: async (parent, args, context) => {
      let errors = null;
     
      const validationRule = {
        report_id: 'required|integer',
        page_id: 'integer',
        column_id: 'integer',
        name: 'string',
        cover_image: 'string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        
        return {
          path: 'update-report',
          message: 'Validation failed!',
          code: 422,
          errors: errors          
        };
      }
      try {
        if ('cover_image' in args) {
          await ReportService.associateUpdateImages({
            item_id: args.report_id,
            image: args.cover_image,
            folder: 'reports',
            model: 'Report',
            subFolder: 'coverImage',
            report_id: args.report_id,
          });
        }

        if (args.name) {
          await Report.update(
            {
              name: args.name,
              cover_title: args.cover_title,
              file_path: args.file_path
            },
            {
              where: {
                id: args.report_id,
              },
            }
          );
        }
        await Promise.map(args.images, async (item) => {
          let imageDetailId = item.id;
          let createDetail = false;
          if (item.id && ('supplier_name' in item || 'unit' in item)) {
            imageDetailId = item.id;
            await ReportImageDetail.update(
              {
                supplier_name: item.supplier_name,
                unit: item.unit,
              },
              {
                where: {
                  id: item.id,
                },
              }
            );
          } else if (
            !item.id &&
            ('supplier_name' in item || 'unit' in item || item.image)
          ) {
            createDetail = true;
            const imageDetail = await ReportImageDetail.create({
              supplier_name: item.supplier_name,
              unit: item.unit,
            });
            imageDetailId = imageDetail.id;
          }
         
          if(item.image!==null && item.image!=='') {
            await ImageService.createOrUpdateImage(
              'Page',
              imageDetailId,
              item.image,
              null,
              true
            );
          } else {
            const img = await Image.findOne({
                where: { imagable_id: imageDetailId, imagable_type: 'Page' },
            });

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
              where: { imagable_id: imageDetailId, imagable_type: 'Page' },
            });
          }

          if (!item.id && createDetail) {
            await ReportPageImage.create({
              page_id: args.page_id,
              column_id: args.column_id,
              report_image_detail_id: imageDetailId,
            });
          }
        });

        return {
          path: 'update-report',
          message: 'Report updated successfully!',
          code: 200,
          errors: null          
        };
      } catch (e) {
        return {
          path: 'update-report',
          message: 'Report update failed!',
          code: 400,
          errors: null          
        };
      }
    },
  },
};
