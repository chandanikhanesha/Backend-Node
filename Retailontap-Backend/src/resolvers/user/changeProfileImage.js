import {
  generateRandomString,
  response,
  validateForm,
} from '../../utils/functions';
import s3Upload from '../../utils/s3Upload';
import * as ImageService from '../../utils/service/ImageService';

export default {
  Mutation: {
    changeProfileImage: async (parent, args, context) => {
      let errors = null;

      const validationRule = {
        image: 'required|string',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'change-profile-image',
          'Validation failed!',
          422,
          errors
        );
      }
      
      let currentDate = new Date();
      const imageName  = generateRandomString(4)+currentDate.getTime();
      let path = 'users/' + context.authUser.id;
      let uploadedImage = null;

      await s3Upload(args.image, path, imageName).then(function (res, err) {
        if (res && res.key) {
          uploadedImage = res;
        }
      });

      if (uploadedImage && uploadedImage.key) {
        await ImageService.createOrUpdateImage(
          'User',
          context.authUser.id,
          uploadedImage.key,
          null,
          false
        );

        return response(
          'change-profile-image',
          'Profile image updated successfully',
          200
        );
      } else {
        return response(
          'change-profile-image',
          'Change profile image failed!',
          400
        );
      }
    },
  },
};
