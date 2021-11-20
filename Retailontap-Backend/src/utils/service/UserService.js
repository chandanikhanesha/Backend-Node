import { Organisation, Role, User, Image } from "../../../models";
import { generateRandomPassword, generateRandomString } from "../functions";
import * as auth from "./auth";
import * as EmailService from "./EmailService";
import * as UserOrganisationRoleService from "./UserOrganisationRoleService";
import * as ConnectionService from "./ConnectionService";
import sequelize from "sequelize";

export const getUserOrganisation = (owner_id) => {
  return Organisation.findOne({ where: { owner_id } }).then((organisation) => {
    return organisation;
  });
};

export const inviteInternalUser = async (args, item, context, callback) => {
  let errors = [];
  let uuid = null;

  const password = generateRandomPassword();

  //create user in cognito
  await new Promise((resolve) => {
    auth.userRegister(
      item.work_email,
      item.work_email,
      password,
      "1",
      (err, userSub) => {
        if (err) {
          errors.push({
            email: item.work_email,
            message: err.message,
          });
          resolve(true);
        } else {
          uuid = userSub;
          resolve(true);
        }
      }
    );
  });

  //create user in database
  if (uuid) {
    const user = await User.create({
      uuid: uuid,
      work_email: item.work_email,
    });

    if (user && user.id) {
      //check if there is availabel licenses, if not available invite user as stackeholder
      const isAvailable = await isLicenceAvailable(
        context.authUser.organisation[0].id
      );

      let role = parseInt(process.env.STAKEHOLDER_ROLE_ID);
      if (isAvailable) {
        role = args.role_id;
      }

      await UserOrganisationRoleService.create(
        user.id,
        role,
        context.authUser.organisation[0].id
      );
    }

    //send email
    await new Promise((resolve) => {
      EmailService.sendInvitationEmail(
        context.authUser.work_email,
        item.work_email,
        password,
        context.authUser.organisation[0].name,
        (data, err) => {
          if (err) {
            errors.push({
              email: item.work_email,
              message: err.message,
            });
            resolve();
          } else {
            resolve();
          }
        }
      );
    });
  }

  callback(errors);
};

export const sendInternalUserInvitationEmail = async (
  user,
  password,
  context
) => {
  let isEmailSent = false;
  await new Promise((resolve) => {
    EmailService.sendInvitationEmail(
      context.authUser.work_email,
      user.work_email,
      password,
      context.authUser.organisation[0].name,
      (data, err) => {
        if (err) {
          isEmailSent = false;
          resolve();
        } else {
          isEmailSent = true;
          resolve();
        }
      }
    );
  });

  return isEmailSent;
};

export const resendInviteToInternalUser = async (user, context) => {
  let isResendInvitation = false;

  const password = generateRandomPassword();
  await new Promise((resolve) => {
    const passwordUpdated = auth.adminChangePassword(user.uuid, password);
    if (passwordUpdated) {
      //send email
      const isEmailSent = sendInternalUserInvitationEmail(
        user,
        password,
        context
      );
      if (isEmailSent) {
        isResendInvitation = true;
        resolve();
      } else {
        isResendInvitation = false;
        resolve();
      }
    } else {
      isResendInvitation = false;
      resolve();
    }
  });

  return isResendInvitation;
};

export const inviteExternalUser = async (data, context, email, callback) => {
  let errors = [];

  const connection = await ConnectionService.createConnection(data);

  //create user in database
  if (connection) {
    //send email
    await new Promise((resolve) => {
      EmailService.sendExternalUserInvite(
        context.authUser.work_email,
        context.authUser.organisation[0].name,
        `${process.env.APP_URL}/accept/${data.token}`,
        email,
        (data, err) => {
          if (err) {
            errors.push({
              email: email,
              message: err.message,
            });
            resolve();
          } else {
            resolve();
          }
        }
      );
    });
  }

  callback(errors);
};

export const resendInviteToExternalUser = async (user, context, connection) => {
  let isResendInvitation = false;
  let token = generateRandomString(32);

  //send email
  await new Promise((resolve) => {
    EmailService.sendExternalUserInvite(
      context.authUser.work_email,
      context.authUser.organisation[0].name,
      `${process.env.APP_URL}/accept/${token}`,
      user.work_email,
      (data, err) => {
        if (err) {
          isResendInvitation = false;
          resolve();
        } else {
          connection.update({ token: token });
          isResendInvitation = true;
          resolve();
        }
      }
    );
  });

  return isResendInvitation;
};

export const getUserByCustomerId = async (customer_id) => {
  const user = await User.findOne({
    where: {
      stripe_customer_id: customer_id,
    },
    include: [
      {
        model: Organisation,
        as: "organisation",
        attributes: ["id", "name", "deleted_at"],
        paranoid: false,
      },
    ],
  });

  return user;
};

export const getOrganisationUsers = async (
  organisation_id,
  userCondition,
  roleCondition
) => {
  const organisationUsers = await User.findAll({
    where: userCondition,
    // attributes: ['id', 'is_active'],
    include: [
      {
        model: Organisation,
        as: "organisation",
        attributes: ["id", "name", "deleted_at"],
        paranoid: false,
        where: {
          id: organisation_id,
        },
      },
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
        where: roleCondition,
      },
    ],
  });

  return organisationUsers;
};

export const getOrganisationAdminUsers = async (
  organisation_id,
  userCondition
) => {
  const organisationAdminUsers = await User.findAll({
    where: userCondition,
    attributes: ["id", "is_active", "work_email", "first_name", "last_name"],

    include: [
      {
        model: Organisation,
        as: "organisation",
        attributes: ["id", "name", "deleted_at"],
        paranoid: false,
        where: {
          id: organisation_id,
        },
      },
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
        where: {
          id: 2,
        },
      },
      //   {
      //     model: Image,
      //     as: "image",
      //     attributes: ["id", "thumbnail"],
      //   },
    ],
  });

  return organisationAdminUsers;
};

export const getOrganisationStandardUsers = async (
  organisation_id,
  userCondition
) => {
  const organisationStandardUsers = await User.findAll({
    where: userCondition,
    attributes: ["id", "is_active"],
    include: [
      {
        model: Organisation,
        as: "organisation",
        attributes: ["id", "name", "deleted_at"],
        paranoid: false,
        where: {
          id: organisation_id,
        },
      },
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
        where: {
          id: 3,
        },
      },
    ],
  });

  return organisationStandardUsers;
};

//disable user expect owner and 4 other users(because 5 users is free)
export const disableUsers = async (subscription) => {
  const user = await getUserByCustomerId(subscription.data.object.customer);

  const userCondition = {
    is_active: true,
  };

  const roleCondition = {
    id: {
      [sequelize.Op.ne]: parseInt(process.env.STAKEHOLDER_ROLE_ID),
    },
  };

  const organisationUsers = await getOrganisationUsers(
    user.organisation[0].id,
    userCondition,
    roleCondition
  );

  const organisationAdminUsers = await getOrganisationAdminUsers(
    user.organisation[0].id,
    userCondition
  );

  const organisationStandardUsers = await getOrganisationStandardUsers(
    user.organisation[0].id,
    userCondition
  );

  if (
    organisationUsers &&
    organisationUsers.length &&
    organisationUsers.length > process.env.FREE_STANDARD_LICENSE_COUNT
  ) {
    //  need to disable some users

    //check admins count
    if (
      organisationAdminUsers &&
      organisationAdminUsers.length >=
        process.env.FREE_STANDARD_LICENSE_COUNT - 1
    ) {
      //need to keep only process.env.FREE_STANDARD_LICENSE_COUNT - 1 admins
      let adminCount = 0;
      organisationAdminUsers.map((admin) => {
        adminCount++;
        if (adminCount > process.env.FREE_STANDARD_LICENSE_COUNT - 1) {
          admin.update({
            is_active: false,
          });
        }
      });

      organisationStandardUsers.map((standard) => {
        standard.update({
          is_active: false,
        });
      });
    } else if (
      //  if admins count no more than process.env.FREE_STANDARD_LICENSE_COUNT - 1
      organisationAdminUsers &&
      organisationAdminUsers.length <
        process.env.FREE_STANDARD_LICENSE_COUNT - 1
    ) {
      let standardCount = 0;
      organisationStandardUsers.map((standard) => {
        standardCount++;
        if (
          standardCount >
          process.env.FREE_STANDARD_LICENSE_COUNT -
            1 -
            organisationAdminUsers.length
        ) {
          standard.update({
            is_active: false,
          });
        }
      });
    }
  }
};

//activate users by license count
export const activateUsers = async (customerId, licenseQuantity) => {
  const user = await getUserByCustomerId(customerId);

  const userCondition = {};
  const roleCondition = {
    id: {
      [sequelize.Op.ne]: parseInt(process.env.STAKEHOLDER_ROLE_ID),
    },
  };
  const organisationUsers = await getOrganisationUsers(
    user.organisation[0].id,
    userCondition,
    roleCondition
  );
  let organisationActiveAdminUsers = [];
  let organisationDisabledAdminUsers = [];
  let organisationActiveStandardUsers = [];
  let organisationDisabledStandardUsers = [];

  organisationUsers.map((user) => {
    if (user.role && user.role[0] && user.role[0].id) {
      if (
        user.role[0].id === parseInt(process.env.ADMINISTRATOR_ROLE_ID) &&
        user.is_active === true
      ) {
        organisationActiveAdminUsers.push(user);
      } else if (
        user.role[0].id === parseInt(process.env.ADMINISTRATOR_ROLE_ID) &&
        user.is_active === false
      ) {
        organisationDisabledAdminUsers.push(user);
      } else if (
        user.role[0].id === parseInt(process.env.STANDARD_ROLE_ID) &&
        user.is_active === true
      ) {
        organisationActiveStandardUsers.push(user);
      } else if (
        user.role[0].id === parseInt(process.env.STANDARD_ROLE_ID) &&
        user.is_active === false
      ) {
        organisationDisabledStandardUsers.push(user);
      }
    }
  });

  if (licenseQuantity >= organisationUsers.length) {
    organisationDisabledAdminUsers.map((user) => {
      user.update({
        is_active: true,
      });
    });
    organisationDisabledStandardUsers.map((user) => {
      user.update({
        is_active: true,
      });
    });
  } else if (licenseQuantity < organisationUsers.length) {
    //+1 always active owner
    const organisationActiveUsers =
      organisationActiveAdminUsers.length +
      organisationActiveStandardUsers.length +
      1;
    if (licenseQuantity === organisationActiveUsers) {
      //it is ok
    } else if (licenseQuantity > organisationActiveUsers) {
      //  need to activate some users
      const countOfUsersForActivate = licenseQuantity - organisationActiveUsers;

      if (organisationDisabledAdminUsers.length >= countOfUsersForActivate) {
        //first activate only admins
        let countOfActivated = 0;
        organisationDisabledAdminUsers.map((user) => {
          countOfActivated++;
          if (countOfActivated <= countOfUsersForActivate) {
            user.update({
              is_active: true,
            });
          }
        });
      } else {
        //activate admins and for remaining license activate standard users
        organisationDisabledAdminUsers.map((user) => {
          user.update({
            is_active: true,
          });
        });

        //activate standard users
        let countOfActivated = 0;
        organisationDisabledStandardUsers.map((user) => {
          countOfActivated++;
          if (
            countOfUsersForActivate >=
            organisationDisabledAdminUsers.length + countOfActivated
          ) {
            user.update({
              is_active: true,
            });
          }
        });
      }
    } else if (licenseQuantity < organisationActiveUsers) {
      //  need to disable some users
      const countOfUsersForDisable = organisationActiveUsers - licenseQuantity;
      if (organisationActiveStandardUsers.length >= countOfUsersForDisable) {
        //disable only standards
        let countOfDisabled = 0;
        organisationActiveStandardUsers.map((user) => {
          countOfDisabled++;
          if (countOfDisabled <= countOfUsersForDisable) {
            user.update({
              is_active: false,
            });
          }
        });
      } else {
        //disable all standards users
        organisationActiveStandardUsers.map((user) => {
          user.update({
            is_active: false,
          });
        });

        //disable some admins
        let countOfDisabled = 0;
        organisationActiveAdminUsers.map((user) => {
          countOfDisabled++;
          if (
            countOfDisabled <=
            countOfUsersForDisable - organisationActiveStandardUsers.length
          ) {
            user.update({
              is_active: false,
            });
          }
        });
      }
    }
  }
};

export const isLicenceAvailable = async (organisation_id) => {
  const userCondition = {
    is_active: true,
  };

  const roleCondition = {
    id: {
      [sequelize.Op.ne]: parseInt(process.env.STAKEHOLDER_ROLE_ID),
    },
  };

  const organisationActiveUsers = await getOrganisationUsers(
    organisation_id,
    userCondition,
    roleCondition
  );

  if (
    organisationActiveUsers.length >=
    parseInt(process.env.FREE_STANDARD_LICENSE_COUNT)
  ) {
    return false;
  } else {
    return true;
  }
};

export const getInternalUserById = async (id, organisation_id) => {
  const user = await User.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Organisation,
        as: "organisation",
        attributes: ["id", "name", "deleted_at"],
        paranoid: false,
        where: {
          id: organisation_id,
        },
      },
      {
        model: Role,
        as: "role",
        attributes: ["id", "name"],
      },
      {
        model: Image,
        as: "image",
        attributes: ["id", "thumbnail"],
      },
    ],
  });

  return user;
};
