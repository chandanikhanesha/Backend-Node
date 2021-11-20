const Promise = require('bluebird');
import * as ReportService from '../../utils/service/ReportService';
import * as ImageService from '../../utils/service/ImageService';
import { validateForm } from '../../utils/functions';
import {
  ReportPage,
  ReportImageDetail,
  ReportPageImage,
  Report,
} from '../../../models';

export default {
  Mutation: {
    createReportPage: async (parent, args, context) => {
      let errors = null;
     
      const validationRule = {
        report_id: 'required|integer',
        template_id: 'required|integer',
        cover_image: 'string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);        
        return {
          path: 'create-report-page',
          message: 'Validation failed!',
          code: 422,
          errors: errors          
        };
      }

      try {
        // crete cover image
        if (args.cover_image && args.cover_image!=='') {
          await ReportService.associateImages({
            item_id: args.report_id,
            image: args.cover_image,
            folder: 'reports',
            model: 'Report',
            subFolder: 'coverImage',
            report_id: args.report_id,
          });
        }
        await Promise.map(args.pages, async ({subject, description, columns }) => {
          const reportPage = await ReportPage.create({
            report_id: args.report_id,
            subject:subject,
            description:description
          });
          await Promise.map(
            columns,
            async ({ column_id, image, supplier_name, unit }) => {
              const imageDetail = await ReportImageDetail.create({
                supplier_name,
                unit,
              });

              await ImageService.createOrUpdateImage(
                'Page',
                imageDetail.id,
                image,
                null,
                true
              );
             
              await ReportPageImage.create({
                page_id: reportPage.id,
                column_id,
                report_image_detail_id: imageDetail.id,
              });
            }
          );
        });              
        //add report template_id
        await Report.update(
          { template_id: args.template_id, cover_title: args.cover_title, file_path: args.file_path },
          {
            where: {
              id: args.report_id,
            },
          }
        );
        return {
          path: 'create-report-page',
          message: 'Report Page created successfully!',
          code: 200,
          errors: null          
        };
      } catch (e) {
        return {
          path: 'create-report-page',
          message: 'Report Page create  failed!',
          code: 400,
          errors: null          
        };
      }
    },
  },
};
