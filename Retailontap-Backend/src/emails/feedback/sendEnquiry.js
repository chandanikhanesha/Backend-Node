export const sendEnquiry = () => {
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
        '                                     width="200"> </a></h1></td>\n' +
        '                        </tr>\n' +
        '                    </table>\n' +
        '                </td>\n' +
        '            </tr><!-- end tr -->\n' +
        '            <tr class="details">\n' +
        '                <td valign="middle" class="hero bg_white" style="padding: 2em 0 2em 0;">\n' +       
        '                     <p><h3 style="font-weight: 600">Enquiry Details:</h3></p>\n' +
        '                     <p>Name: <span style="font-weight: 600">{userName}</span></p>\n' +
        '                     <p>Company: <span style="font-weight: 600">{company}</span></p>\n' +
        '                     <p>Mobile: <span style="font-weight: 600">{mobile}</span></p>\n' +
        '                     <p>Business Email: <span style="font-weight: 600">{workEmail}</span></p>\n' +
        '                     <p>Phone no.: <span style="font-weight: 600">{phone}</span></p>\n' +
        '                     <p>Company size: <span style="font-weight: 600">{companySize}</span></p>\n' +
        '                     <p>Country: <span style="font-weight: 600">{country}</span></p>\n' +
        '                     <p>How can we help?: <span style="font-weight: 600">{message}</span></p>\n' +
        '                </td>\n' +
        '            </tr><!-- end tr --> <!-- 1 Column Text + Button : END -->\n' +
        '            <tr class="details">\n' +
        '                <td valign="middle" class="bg_white" style="padding: 0 0 4em 0;">\n' +
        '                    <p style="margin-top: 20px;">Regards, RetailonTap Ltd</p>\n' +
        '                </td>\n' +
        '            </tr><!-- end tr -->\n' +
        '        </table>\n' +
        '    </div>'
    );
};
