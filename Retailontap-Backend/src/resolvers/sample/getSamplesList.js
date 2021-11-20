import { Op } from 'sequelize';
import { response, validateForm } from '../../utils/functions';
import * as SampleService from '../../utils/service/SampleService';
import * as ReportDashboard from '../../utils/service/ReportDashboard';

export default {
  Query: {
    samples: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        project_id: 'integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('get-samples', 'Validation failed!', 422, errors);
      }
      const condition = {
        aliasUser: '',
        sample: {},
      };
      const type = context.authUser.organisation[0].organisation_type;
      const ids = await ReportDashboard.getIdsByRoleTeamAdminAndOwnerSame({
        context,
      });
      if (type === 'retailer') {
        condition.aliasUser = 'supplier';
        condition.sample = {
          retailer_id: {
            [Op.in]: ids,
          },
          is_show: true,
        };
      } else {
        condition.aliasUser = 'retailer';
        condition.sample = {
          supplier_id: {
            [Op.in]: ids,
          },
        };
      }
      if (args.project_id) {
        condition.sample['project_id'] = args.project_id;
      }
      const samples = await SampleService.getSamples({ condition });
      return samples;
    },
  },
};
