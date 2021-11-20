export const externalOrganisationInvite = () => {
  return (
    '    <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">\n' +
    '        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;\n' +
    '    </div>\n' +
    '    <div style="max-width: 700px; margin: 0 auto; padding: 15px 25px;background-color: #fff;" class="email-container"> <!-- BEGIN BODY -->\n' +
    '        <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"\n' +
    '               style="margin: auto;">\n' +
    '            <tr>\n' +
    '                <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">\n' +
    '                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">\n' +
    '                        <tr>\n' +
    '                            <td class="logo" style="text-align: center;"><h1><a href="#"> <img\n' +
    '                                    src="' +
    process.env.APP_URL +
    '/static/media/logo-main.1391ebee.png"\n' +
    '                                    alt="logo" width="200"> </a></h1></td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </td>\n' +
    '            </tr><!-- end tr -->\n' +
    '            <tr>\n' +
    '                <td valign="middle" class="hero bg_white" style="padding: 2em 0 1em 0;">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <td>\n' +
    '                                <div class="text" style="text-align: center;"><h2>{invitedByOrganisation}  has invited you to connect on Retailontap.</h2>\n' +
    '                                    <p style="text-align: left !important;">Click on the URL below to connect with with them.</p>\n' +
    '                                    <p>\n' +
    '                                        <a href="{acceptLink}">\n' +
    '                                            <span class="invite-link" style="color: #0B7AFF">{acceptLink}</span>\n' +
    '                                        </a>\n' +
    '                                    </p>\n' +
    '                                </div>\n' +
    '                            </td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </td>\n' +
    '            </tr><!-- end tr --> <!-- 1 Column Text + Button : END -->\n' +
    '            <tr>\n' +
    '                <td valign="middle" class="bg_white" style="padding: 0 0 4em 0;">\n' +
    '                    <table style="margin-left: 0 !important;">\n' +
    '                        <tr>\n' +
    '                            <td class="details">\n' +
    '                                <p>If the URL does not work, try copying and pasting it into your browser</p>\n' +
    '                                <p>Not sure what to do: Contact <span style="font-weight: 600">{invitedByEmail}</span></p>\n' +
    '                                <p style="margin-top: 40px;">Regards</p>\n' +
    '                                <p style="margin-top: 15px;">RetailonTap Ltd</p>\n' +
    '                            </td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </td>\n' +
    '            </tr><!-- end tr -->\n' +
    '        </table>\n' +
    '    </div>'
  );
};
