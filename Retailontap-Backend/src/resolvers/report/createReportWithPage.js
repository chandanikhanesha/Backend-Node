const Promise = require('bluebird');
import * as ReportService from '../../utils/service/ReportService';
import s3FileUpload from '../../utils/s3FileUpload';
import { validateForm, generateRandomString } from '../../utils/functions';
import {
    ReportPage,
    ReportImageDetail,
    ReportPageImage,
    Report,
} from '../../../models';

export default {
  Mutation: {
    createReportWithPage: async (parent, args, context) => {
      let errors = null;
      let uploadedFile = null;

      const validationRule = {
        name: 'required|string',
        type_id: 'required|integer',
        template_id: 'required|integer',
        cover_image: 'string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);       
        return {
          path: 'create-report-with-page',
          message: 'Validation failed!',
          code: 422,
          errors: errors,
          file_path:null
        };
      }

      try {
        // create report
        const report = await Report.create({
          name: args.name,
          type_id: args.type_id,
          user_id: context.authUser.id,
          cover_title: args.cover_title 
        });

        if(report && report.id){
          // create cover image
          if (args.cover_image) {
            await ReportService.associateImages({
              item_id: report.id,
              image: args.cover_image,
              folder: 'reports',
              model: 'Report',
              subFolder: 'coverImage',
              report_id: report.id,
            });
          }
          await Promise.map(args.pages, async ({ subject, description, columns }) => {
          const reportPage = await ReportPage.create({
            report_id: report.id,
            subject,
            description
          });
            await Promise.map(
              columns,
              async ({ column_id, image, supplier_name, unit }) => {
                const imageDetail = await ReportImageDetail.create({
                  supplier_name,
                  unit,
                });
                await ReportService.associateImages({
                  item_id: imageDetail.id,
                  image,
                  folder: 'reports',
                  model: 'Page',
                  subFolder: 'pageImages',
                  report_id: report.id,
                });
                await ReportPageImage.create({
                  page_id: reportPage.id,
                  column_id,
                  report_image_detail_id: imageDetail.id,
                });
              }
            );
          });         
          //upload PDF File
          if (args.file_content!==null && args.file_content!=='') {
            let path = 'reports/' + report.id + '/pageFiles';
            let currentDate = new Date();
            let fileName = generateRandomString(4)+currentDate.getTime();

            await s3FileUpload(args.file_content, path, 'application/pdf',fileName).then(function (res, err) {
              if (res && res.key) {
                uploadedFile = res.key;
              }
            });
          }
          //add report template_id
          await Report.update(
            { template_id: args.template_id, file_path:uploadedFile },
            {
              where: {
                id: report.id,
              },
            }
          );

          return {
            path: 'create-report-with-page',
            message: 'Report created successfully!',
            code: 200,
            errors: null,
            file_path:uploadedFile
          };
        } else {
          return {
            path: 'create-report-with-page',
            message: 'Report create failed!',
            code: 400,
            errors: null,
            file_path:null
          };
        }
      } catch (e) {
        return {
          path: 'create-report-with-page',
          message: 'Report with page create failed!',
          code: 400,
          errors: null,
          file_path:null
        };
      }
    },
  },
};