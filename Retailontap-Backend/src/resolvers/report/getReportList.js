import {
  Image,
  Report,
  ReportColumn,
  ReportPage,
  ReportType,
} from '../../../models';
import ReportPageImage from '../../../models/ReportPageImage';
import ReportImageDetail from '../../../models/ReportImageDetail';

export default {
  Query: {
    reports: async (parent, args, context) => {
      return Report.findAll({
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
            attributes: ['id', 'subject', 'description'],
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
