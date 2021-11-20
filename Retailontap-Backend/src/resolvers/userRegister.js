const Promise = require('bluebird');
import * as validate from 'validate.js';
import {
    generateRandomString,
    getUserFullName,
    response,
    getDatabaseInsertableTime
} from '../utils/functions';
import { Notification, User, UserNotificationPreference, UserDevice } from '../../models';
import * as auth from '../utils/service/auth';
import * as OrganisationService from '../utils/service/OrganisationService';
import * as UserOrganisationRoleService from '../utils/service/UserOrganisationRoleService';
import * as StripeService from '../utils/service/StripeService';
import * as ConnectionService from '../utils/service/ConnectionService';
var CryptoJS = require("crypto-js");
const randomstring = require("randomstring");

// userRegister Resolver
export default {
    Mutation: {
        userRegister: async (
            parent,
            {
                first_name,
                last_name,
                password,
                work_email,
                company,
                work_phone,
                organisation_type,
                country_id,
                device_type,
                device_id,
                invite_by,
                invite_token
            }
        ) => {
            let errors = [];
            let uuid = null;
            // validation constraints
            let constraints = {
                from: {
                    email: true,
                },
            };

            // check work_email is provided
            if (!work_email)
                errors.push(
                    response('work_email', 'Please provide a work_email.', 400, null)
                );

            // check work_email is validated
            if (
                validate({ from: work_email }, constraints) !== undefined ||
                (work_email && work_email.length > 255)
            )
                errors.push(
                    response(
                        'work_email',
                        'Please enter a valid email address.',
                        400,
                        null
                    )
                );

            let isExisting = await User.findOne({ where: { work_email } });

            // check if work_email is registered
            if (isExisting) {
                errors.push(
                    response(
                        'work_email',
                        'This email is already registered, login instead.',
                        400,
                        null
                    )
                );
            }

            const username = work_email;

            if (errors.length === 0) {
                await new Promise((resolve) => {
                    // register user with AWS Cognito
                    auth.userRegister(
                        username,
                        work_email,
                        password,
                        '0',
                        async (err, userSub) => {
                            if (err) {
                                errors.push(response('aws-cognito', err.message, 400, null));
                            } else {
                                uuid = userSub;
                                resolve(true);
                            }
                        }
                    );
                });
            }

            if (errors.length !== 0) return errors;

            try {
                // save user to the database
                const user = await User.create({
                    uuid,
                    first_name,
                    last_name,
                    work_email,
                    device_id,
                    device_type,
                    phone_number: work_phone,
                    country_id
                });

                // check device existance
                const existDevice = await UserDevice.findOne({
                    where: { device_id: device_id },
                });

                if (existDevice) {
                    // update user_id if already exist
                    await UserDevice.update(
                        { user_id: user.id },
                        { where: { id: existDevice.id } }
                    );
                }
                else {
                    // save new device
                    await UserDevice.create({
                        user_id: user.id,
                        device_id: device_id,
                        device_type: device_type
                    });
                }

                let numericValue = randomstring.generate({
                    length: 8,
                    charset: 'numeric'
                });

                let alphabeticValue = randomstring.generate({
                    length: 1,
                    charset: 'alphabetic',
                    capitalization: 'uppercase'
                });

                let customerNo = numericValue + alphabeticValue;

                const organisation = await OrganisationService.createOrganisation({
                    name: company,
                    uuid: generateRandomString(15),
                    invite_link: generateRandomString(20),
                    organisation_type: organisation_type,
                    country_id: country_id,
                    work_phone: work_phone,
                    customer_no: customerNo,
                });

                await UserOrganisationRoleService.create(
                    user.id,
                    1, // Role is 1 is Owner
                    organisation.id
                );

                //create customer object
                const customerDetails = {
                    name: getUserFullName(user),
                    description: 'Owner of the organisation ' + company,
                    email: user.work_email,
                };

                //create customer in stripe
                const customer = await StripeService.createCustomer(customerDetails);
                user.update({
                    stripe_customer_id: customer.id,
                });
                //add user notifications
                const notifications = await Notification.findAll();
                await Promise.map(notifications, async ({ id }) => {
                    await UserNotificationPreference.create({
                        user_id: user.id,
                        notification_id: id,
                        is_on: true,
                    });
                });

                if (invite_token !== null && invite_by !== null) {
                    // set connection with inviter              
                    var bytes = CryptoJS.AES.decrypt(decodeURIComponent(invite_by), 'p80%n!*_2u$2y');
                    var plaintext = bytes.toString(CryptoJS.enc.Utf8);

                    var inviterOrganisation = await OrganisationService.getOrganisationByEmail(
                        plaintext
                    );

                    if (inviterOrganisation) {
                        let data = {
                            invited_by: inviterOrganisation.user[0].id,
                            from: inviterOrganisation.id,
                            to: organisation.id,
                            model: 'Organisation',
                            status_id: 2, //Accepted
                            token: invite_token,
                        };

                        const connection = await ConnectionService.createConnection(data);

                        await connection[0].update({
                            accepted_at: getDatabaseInsertableTime(0, 'days'),
                        });

                        await connection[1].update({
                            accepted_at: getDatabaseInsertableTime(0, 'days'),
                        });
                    }
                }

            } catch (e) {
                console.log("err:", e);
                errors.push(response('user', 'Registration failed!', 400, null));
            }

            if (errors.length !== 0) return errors;

            let successResponse = [];
            successResponse.push(
                response('register', 'You have registered successfully', 200, null)
            );

            return successResponse;
        },
    },
};
