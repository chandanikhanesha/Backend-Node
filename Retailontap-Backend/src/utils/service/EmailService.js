import { AWS } from "../variables";
import { multiStringReplace } from "../../utils/functions";
import { emailHeader } from "../../emails/layout/header";
import { emailFooter } from "../../emails/layout/footer";
import { internalInviteEmail } from "../../emails/user/internalInviteEmail";
import { externalUserInvite } from "../../emails/user/externalUserInvite";
import { externalOrganisationInvite } from "../../emails/organisation/externalOrganisationInvite";
import { unregisteredOrganisationInvite } from "../../emails/organisation/unregisteredOrganisationInvite";
import { sendFeedback } from "../../emails/feedback/sendFeedback";
import { sendEnquiry } from "../../emails/feedback/sendEnquiry";

// send external email
export const sendEmail = (
  toAddresses,
  htmlToSend,
  subject,
  source,
  callback
) => {
  // create params
  const params = {
    Destination: {
      ToAddresses: toAddresses,
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

// send invitation email
export const sendInvitationEmail = (
  invitedBy,
  email,
  password,
  organisation,
  callback
) => {
  const source = emailHeader() + internalInviteEmail() + emailFooter();

  const replacements = {
    invitedBy: invitedBy,
    email: email,
    password: password,
    organisation: organisation,
  };

  const htmlToSend = multiStringReplace(replacements, source);

  // create params
  const params = {
    Destination: {
      ToAddresses: [email],
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
        Data: "Retailontap invitation",
      },
    },
    Source: process.env.FROM_EMAIL,
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

// send external user invite email
export const sendExternalUserInvite = (
  invitedByEmail,
  invitedByOrganisation,
  acceptLink,
  email,
  callback
) => {
  const source = emailHeader() + externalUserInvite() + emailFooter();

  const replacements = {
    invitedByEmail: invitedByEmail,
    invitedByOrganisation: invitedByOrganisation,
    acceptLink: acceptLink,
  };

  const htmlToSend = multiStringReplace(replacements, source);

  sendEmail(
    [email],
    htmlToSend,
    "Retailontap invitation",
    process.env.FROM_EMAIL,
    (data, err) => {
      if (data) {
        callback(data, null);
      } else {
        callback(null, err);
      }
    }
  );
};

// send external organisation invite email
export const sendExternalOrganisationInvite = (
  invitedByEmail,
  invitedByOrganisation,
  acceptLink,
  email,
  callback
) => {
  const source = emailHeader() + externalOrganisationInvite() + emailFooter();

  const replacements = {
    invitedByEmail: invitedByEmail,
    invitedByOrganisation: invitedByOrganisation,
    acceptLink: acceptLink,
  };

  const htmlToSend = multiStringReplace(replacements, source);

  const subject =
    invitedByOrganisation + " would like to connect with you on Retailontap";

  sendEmail(
    [email],
    htmlToSend,
    subject,
    process.env.FROM_EMAIL,
    (data, err) => {
      if (data) {
        callback(data, null);
      } else {
        callback(null, err);
      }
    }
  );
};

// send external unregistered organisation invite email
export const sendUnregisteredOrganisationInvite = (
  invitedByEmail,
  invitedByOrganisation,
  acceptLink,
  email,
  callback
) => {
  const source =
    emailHeader() + unregisteredOrganisationInvite() + emailFooter();

  const replacements = {
    invitedByEmail: invitedByEmail,
    invitedByOrganisation: invitedByOrganisation,
    acceptLink: acceptLink,
  };

  const htmlToSend = multiStringReplace(replacements, source);

  const subject =
    invitedByOrganisation + " would like to connect with you on Retailontap";

  sendEmail(
    [email],
    htmlToSend,
    subject,
    process.env.FROM_EMAIL,
    (data, err) => {
      if (data) {
        callback(data, null);
      } else {
        callback(null, err);
      }
    }
  );
};

// send feedback email
export const sendFeedbackMail = (
  workEmail,
  userName,
  feedbackType,
  feedbacMessage,
  callback
) => {
  const source = emailHeader() + sendFeedback() + emailFooter();

  const replacements = {
    userName: userName,
    feedbackType: feedbackType,
    feedbacMessage: feedbacMessage,
    workEmail: workEmail,
  };

  const htmlToSend = multiStringReplace(replacements, source);

  const subject = "Email from Get Help Page";

  sendEmail(
    [process.env.FEEDBACK_EMAIL],
    htmlToSend,
    subject,
    process.env.FROM_EMAIL,
    (data, err) => {
      if (data) {
        callback(data, null);
      } else {
        callback(null, err);
      }
    }
  );
};

// send enquiry email
export const sendEnquiryMail = (
  userName,
  company,
  mobile,
  workEmail,
  phone,
  companySize,
  country,
  message,
  callback
) => {
  const source = emailHeader() + sendEnquiry() + emailFooter();

  const replacements = {
    userName: userName,
    company: company,
    mobile: mobile,
    workEmail: workEmail,
    phone: phone,
    companySize: companySize,
    country: country,
    message: message,
  };

  const htmlToSend = multiStringReplace(replacements, source);

  const subject = "RetailonTap - Enquiry";

  sendEmail(
    [process.env.FEEDBACK_EMAIL],
    htmlToSend,
    subject,
    process.env.FROM_EMAIL,
    (data, err) => {
      if (data) {
        callback(data, null);
      } else {
        callback(null, err);
      }
    }
  );
};
