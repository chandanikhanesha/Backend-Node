import {
  Image,
  Report,
  ReportColumn,
  ReportPage,
  ReportType,
} from '../../../models';
import ReportPageImage from '../../../models/ReportPageImage';
import ReportImageDetail from '../../../models/ReportImageDetail';
import { response, validateForm } from '../../utils/functions';

export default {
  Query: {
    report: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('get-report', 'Validation failed!', 422, errors);
      }
      return Report.findOne({
        where: {
          id: args.id,
        },
        attributes: ['id', 'name', 'user_id', 'template_id', 'cover_title', 'file_path'],
        include: [
          {
            model: ReportType,
            as: 'type',
            attributes: ['name'],
          },
          {
            model: Image,
            as: 'coverImage',
            attributes: ['id', 'thumbnail'],
          },
          {
            model: ReportPage,
            as: 'reportPages',
            attributes: ['id','subject','description'],
            include: [
              {
                model: ReportPageImage,
                as: 'columns',
                attributes: ['id'],
                include: [
                  {
                    model: ReportColumn,
                    as: 'column',
                    attributes: ['id', 'template_id', 'order_id'],
                  },
                  {
                    model: ReportImageDetail,
                    as: 'imageDetail',
                    attributes: ['id', 'supplier_name', 'unit'],
                    include: [
                      {
                        model: Image,
                        as: 'image',
                        attributes: ['id', 'thumbnail'],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      });
    },
  },
};
