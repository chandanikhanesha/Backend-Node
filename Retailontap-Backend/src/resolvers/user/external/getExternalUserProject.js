import { Project, User, Organisation, ProjectSupplier, ProjectStatus } from '../../../../models';
import { response, validateForm } from '../../../utils/functions';
import * as OrganisationService from '../../../utils/service/OrganisationService';

export default {
  Mutation: {
    externalUserProjectDetails: async (parent, args, context) => {
      let errors = null;
      let quotationRequested = 0;
      let orderRequsted = 0;
      let orderReceived = 0;
      let sampleRequested=0;
      let quotationReceived=0;
      let sampleReceived=0;

      const validationRule = {
        id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('get-external-user-project', 'Validation failed!', 422, errors);
      }

      let user = await User.findOne({ where: { id: args.id } });

      if (!user) {
        return {
          path: 'get-external-user-project',
          message: 'User not found!',
          code: 400,
          errors: null        
        };
      }

      let externalUserCondition = { id: args.id };
      const searchCondition = {
        externalUserCondition,
      };
      const externalUser = await OrganisationService.searchAllExternalUsers(
        context,
        searchCondition
      );
     
      if (!externalUser || externalUser===[] || externalUser.length===0) {
        return {
          path: 'get-external-user-project',
          message: 'User does not exist in your external network!',
          code: 400,
          errors: null        
        };
      }

      let createdBy;
      let supplierId;

      const type = context.authUser.organisation[0].organisation_type;
      if (type === 'retailer') {       
         createdBy= context.authUser.id;
         supplierId= args.id;
      } else {       
         supplierId = context.authUser.id;
         createdBy = args.id;
      }

      const projects = await Project.findAll({
        where: {                        
          created_by: createdBy
        },
        include: [
          {
            model:ProjectSupplier,
            as:'projectsuppliers',
            required:true,
            where: {
              supplier_id: supplierId
            },
            include: [
              {
                model: ProjectStatus,
                as: 'projectstatus',
                attributes: ['id', 'name'],
              },
              {
                model: User,
                as: 'supplier',
                attributes: ['id', 'first_name', 'last_name'],               
                include: [
                  {
                    model: Organisation,
                    as: 'organisation',
                    attributes: ['id', 'name'],
                  },
                ],
              }
            ]
          },
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'first_name', 'last_name'],
            include: [
              {
                model: Organisation,
                as: 'organisation',
                attributes: ['id', 'name'],
              },
            ],
          }
        ]
      });

      if (projects && projects.length>0) {
          sampleRequested = projects.filter(x => x.projectsuppliers && x.projectsuppliers.length > 0 && x.projectsuppliers[0].status_id === 3).length;          
          sampleReceived = projects.filter(x => x.projectsuppliers && x.projectsuppliers.length > 0 && x.projectsuppliers[0].status_id === 4).length;          
          quotationRequested = projects.filter(x => x.projectsuppliers && x.projectsuppliers.length > 0 && x.projectsuppliers[0].status_id === 5).length;          
          quotationReceived = projects.filter(x => x.projectsuppliers && x.projectsuppliers.length > 0 && x.projectsuppliers[0].status_id === 6).length;          
          orderRequsted = projects.filter(x => x.projectsuppliers && x.projectsuppliers.length > 0 && x.projectsuppliers[0].status_id === 7).length;          
          orderReceived = projects.filter(x => x.projectsuppliers && x.projectsuppliers.length > 0 && x.projectsuppliers[0].status_id === 8).length;                 
      }

      const result = {
        sample_requested: sampleRequested,
        sample_received: sampleReceived,
        quotation_requested:quotationRequested,
        quotation_received: quotationReceived,
        order_requested:orderRequsted,
        order_received:orderReceived,        
        projects
      };

      return {
        path: 'get-external-user-project',
        message: 'get-external-user-project',
        code: 200,
        errors: null,
        projectdetails:result
      }
    }
  }
}