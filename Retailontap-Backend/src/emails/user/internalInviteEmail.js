export const internalInviteEmail = () => {
  return (
    '    <div style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">\n' +
    '        &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;\n' +
    '    </div>\n' +
    '    <div style="max-width: 900px; margin: 0 auto; padding: 15px 25px;background-color: #fff;" class="email-container"> <!-- BEGIN BODY -->\n' +
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
    '                <td valign="middle" class="hero bg_white" style="padding: 2em 0 5em 0;">\n' +
    '                    <table>\n' +
    '                        <tr>\n' +
    '                            <td>\n' +
    '                                <div class="text" style="text-align: center;"><h2>{organisation} has invited you to\n' +
    '                                    Retailontap.</h2>\n' +
    '                                    <p> You have been added as a member to {organisation} on Retailontap.</p>\n' +
    '                                    <p>Download the Retailontap iPhone App and login using this email and temporary\n' +
    '                                        password.</p>\n' +
    '                                </div>\n' +
    '                            </td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </td>\n' +
    '            </tr><!-- end tr --> <!-- 1 Column Text + Button : END -->\n' +
    '            <tr>\n' +
    '                <td valign="middle" class="bg_white" style="padding: 0 0 4em 0;">\n' +
    '                    <table>\n' +
    '                        <tr class="details">\n' +
    '                            <td>\n' +
    '                                <div class="text">\n' +
    '                                    Your Login email: <span style="font-weight: 600">{email}</span>\n' +
    '                                </div>\n' +
    '                                <div class="text">\n' +
    '                                    Your temporary password: <span style="font-weight: 600">{password}</span>\n' +
    '                                </div>\n' +
    '                                <p>Not sure what to do: Contact <span style="font-weight: 600">{invitedBy}</span></p>\n' +
    '                                <p style="margin-top: 70px;">Regards, RetailonTap Ltd</p>\n' +
    '                            </td>\n' +
    '                        </tr>\n' +
    '                    </table>\n' +
    '                </td>\n' +
    '            </tr><!-- end tr -->\n' +
    '        </table>\n' +
    '    </div>'
  );
};
