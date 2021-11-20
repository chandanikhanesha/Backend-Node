export const emailHeader = () => {
  return (
    '<!DOCTYPE html>\n' +
    '<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"\n' +
    '      xmlns:o="urn:schemas-microsoft-com:office:office">\n' +
    '<head>\n' +
    '    <meta charset="utf-8"> <!-- utf-8 works for most cases -->\n' +
    '    <meta name="viewport" content="width=device-width">\n' +
    '    <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->\n' +
    '    <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely -->\n' +
    '    <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->\n' +
    '    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">\n' +
    '    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"\n' +
    '          rel="stylesheet"> <!-- CSS Reset : BEGIN -->\n' +
    '    <style> /* What it does: Remove spaces around the email design added by some email clients. */ /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */\n' +
    '    html, body {\n' +
    '        margin: 0 auto !important;\n' +
    '        padding: 0 !important;\n' +
    '        height: 100% !important;\n' +
    '        width: 100% !important;\n' +
    '        background: #fff;\n' +
    '    }\n' +
    '\n' +
    '    /* What it does: Stops email clients resizing small text. */\n' +
    '    * {\n' +
    '        -ms-text-size-adjust: 100%;\n' +
    '        -webkit-text-size-adjust: 100%;\n' +
    '    }\n' +
    '\n' +
    '    /* What it does: Centers email on Android 4.4 */\n' +
    '    div[style*="margin: 16px 0"] {\n' +
    '        margin: 0 !important;\n' +
    '    }\n' +
    '\n' +
    '    /* What it does: Stops Outlook from adding extra spacing to tables. */\n' +
    '    table, td {\n' +
    '        mso-table-lspace: 0 !important;\n' +
    '        mso-table-rspace: 0 !important;\n' +
    '    }\n' +
    '\n' +
    '    /* What it does: Fixes webkit padding issue. */\n' +
    '    table {\n' +
    '        border-spacing: 0 !important;\n' +
    '        border-collapse: collapse !important;\n' +
    '        table-layout: fixed !important;\n' +
    '        margin: 0 auto !important;\n' +
    '    }\n' +
    '\n' +
    '    /* What it does: Uses a better rendering method when resizing images in IE. */\n' +
    '    img {\n' +
    '        -ms-interpolation-mode: bicubic;\n' +
    '    }\n' +
    '\n' +
    '    /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */\n' +
    '    a {\n' +
    '        text-decoration: none;\n' +
    '        color: #fff !important;\n' +
    '    }\n' +
    '\n' +
    '    /* What it does: A work-around for email clients meddling in triggered links. */\n' +
    '    *[x-apple-data-detectors], /* iOS */\n' +
    '    .unstyle-auto-detected-links *, .aBn {\n' +
    '        border-bottom: 0 !important;\n' +
    '        cursor: default !important;\n' +
    '        color: inherit !important;\n' +
    '        text-decoration: none !important;\n' +
    '        font-size: inherit !important;\n' +
    '        font-family: inherit !important;\n' +
    '        font-weight: inherit !important;\n' +
    '        line-height: inherit !important;\n' +
    '    }\n' +
    '\n' +
    '    /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */\n' +
    '    .a6S {\n' +
    '        display: none !important;\n' +
    '        opacity: 0.01 !important;\n' +
    '    }\n' +
    '\n' +
    '    /* What it does: Prevents Gmail from changing the text color in conversation threads. */\n' +
    '    .im {\n' +
    '        color: inherit !important;\n' +
    '    }\n' +
    '\n' +
    '    .ii a[href] {\n' +
    '        color: #fff !important;\n' +
    '    }\n' +
    '\n' +
    '    img.g-img + div {\n' +
    '        display: none !important;\n' +
    '    }\n' +
    '\n' +
    '    /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89 */\n' +
    '    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {\n' +
    '        u ~ div .email-container {\n' +
    '            min-width: 320px !important;\n' +
    '        }\n' +
    '    }\n' +
    '\n' +
    '    /* iPhone 6, 6S, 7, 8, and X */\n' +
    '    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {\n' +
    '        u ~ div .email-container {\n' +
    '            min-width: 375px !important;\n' +
    '        }\n' +
    '    }\n' +
    '\n' +
    '    /* iPhone 6+, 7+, and 8+ */\n' +
    '    @media only screen and (min-device-width: 414px) {\n' +
    '        u ~ div .email-container {\n' +
    '            min-width: 414px !important;\n' +
    '        }\n' +
    '    } </style> <!-- CSS Reset : END --> <!-- Progressive Enhancements : BEGIN -->\n' +
    '    <style> /*BUTTON*/\n' +
    '    .btn {\n' +
    '        padding: 10px 15px;\n' +
    '        display: inline-block;\n' +
    '    }\n' +
    '\n' +
    '    h1, h2, h3, h4, h5, h6 {\n' +
    '        font-family: "Open Sans", sans-serif;\n' +
    '        color: #000000;\n' +
    '        margin-top: 0;\n' +
    '        font-weight: 400;\n' +
    '    }\n' +
    '\n' +
    '    body {\n' +
    '        font-family: "Open Sans", sans-serif;\n' +
    '        font-weight: 400;\n' +
    '        font-size: 15px;\n' +
    '        line-height: 1.8;\n' +
    '    }\n' +
    '\n' +
    '    /*LOGO*/\n' +
    '    .logo svg {\n' +
    '        width: 200px;\n' +
    '        height: 60px;\n' +
    '    }\n' +
    '\n' +
    '    /*HERO*/\n' +
    '    .hero {\n' +
    '        position: relative;\n' +
    '        z-index: 0;\n' +
    '    }\n' +
    '\n' +
    '    .hero .text {\n' +
    '        color: rgba(0, 0, 0, .3);\n' +
    '    }\n' +
    '\n' +
    '    .hero .text h2 {\n' +
    '        color: #282828;\n' +
    '        font-size: 24pt;\n' +
    '        font-weight: 700;\n' +
    '        line-height: 1.4;\n' +
    '        text-align: center;\n' +
    '    }\n' +
    '\n' +
    '    .hero .text p, .hero p {\n' +
    '        color: #000;\n' +
    '        margin-top: 0;\n' +
    '    }\n' +
    '\n' +
    '    .hero .text span {\n' +
    '        font-weight: 700;\n' +
    '        color: #282828;\n' +
    '        display: block;\n' +
    '        margin-bottom: 10px;\n' +
    '        text-align: left;\n' +
    '    }\n' +
    '\n' +
    '    .hero .text .btn {\n' +
    '        background-color: #0B7AFF;\n' +
    '        border-bottom-color: #0B7AFF;\n' +
    '        font-family: "Open Sans", sans-serif;\n' +
    '        font-weight: 600;\n' +
    '        font-size: 14px;\n' +
    '        margin: 0 auto;\n' +
    '        width: 250px;\n' +
    '        border-radius: 33px;\n' +
    '        color: #fff;\n' +
    '        padding: 8px 0;\n' +
    '    }\n' +
    '\n' +
    '    p {\n' +
    '        color: #000 !important;\n' +
    '    }\n' +
    '\n' +
    '    .details span a {\n' +
    '        color: #000 !important;\n' +
    '        font-weight: bold !important;\n' +
    '    }\n' +
    '\n' +
    '    .ii a[href] {\n' +
    '        color: inherit !important;\n' +
    '    }\n' +
    '\n' +
    '    @media screen and (max-width: 500px) {\n' +
    '        .email-container {\n' +
    '            padding: 0 15px;\n' +
    '        }\n' +
    '    } </style>\n' +
    '</head>\n' +
    '<body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly;">\n' +
    '<center style="width: 100%;height:100%;background-color: #ececec;padding-top: 85px; padding-bottom: 85px;">'
  );
};
