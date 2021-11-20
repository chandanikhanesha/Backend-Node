import { response, validateForm } from "../../../utils/functions";
import * as UserService from "../../../utils/service/UserService";

export default {
  Mutation: {
    checkIdentity: async (parent, args, context) => {
      let errors = [];

      const validationRule = {
        work_email: "required|string|email",
      };

      const validation = await validateForm(args, validationRule);
      if (validation.errors) {
        errors = JSON.stringify(validation.errors);
        return response("invite-identity", "Validation failed!", 422, errors);
      }

      const isLicenceAvailable = await UserService.isLicenceAvailable(
        context.authUser.organisation[0].id
      );

      console.log(context.authUser.organisation[0].id, "isLicenceAvailable");
      let message = "";
      if (!isLicenceAvailable) {
        message =
          "We will assign Stakeholder access level to" +
          args.work_email +
          ".You have maxed out your standard licenses, would you like to buy more?";
      }

      return {
        path: "invite-identity",
        message: "Invite identity",
        code: 200,
        errors: null,
        identity: {
          work_email: args.work_email,
          license: isLicenceAvailable,
          message: message,
        },
      };
    },
  },
};
