const { Op } = require('sequelize');
import { response, validateForm } from '../../utils/functions';
import { Conversation, Hashtag, Image, Organisation, Project, User, ProjectSupplier, ProjectStatus, Product } from '../../../models';


export default {
  Mutation: {
    filterProject: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        retailerOrSupplierId: 'integer',
        date_added: 'string',        
        product_company_id:'integer'
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('filter-project', 'Validation failed!', 422, errors);
      }

      let projectCondition = {};
      let supplierCondition = {};         
      let existingHashtags = [];
      let hashtagCondition = {};
      let productCondition = {};

      const type = context.authUser.organisation[0].organisation_type;
      if (type === 'retailer') {                 
        projectCondition = {
          created_by: context.authUser.id
        }
      } else {                  
        supplierCondition = {
          supplier_id: context.authUser.id     
        }
      }

      if (args.retailerOrSupplierId && args.retailerOrSupplierId>0){
        if (type === 'retailer') { 
          supplierCondition = {
            supplier_id : args.retailerOrSupplierId            
          }
        } else { 
          projectCondition ={
            created_by : args.retailerOrSupplierId  
          }          
        }
      }

      if (args.date_added) {        
        projectCondition['created_at'] = args.date_added;
      }

      if (args.hashtags && args.hashtags.length) {
        args.hashtags.map((hashtag) => {
          if (hashtag.id && hashtag.id>0) {
            existingHashtags.push(hashtag.id);
          }
        });

        hashtagCondition = {
          id: { [Op.in]: existingHashtags }
        }
      }

      if(args.product_company_id && args.product_company_id>0) {        
        let productList = await Product.findAll({
          where: {
            organisation_id: args.product_company_id         
          },
        });

        let productIds = [];

        if(productList && productList.length>0){
          productList.map((product) => {
            productIds.push(product.id);
          });

          if (productIds && productIds.length > 0) {
            productCondition = {
              [Op.in]: productIds
            };

            projectCondition['product_id'] = { productCondition };
          }
        }  
      }

      console.log("projectCondition :" , projectCondition);
      console.log("supplierCondition :" , supplierCondition);
      const project = await Project.findAll({
        where: projectCondition || {},
        include: [
          {
            model:ProjectSupplier,
            as:'projectsuppliers', 
            required: false,
            where: supplierCondition || {},
            order: [['updated_at', 'DESC']],
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
            model: Conversation,
            as: 'conversations',
            required: false,         
            include: [
              {
                model: User,
                as: 'participants',
              },
            ],
          },
          {
            model: Hashtag,
            as: 'hashtags',
            where: hashtagCondition || {},
          },
          {
            model: Image,
            as: 'images',
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
          },
        ],
      });

      return project;
    },
  },
};