import * as ReportDashboard from '../../../utils/service/ReportDashboard';
import * as ProjectService from '../../../utils/service/ProjectService';
import Sequelize from 'sequelize';
const Op = Sequelize.Op;

export default {
  Query: {
    projectCountDetails: async (parent, args, context) => {     
      let conditionGetProjects;
      let conditionGetProjectCounts;

      if(context.authUser.organisation[0].organisation_type==="retailer"){
        conditionGetProjects = {
          projectCondition: {
            organisation_id: context.authUser.organisation[0].id,
            created_by:context.authUser.id,
          },
          conversationCondition: {
            method: 'project conversation',
            supplier_id: args.id
          },
          supplierCondition: {
            supplier_id: args.id
          },
          required: false,
        };
      }
      else {       
        conditionGetProjects = {
          projectCondition: {            
            created_by: args.id
          },
          conversationCondition: {
            method: 'project conversation',
            supplier_id:context.authUser.id,
          },
          supplierCondition: {
            supplier_id: context.authUser.id
          },
          required: true,
        }
      }

      const getProjects = await ProjectService.getProjects({
        condition: conditionGetProjects,
      });
         
      if(context.authUser.organisation[0].organisation_type==="retailer"){
        conditionGetProjectCounts = {
          user_id:context.authUser.id,
          projects: getProjects,
          organisation_id: context.authUser.organisation[0].id,
          userType: true
        };
      }
      else {
        conditionGetProjectCounts = {
          user_id:context.authUser.id,
          projects: getProjects,
          organisation_id: context.authUser.organisation[0].id          
        };
      }

      const projectCount = await ReportDashboard.GetProjectNetworkCount(conditionGetProjectCounts);

      return projectCount;      
    }
  }
}