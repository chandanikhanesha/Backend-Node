import { response, validateForm } from '../../utils/functions';
import { Language, TimeZone } from '../../../models';

export default {
  Mutation: {
    updateTimeAndLocale: async (parent, args, context) => {
      let errors = {};
      let isValid = true;
      const validationRule = {
        language_id: 'required|integer',
        time_zone_id: 'required|integer',
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          'update-time-and-locale',
          'Validation failed!',
          422,
          errors
        );
      }

      const language = await Language.findOne({
        where: { id: args.language_id },
      });

      if (!language || !language.id) {
        isValid = false;
        errors.language_id =
          'The language id does not exist in languages table.';
      }
      const timeZone = await TimeZone.findOne({
        where: { id: args.time_zone_id },
      });

      if (!timeZone || !timeZone.id) {
        isValid = false;
        errors.time_zone_id =
          'The time zone id does not exist in the timezones table.';
      }

      if (isValid) {
        const userSettings = {
          language_id: args.language_id,
          time_zone_id: args.time_zone_id,
        };

        const user = await context.authUser.update(userSettings);

        return response(
          'update-time-and-locale',
          'Time-and-Locale updated successfully!',
          200,
          null
        );
      }

      return response(
        'update-time-and-locale',
        'Validation failed!',
        422,
        errors
      );
    },
  },
};
