import { sendNotificationToClient } from '../../utils/firebase';
import { response } from '../../utils/functions';
import { UserNotificationLog, UserDevice } from '../../../models';

export default {
  Mutation: {
    sendNotification: async (parent, args, context) => {
      const name = args.name;
      const message = args.message;
      try {
        var userDevices = null;
        var tokens = [];
        var notificationResponse = null;
        var messageId = "";

        // Get Device Token from DB
        await UserDevice.findAll({
          where: { user_id: context.authUser.id },
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
                user_id: context.authUser.id,
                device_id: device.device_id,
                message: message,
                response: notificationResponse,
                is_sent: notiResponse.success,
                is_read: false,
                is_deleted: false,
                invited_by:0
              });
            }
          }).catch((err) => {});
        });  

        return response('send-notification', 'sendNotification', 200, null);
      } catch (err) {
        console.log('messages error:' + err.stack);
        return response('send-notification', err.stack, 200, null);
      }
    },
  },
};
