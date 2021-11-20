import * as validate from "validate.js";
import {
  errorMessage,
  generateActivationCode,
  generateRandomPassword,
} from "../utils/functions";
import { User } from "../../models";
import { AWS } from "../utils/variables";

// userInvite Resolver
export default {
  Mutation: {
    userInvite: async (
      parent,
      { first_name, last_name, work_email, company, phone_number, invited_by }
    ) => {
      let errors = [];

      // validation constraints
      let constraints = {
        from: {
          email: true,
        },
      };

      // check work_email is provided
      if (!work_email)
        errors.push(errorMessage("work_email", "Please provide a work_email."));

      // check work_email is validated
      if (
        validate({ from: work_email }, constraints) !== undefined ||
        (work_email && work_email.length > 255)
      )
        errors.push(
          errorMessage("work_email", "Please enter a valid email address.")
        );

      let isExisting = await User.findOne({ where: { work_email } });

      // check if work_email is registered
      if (isExisting) {
        errors.push(
          errorMessage(
            "work_email",
            "This email is already registered, login instead."
          )
        );
      }

      const username = work_email;
      const password = generateRandomPassword();

      const activation_code = generateActivationCode();

      // create params
      const params = {
        Destination: {
          ToAddresses: [work_email],
        },
        Message: {
          Body: {
            Html: {
              Charset: "UTF-8",
              Data: `
                <p>Use this code ${activation_code} to verify your account in your dashboard or click this <a href="https://retailontapweb.netlify.app/activation_code=${activation_code}">link</a>.</p>
                <p>Your temporary password is <b>${password}</b></p>
              `,
            },
          },
          Subject: {
            Charset: "UTF-8",
            Data: "RetailonTap Verification",
          },
        },
        Source: "noreply@retailontap.com",
      };

      if (errors.length === 0) {
        // Create the promise and SES service object
        await new Promise((resolve) => {
          new AWS.SES({ apiVersion: "2010-12-01", region: "eu-west-1" })
            .sendEmail(params)
            .promise()
            .then((data) => {
              resolve(true);
            })
            .catch((err) => {
              errors.push(errorMessage("aws-cognito", err.message));
              resolve(false);
            });
        });
      }

      if (errors.length === 0) {
        await new Promise((resolve) => {
          // register user with AWS Cognito
          auth.userRegister(username, work_email, password, (err) => {
            if (err) errors.push(errorMessage("aws-cognito", err.message));

            resolve(true);
          });
        });
      }

      if (errors.length !== 0) return errors;

      // save user to the database
      await User.create({
        first_name,
        last_name,
        password,
        work_email,
        company,
        phone_number,
        activation_code,
        invited_by,
      });

      return null;
    },
  },
};
