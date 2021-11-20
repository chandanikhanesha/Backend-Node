import { response, generateRandomString } from '../../utils/functions';
import * as OrganisationService from '../../utils/service/OrganisationService';
import * as ConnectionService from '../../utils/service/ConnectionService';
import * as EmailService from '../../utils/service/EmailService';
import { UserNotificationLog, UserDevice, User } from '../../../models';
import { sendNotificationToClient } from '../../utils/firebase';
var CryptoJS = require("crypto-js");

export default {
  Mutation: {
    connectExternalOrganisation: async (parent, args, context) => {
      let organisation = null;
      let email = null;
      if (args.work_email) {
        organisation = await OrganisationService.getOrganisationByEmail(
          args.work_email
        );
        email = args.work_email;
      } else if (args.link) {
        let link = OrganisationService.getOrganisationLink(args.link);
        organisation = await OrganisationService.getOrganisationByLink(link);
        if (organisation) {
          const owner = await OrganisationService.getOrganisationOwner(
            organisation.id
          );
          email = owner.work_email;
        }
      } else {
        return response(
          'connect-external-organisation',
          'Please provite organisation email or link',
          400,
          null
        );
      }

      if (!organisation) {

        var ciphertext = CryptoJS.AES.encrypt( context.authUser.work_email, 'p80%n!*_2u$2y');

        EmailService.sendUnregisteredOrganisationInvite(
          context.authUser.work_email,
          context.authUser.organisation[0].name,
            `${process.env.APP_URL}/invitationaccept/` + encodeURIComponent(ciphertext) +'/'+generateRandomString(32),
          email,
          (data, err) => { }
        );

        return response(
          'connect-external-organisation',
          'Connection successfully created.',
          200,
          null
        );
      }
      else{
        if (organisation.id === context.authUser.organisation[0].id) {
          return response(
            'connect-external-organisation',
            'You can not connect with your organisation.',
            400,
            null
          );
        }

        let data = {
          invited_by: context.authUser.id,
          from: context.authUser.organisation[0].id,
          to: organisation.id,
          model: 'Organisation',
          status_id: 1, //Pending
          token: generateRandomString(32),
        };

        const ifConnectionExist = await ConnectionService.checkConnectionExist(
            data
        );

        if (ifConnectionExist) {
          return response(
            'connect-external-organisation',
            'Connection already exist.',
            400,
            null
          );
        } else {
          const connection = await ConnectionService.createConnection(data);

          EmailService.sendExternalOrganisationInvite(
            context.authUser.work_email,
              context.authUser.organisation[0].name,
              `${process.env.APP_URL}/accept/${data.token}`,
              email,
              (data, err) => { }
          );

          const name = "Retail Made Smart";
          const message = context.authUser.organisation[0].name + " would like to connect with you on Retailontap";

          var userDevices = null;
          var tokens = [];
          var notificationResponse = null;
          var messageId = "";

          let user = await User.findOne({ where: { work_email :email  } });

          if (user) {
                // Get Device Token from DB
                await UserDevice.findAll({
                    where: { user_id: user.id },
                    attributes: ['device_id']
                }).then(function (list) {
                    userDevices = list;
                });
                
                await userDevices && userDevices.map((device) => {
                    tokens = []; // Empty Array
                    tokens.push(device.device_id); // push new device_id

                    const notificationData = {
                        title: name,
                        body: message
                    };
                    
                    // Send Notification
                    sendNotificationToClient(tokens, notificationData).then((response) => {
                        var notiResponse = response && response.responses.length > 0 ? response.responses[0] : null;

                        if (notiResponse != null) {
                            if (notiResponse.success) {
                                messageId = notiResponse.messageId;
                                notificationResponse = messageId.substr(messageId.lastIndexOf("/") + 1, messageId.length - messageId.lastIndexOf("/"));
                            }
                            else {
                                notificationResponse = notiResponse.error.code;
                            }

                            UserNotificationLog.create({
                                user_id: user.id,
                                device_id: device.device_id,
                                message: message,
                                response: notificationResponse,
                                is_sent: notiResponse.success,
                                is_read: false,
                                is_deleted: false,
                                invited_by: context.authUser.id
                            });
                        }
                    }).catch((err) => { });
                });
            }

            return response(
               'connect-external-organisation',
               'Connection successfully created.',
                200,
                null
            );
        }
      }
    },
  },
};
