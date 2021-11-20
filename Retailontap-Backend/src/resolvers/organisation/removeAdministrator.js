import { UserOrganisationRole } from "../../../models";
import { response, validateForm } from "../../utils/functions";

export default {
  Mutation: {
    removeAdministrator: async (parent, args, context) => {
      let errors = {};
      const validationRule = {
        id: "required|integer",
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response(
          "remove-administrator",
          "Validation failed!",
          422,
          errors
        );
      }

      const userOrganisationRole = await UserOrganisationRole.findOne({
        where: {
          user_id: args.id,
          role_id: 2, // Administrator
          organisation_id: context.authUser.organisation[0].id,
        },
      });

      try {
        if (userOrganisationRole) {
          await userOrganisationRole.update({
            role_id: 3, //Change role to standard user
          });

          return response(
            "remove-administrator",
            "Administrator removed successfully.",
            200,
            null
          );
        } else {
          return response(
            "remove-administrator",
            "Administrator not found.",
            400,
            null
          );
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
