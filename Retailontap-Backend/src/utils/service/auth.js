import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
import AWS from "aws-sdk";
import QRCode from "qrcode";
import request from "request";
import jwkToPem from "jwk-to-pem";
import jwt from "jsonwebtoken";
import * as OrganisationService from "./OrganisationService";

const CognitoRefreshToken = require("amazon-cognito-identity-js")
  .CognitoRefreshToken;

global.fetch = require("node-fetch");

// pool data
const poolData = {
  UserPoolId: `${process.env.COGNITO_POOL_ID}`,
  ClientId: `${process.env.COGNITO_CLIENT_ID}`,
};

// const poolRegion = `${process.env.COGNITO_POOL_REGION}`
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// aws-cognito user registration
export const userRegister = (
  username,
  workEmail,
  password,
  isInvited,
  callback
) => {
  const attributeList = [
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "email",
      Value: workEmail,
    }),
    new AmazonCognitoIdentity.CognitoUserAttribute({
      Name: "custom:is_invited",
      Value: isInvited,
    }),
  ];

  userPool.signUp(`${username}`, password, attributeList, [], (err, result) => {
    if (err) {
      console.log("error: " + JSON.stringify(err));
      callback(err);
    } else {
      callback(null, result.userSub);
    }
  });
};

// aws-cognito email verification
export const userEmailVerifyCode = (username, code, callback) => {
  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.confirmRegistration(code, true, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(result);
    }
  });
};

// aws-cognito resend email verification code
export const resendCode = (username, callback) => {
  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.resendConfirmationCode((err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(result);
    }
  });
};

// aws-cognito user login
export const userLogin = async (username, password, callback) => {
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    {
      Username: username,
      Password: password,
    }
  );

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      const accesstoken = result.getAccessToken().getJwtToken();
      const refreshToken = result.getRefreshToken().getToken();
      callback(null, { accesstoken, refreshToken });
    },
    onFailure: (err) => {
      callback(err);
    },
  });
};

// aws-cognito user login
export const logOut = async (username, token) => {
  try {
    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    await cognitoUser.signOut();
    return true;
  } catch (e) {
    return false;
  }
};

export const userLoginByGoogleAuth = async (
  username,
  password,
  googleCode,
  callback
) => {
  await new Promise((resolve, reject) => {
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      {
        Username: username,
        Password: password,
      }
    );

    const userData = {
      Username: username,
      Pool: userPool,
    };

    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (data) => {
        //var accesstoken = result.getAccessToken().getJwtToken();

        //callback(null, accesstoken);
        console.log("onSuccess:", data);
        resolve(data);
      },
      onFailure: (err) => {
        //callback(err);
        console.error("authenticateUser onFailure:", err);
        reject(err);
      },
      totpRequired: () => {
        cognitoUser.sendMFACode(
          googleCode,
          {
            onSuccess: (result) => {
              var accessToken = result.getAccessToken().getJwtToken();
              const refreshToken = result.getRefreshToken().getToken();
              console.log("success");
              callback(null, { accessToken, refreshToken });
            },
            onFailure: (err) => {
              console.error("sendMFACode onFailure:", err);
              callback(err);
            },
          },
          "SOFTWARE_TOKEN_MFA"
        );
      },
    });
  });
};

export const sendEmailToEnableAuth = (
  toAddresses,
  htmlToSend,
  subject,
  source,
  callback
) => {
  // create params
  const params = {
    Destination: {
      ToAddresses: [toAddresses],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlToSend,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: source,
  };

  new AWS.SES({ apiVersion: "2010-12-01", region: "eu-west-1" })
    .sendEmail(params)
    .promise()
    .then((data) => {
      callback(data, null);
    })
    .catch((err) => {
      callback(null, err);
    });
};

export const userEnableEmailAuth = (
  username,
  usercode,
  access_token,
  callback
) => {
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

  cognitoidentityserviceprovider.verifySoftwareToken(
    {
      AccessToken: access_token,
      UserCode: usercode,
    },
    (err, data) => {
      if (err) {
        callback(err);
      } else {
        if (data.Status === "SUCCESS") {
          //const userData = {
          //    Username: username,
          //    Pool: userPool,
          //};

          //const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

          //const settings = {
          //    PreferredMfa: true,
          //    Enabled: true,
          //}

          //cognitoUser.setUserMfaPreference(null, settings, () => { });

          callback(data);
        } else callback(null);
      }
    }
  );
};

export const userEnableMFA = (username, access_token, callback) => {
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

  cognitoidentityserviceprovider.associateSoftwareToken(
    {
      AccessToken: access_token,
    },
    (err, data) => {
      if (err) {
        callback(false, err);
      } else {
        //console.log("Secret Key: " + JSON.stringify(data));

        const uri = `otpauth://totp/${decodeURI(username)}?secret=${
          data.SecretCode
        }`;

        QRCode.toDataURL(uri, (err, result) => {
          if (err) {
            callback(false, err);
          } else {
            callback(result);
          }
        });
      }
    }
  );
};

export const userValidateMFA = (username, usercode, access_token, callback) => {
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

  cognitoidentityserviceprovider.verifySoftwareToken(
    {
      AccessToken: access_token,
      UserCode: usercode,
    },
    (err, data) => {
      if (err) {
        callback(err);
      } else {
        if (data.Status === "SUCCESS") {
          const userData = {
            Username: username,
            Pool: userPool,
          };

          const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

          var params = {
            UserPoolId: `${process.env.COGNITO_POOL_ID}` /* required */,
            Username: username /* required */,
            SMSMfaSettings: null,
            SoftwareTokenMfaSettings: {
              Enabled: true,
              PreferredMfa: true,
            },
          };

          //console.log("settings: " + JSON.stringify(settings));

          cognitoidentityserviceprovider.adminSetUserMFAPreference(
            params,
            (err, result) => {
              if (err) {
                console.log("setUserMfaPreference err: " + err);
              } else {
                console.log("setUserMfaPreference result: " + result);
              }
            }
          );

          callback(data);
        } else callback(null);
      }
    }
  );
};

export const userCheckMFAEnabled = (access_token, callback) => {
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

  cognitoidentityserviceprovider.getUser(
    {
      AccessToken: access_token,
    },
    (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(data);
      }
    }
  );
};

export const userDisableMFA = (username, callback) => {
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

  const params = {
    UserPoolId: `${process.env.COGNITO_POOL_ID}`,
    Username: username,
    SoftwareTokenMfaSettings: {
      Enabled: false,
    },
  };

  cognitoidentityserviceprovider.adminSetUserMFAPreference(
    params,
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(result);
      }
    }
  );
};

// aws-cognito user forgot password
export const userForgotPassword = (username, callback) => {
  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.forgotPassword({
    onSuccess: (result) => {
      callback(true);
    },
    onFailure: (err) => {
      callback(false, err);
    },
  });
};

// aws-cognito user reset password
export const userResetPassword = (username, newPassword, code, callback) => {
  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.confirmPassword(code, newPassword, {
    onSuccess: () => {
      callback(true);
    },
    onFailure: (err) => {
      callback(false, err);
    },
  });
};

// aws-cognito user reset password
export const changePassword = (
  username,
  oldPassword,
  newPassword,
  callback
) => {
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    {
      Username: username,
      Password: oldPassword,
    }
  );

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: () => {
      cognitoUser.changePassword(oldPassword, newPassword, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null);
        }
      });
    },
    onFailure: (err) => {
      callback(err);
    },
  });
};

// aws-cognito send verification code
export const sendVerificationCode = (username, password, callback) => {
  const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    {
      Username: username,
      Password: password,
    }
  );

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      cognitoUser.getAttributeVerificationCode("email", {
        onSuccess: function (result) {
          callback(result);
        },
        onFailure: function (err) {
          callback(err);
        },
        inputVerificationCode: function () {
          cognitoUser.verifyAttribute("email", 8888888, this);
        },
      });
      callback(null);
    },
    onFailure: (err) => {
      callback(err);
    },
  });
};

export const tradeTokenForUser = (token) => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: `https://cognito-idp.${process.env.COGNITO_POOL_REGION}.amazonaws.com/${process.env.COGNITO_POOL_ID}/.well-known/jwks.json`,
        json: true,
      },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          let pems = {};
          var keys = body["keys"];
          for (var i = 0; i < keys.length; i++) {
            //Convert each key to PEM
            var key_id = keys[i].kid;
            var modulus = keys[i].n;
            var exponent = keys[i].e;
            var key_type = keys[i].kty;
            var jwk = { kty: key_type, n: modulus, e: exponent };
            var pem = jwkToPem(jwk);
            pems[key_id] = pem;
          }
          //validate the token
          var decodedJwt = jwt.decode(token, { complete: true });
          if (!decodedJwt) {
            //Not a valid JWT token
            reject(false);
            return;
          }

          var kid = decodedJwt.header.kid;
          var pem = pems[kid];
          if (!pem) {
            //Invalid token
            reject(false);
            return;
          }

          jwt.verify(token, pem, function (err, payload) {
            if (err) {
              //Invalid Token
              reject(false);
            } else {
              //Valid Token.
              resolve(payload);
            }
          });
        } else {
          //Error! Unable to download JWKs'
        }
      }
    );
  });
};

// check organisation availability
export const checkOrganisationAvailability = async (user) => {
  if (
    user &&
    user.organisation &&
    user.organisation[0] &&
    user.organisation[0].deleted_at !== null
  ) {
    const owner = await OrganisationService.getOrganisationOwner(
      user.organisation[0].id
    );
    throw new Error(
      `Your organisation is no longer available, contact ${owner.work_email}.`
    );
  }
};

// check user is active
export const checkUserIsActive = async (user) => {
  if (user && !user.is_active) {
    throw new Error(
      "Your account has been deactivated please contact your organisation admin."
    );
  }
};

// delete user from aws-cognito
export const deleteUser = async (uuid, callback) => {
  let isDeleted = false;
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  await new Promise((resolve) => {
    cognitoidentityserviceprovider.adminDeleteUser(
      {
        UserPoolId: `${process.env.COGNITO_POOL_ID}`,
        Username: uuid,
      },
      (err, data) => {
        if (err) {
          isDeleted = false;
        } else {
          isDeleted = true;
        }
        resolve(true);
      }
    );
  });

  return isDeleted;
};

// delete user from aws-cognito
export const adminChangePassword = async (uuid, password, callback) => {
  let passwordUpdated = false;
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  await new Promise((resolve) => {
    cognitoidentityserviceprovider.adminSetUserPassword(
      {
        UserPoolId: `${process.env.COGNITO_POOL_ID}`,
        Username: uuid,
        Permanent: true,
        Password: password,
      },
      (err, data) => {
        if (err) {
          passwordUpdated = false;
        } else {
          passwordUpdated = true;
        }
        resolve(true);
      }
    );
  });

  return passwordUpdated;
};

// update user attributes in aws-cognito
export const adminChangeUserAttributes = async (uuid, userAttributes) => {
  let isUserAttributesUpdated = false;
  const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
  await new Promise((resolve) => {
    cognitoidentityserviceprovider.adminUpdateUserAttributes(
      {
        UserPoolId: `${process.env.COGNITO_POOL_ID}`,
        Username: uuid,
        UserAttributes: userAttributes,
      },
      (err, data) => {
        if (err) {
          isUserAttributesUpdated = false;
        } else {
          isUserAttributesUpdated = true;
        }
        resolve(true);
      }
    );
  });

  return isUserAttributesUpdated;
};

// aws-cognito refresh token
export const refreshToken = async (refreshToken, username) => {
  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  return new Promise((resolve, reject) => {
    const refreshtokenObj = new CognitoRefreshToken({
      RefreshToken: refreshToken,
    });
    cognitoUser.refreshSession(refreshtokenObj, (err, result) => {
      if (err) {
        reject(false);
      } else {
        const accesstoken = result.getAccessToken().getJwtToken();
        const refreshToken = result.getRefreshToken().getToken();
        resolve({ accesstoken, refreshToken });
      }
    });
  });
};
