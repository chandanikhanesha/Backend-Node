import messaging from './firebaseInit';

export const sendNotificationToClient = (tokens, data) =>
    new Promise((resolve, reject) => {
        messaging
            .sendMulticast({ tokens, data })
            .then((response) => {
                // Response is an object of the form { responses: [] }
                const successes = response.responses.filter((r) => r.success === true)
                    .length;
                const failures = response.responses.filter((r) => r.success === false)
                    .length;
                console.log(
                    'Notifications sent:',
                    `${successes} successful, ${failures} failed`
                );

                resolve(response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
                reject(error);
            });
    });
