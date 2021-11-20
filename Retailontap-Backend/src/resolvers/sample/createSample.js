import { response, validateForm, generateRandomString } from '../../utils/functions';
import { Sample, ProjectSupplier, Project } from '../../../models';
import s3Upload from '../../utils/s3Upload';
import * as ImageService from '../../utils/service/ImageService';

export default {
  Mutation: {
    createSample: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        supplier_id: 'required|integer',
        project_id: 'required|integer',
        image:'required|string'
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response('create-sample', 'Validation failed!', 422, errors);
      }

      try {
        const sample = await Sample.create({
          retailer_id: context.authUser.id,
          supplier_id: args.supplier_id,
          project_id: args.project_id,
        }); 

        if (sample) {
          let currentDate = new Date();
          const imageName  = generateRandomString(4)+currentDate.getTime();
          let path = 'samples/' + sample.id;
          let uploadedImage = null;

          await s3Upload(args.image, path, imageName).then(function (res, err) {
            if (res && res.key) {
              uploadedImage = res;
            }
          });

          if (uploadedImage && uploadedImage.key) {
            await ImageService.createOrUpdateImage(
              'Sample',
              sample.id,
              uploadedImage.key,
              null,
              false
            );
          } else {
            return response(
              'create-sample',
              'Upload sample image failed!',
              400
            );
          }

          await ProjectSupplier.update(
            {
              status_id: 3,
            },
            {
              where: {
                project_id: args.project_id,
                supplier_id: args.supplier_id
              },
            }
          );
          await Project.update(
            {
              status: 'Sample Requested',
            },
            {
              where: {
                id: args.project_id,
              },
            }
          );
          return {
            path: 'create-sample',
            message: 'Sample created successfully!',
            code: 200,
            errors: null,
          };
        }
      } catch (e) {
        return {
          path: 'create-sample',
          message: 'Sample create  failed!',
          code: 400,
          errors: null,
        };
      }
    },
  },
};
