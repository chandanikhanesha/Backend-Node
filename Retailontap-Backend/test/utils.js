const axios = require('axios');
const userData = require('./user-data');

const createGraphQLQuery = (data, queryType) => {
  let query = '';

  switch (queryType) {
    case 'user-register':
      query = `
        userRegister(
          first_name: "${data.first_name}"
          last_name: "${data.last_name}"
          password: "${data.password}"
          work_email: "${data.work_email}"
          company: "${data.company}"
          phone_number: "${data.phone_number}"
          type: "${data.type}"
        )
      `;
      break;

    case 'user-login':
      query = `
        userLogIn(
          work_email: "${data.work_email}"
          password:  "${data.password}"
        )
      `;
      break;

    case 'user-forgot-password':
      query = `
        userForgotPassword(
          work_email: "${data.work_email}"
        )
      `;
      break;

    case 'user-invite':
      query = `
        userInvite(
          first_name: "${data.first_name}"
          last_name: "${data.last_name}"
          work_email: "${data.work_email}"
          company: "${data.company}"
          phone_number: "${data.phone_number}"
          type: "${data.type}"
          invited_by: "${data.invited_by}"
        )
      `;
      break;
  }

  return JSON.stringify({
    query: `
      mutation {
        ${query} {
          path
          message
        }
      }
    `,
  });
};

const getAxiosConfig = (data) => {
  return {
    method: 'post',
    url: 'http://localhost:3000/local/graphql',
    headers: {
      'Content-Type': 'application/json',
    },
    data: data,
  };
};

module.exports = {
  getUserData: () => {
    return userData;
  },

  sendGraphQLRequest: (userData, queryType) => {
    const config = getAxiosConfig(createGraphQLQuery(userData, queryType));

    console.log(config);

    return new Promise((resolve) => {
      axios(config)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          console.log(config);
          console.log(err.message);
          resolve(null);
        });
    });
  },
};
