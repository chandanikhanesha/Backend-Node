import { Organisation, Country, TimeZone, Image } from '../../../models';
import { response, generateRandomString } from '../../utils/functions';
import validator from '../../utils/validator';
import s3Upload from '../../utils/s3Upload';
import s3DeleteObject from '../../utils/s3DeleteObject';
import * as ImageService from '../../utils/service/ImageService';

export default {
  Mutation: {
    updateOrganisation: async (parent, args, context) => {
      let isValid = false;
      let errors = {};
      let uploadedImage = null;

      const validationRule = {
        id: 'required|integer',
        name: 'required|string',
        description: 'string',
        domains_url: 'string',
        privacy_url: 'string',
        country_id: 'required|integer',
        time_zone_id: 'required|integer',
      };

      await validator(args, validationRule, {}, (err, status) => {
        if (!status) {
          isValid = false;
          errors = err.errors;
        } else {
          isValid = true;
        }
      });

      //get country by id
      const country = await Country.findOne({
        where: { id: args.country_id },
      });

      if (!country || !country.id) {
        isValid = false;
        errors.country_id = 'The country id does not exist in countries table.';
      }

      //get time zone by id
      const time_zone = await TimeZone.findOne({
        where: { id: args.time_zone_id },
      });

      if (!time_zone || !time_zone.id) {
        isValid = false;
        errors.time_zone_id =
          'The time zone id does not exist in the timezones table.';
      }

      if (!isValid) {
        errors = JSON.stringify(errors);
        return response(
          'update-organisation',
          'Validation failed!',
          422,
          errors
        );
      }

      //get organisation by id
      const organisation = await Organisation.findOne({
        where: { id: args.id },
        include: [                      
            {
              model: Image,
              as: 'logo',
              attributes: ['id', 'imagable_id', 'imagable_type', 'thumbnail'],
            },
          ]
      });

      if (organisation) {
        if (args.logo !== null && args.update_logo === true) {
          if (organisation.logo && organisation.logo.thumbnail) {
            await s3DeleteObject(organisation.logo.thumbnail).then(
              function (res, err) {
                if (res) {
                    // Deleted //
                }
              }
            );
          }

          let currentDate = new Date();
          const imageName  = generateRandomString(4)+currentDate.getTime();
          let path = 'organisations/' + context.authUser.organisation[0].id;

          await s3Upload(args.logo, path, imageName).then(
            function (res, err) {
              if (res && res.key) {
                uploadedImage = res;                 
              }
            }
          );

          if (uploadedImage && uploadedImage.key) {
            await ImageService.createOrUpdateImage(
              'Organisation',
              organisation.id,
              uploadedImage.key,
              null,
              false
            );
          } else {
            return response(
              'update-organisation',
              'Upload organisation logo failed!',
               400
            );
          }          
        }

        // update organisation
        await Organisation.update(args, { where: { id: args.id } });
        return response(
          'update-organisation',
          'Organisation updated successfully!',
          200
        );
      } else {
        //organisation not found
        return response('update-organisation', 'Organisation not found!', 400);
      }
    },
  },
};
