import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function verifyMail(email, userId, req) {
  let verification_link = `http://hara.smolleys.com/auth/verify/${userId}`;
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-pulse.com",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "smolleys@smolleys.com", // generated ethereal user
      pass: "3c2dDBeL9Nd",
    },
  });
  // send mail with defined transport object
  await transporter.sendMail({
    from: '"HARAMBEE " <smolleys@smolleys.com', // sender address
    to: email, // list of receivers
    subject: "Verify Your HARAMBEE Challenge Account", // Subject line
    html: `<!doctype html>
<html>
  <head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Simple Responsive HTML Email With Button</title>
  <style>
@media only screen and (max-width: 620px) {
  table[class=body] h1 {
    font-size: 28px !important;
    margin-bottom: 10px !important;
  }

  table[class=body] p,
table[class=body] ul,
table[class=body] ol,
table[class=body] td,
table[class=body] span,
table[class=body] a {
    font-size: 16px !important;
  }

  table[class=body] .wrapper,
table[class=body] .article {
    padding: 10px !important;
  }

  table[class=body] .content {
    padding: 0 !important;
  }

  table[class=body] .container {
    padding: 0 !important;
    width: 100% !important;
  }

  table[class=body] .main {
    border-left-width: 0 !important;
    border-radius: 0 !important;
    border-right-width: 0 !important;
  }

  table[class=body] .btn table {
    width: 100% !important;
  }

  table[class=body] .btn a {
    width: 100% !important;
  }

  table[class=body] .img-responsive {
    height: auto !important;
    max-width: 100% !important;
    width: auto !important;
  }
}
@media all {
  .ExternalClass {
    width: 100%;
  }

  .ExternalClass,
.ExternalClass p,
.ExternalClass span,
.ExternalClass font,
.ExternalClass td,
.ExternalClass div {
    line-height: 100%;
  }

  .apple-link a {
    color: inherit !important;
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    text-decoration: none !important;
  }

  .btn-primary table td:hover {
    background-color: #9bc549 !important;
  }

  .btn-primary a:hover {
    background-color: #9bc549 !important;
    border-color: #9bc549 !important;
  }
}
</style></head>
  <body class style="background-color: #eaebed; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background-color: #eaebed; width: 100%;" width="100%" bgcolor="#eaebed">
      <tr>
        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
        <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; Margin: 0 auto;" width="580" valign="top">
          <div class="header" style="padding: 20px 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;">
              <tr>
                <td class="align-center" width="100%" style="font-family: sans-serif; font-size: 14px; vertical-align: top; text-align: center;" valign="top" align="center">
                  <a href=${verification_link} style="color: #9bc549; text-decoration: underline;"><img src="https://www.harambee.rw/wp-content/uploads/2018/11/Harambee-logo.png" height="40" alt="Postdrop" style="border: none; -ms-interpolation-mode: bicubic; max-width: 100%;"></a>
                </td>
              </tr>
            </table>
          </div>
          <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">

            <!-- START CENTERED WHITE CONTAINER -->
            <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span>
            <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">

              <!-- START MAIN CONTENT AREA -->
              <tr>
                <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; width: 100%;" width="100%">
                    <tr>
                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                       <br>
                       <br>
                       <br>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">⬇️&nbsp; You are most welcome to Harambe challenge platform  </p>
                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">📬&nbsp; Press the Button below to confirm your registration to the platform.</p>
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; box-sizing: border-box; width: 100%;" width="100%">
                          <tbody>
                            <tr>
                              <td align="center" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: auto; width: auto;">
                                  <tbody>
                                    <tr>
                                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #9bc549;" valign="top" align="center" bgcolor="#9bc549"> <a href=${verification_link} target="_blank" style="border: solid 1px #9bc549; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #9bc549; border-color: #9bc549; color: #ffffff;">Verify your account</a> </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            <!-- END MAIN CONTENT AREA -->
            </table></div></td></tr></table></body></html>
        `,
  });
  console.log("Message sent: %s", email);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

export async function shortListMail(email, company, jobTitle, name, req) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-pulse.com",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "smolleys@smolleys.com", // generated ethereal user
      pass: "3c2dDBeL9Nd",
    },
  });
  // send mail with defined transport object
  await transporter.sendMail({
    from: '"HARAMBEE " <smolleys@smolleys.com', // sender address
    to: email, // list of receivers
    subject: "CONGRATULATIONS FROM HARAMBEE CO!!!", // Subject line
    html: `<!doctype html>
<html>

<head>
  <meta name="viewport" content="width=device-width" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Simple Email HTML</title>

  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700|Poppins:400,700" rel="stylesheet">

  <style>
    /* -------------------------------------
          GLOBAL RESETS
      ------------------------------------- */

    /*All the styling goes here*/

    img {
      border: none;
      -ms-interpolation-mode: bicubic;
      max-width: 100%;
    }

    body {
      background-color: #dbdbdb;
      font-family: 'Poppins', 'Helvetica', sans-serif;
      -webkit-font-smoothing: antialiased;
      font-size: 15px;
      line-height: 28px;
      letter-spacing: .5px;
      margin: 0;
      padding: 0;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    table {
      border-collapse: separate;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
      width: 100%;
    }

    table td {
      font-family: 'Poppins', 'Helvetica', sans-serif;
      font-size: 15px;
      line-height: 28px;
      letter-spacing: .5px;
      text-align: left;
      color: #6F6F6F;
    }

    /* -------------------------------------
          BODY & CONTAINER
      ------------------------------------- */

    .body {
      background-color: #dbdbdb;
      width: 100%;
    }

    /* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */

    .container {
      display: block;
      Margin: 0 auto !important;
      /* makes it centered */
      max-width: 580px;
      padding: 10px;
      width: 580px;
    }

    /* This should also be a block element, so that it will fill 100% of the .container */

    .content {
      box-sizing: border-box;
      display: block;
      Margin: 0 auto;
      max-width: 580px;
      padding: 10px;
    }

    /* -------------------------------------
          HEADER, FOOTER, MAIN
      ------------------------------------- */

    .main {
      background: #ffffff;
      border-radius: 3px;
      width: 100%;
    }

    .wrapper {
      box-sizing: border-box;
      padding: 20px;
    }

    .content-block {
      padding-bottom: 10px;
      padding-top: 10px;
    }

    .footer {
      clear: both;
      Margin-top: 10px;
      text-align: center;
      width: 100%;
    }

    .footer td,
    .footer p,
    .footer span,
    .footer a {
      color: #000000;
      font-size: 14px;
      text-align: center;
    }

    /* -------------------------------------
          TYPOGRAPHY
      ------------------------------------- */

    h1 {
      font-family: 'Montserrat', 'Verdana', sans-serif;
      font-size: 30px;
      font-weight: bold;
      line-height: 42px;
      text-align: left;
      color: #000000;
      padding-bottom: 15px !important;
    }

    h2 {
      font-family: 'Montserrat', 'Verdana', sans-serif;
      font-size: 24px;
      font-weight: bold;
      line-height: 32px;
      text-align: left;
      color: #000000;
      padding-bottom: 15px !important;
    }

    h3 {
      font-family: 'Montserrat', 'Verdana', sans-serif;
      font-size: 20px;
      font-weight: bold;
      line-height: 28px;
      text-align: left;
      color: #000000;
      padding-bottom: 15px !important;
    }

    p,
    ul,
    ol {
      font-family: 'Poppins', 'Helvetica', sans-serif;
      font-size: 15px;
      font-weight: normal;
      margin: 0;
      margin-bottom: 15px;
    }

    p li,
    ul li,
    ol li {
      list-style-position: inside;
      margin-left: 5px;
    }

    a {
      color: #39b54a;
      text-decoration: underline;
    }

    /* -------------------------------------
          BUTTONS
      ------------------------------------- */

    .btn {
      box-sizing: border-box;
      width: 100%;
    }

    .btn>tbody>tr>td {
      padding-bottom: 15px;
    }

    .btn table {
      width: auto;
    }

    .btn table td {
      background-color: #ffffff;
      border-radius: 5px;
      text-align: center;
    }

    .btn a {
      background-color: #ffffff;
      border: solid 1px #39b54a;
      border-radius: 5px;
      box-sizing: border-box;
      color: #39b54a;
      cursor: pointer;
      display: inline-block;
      font-size: 15px;
      font-weight: bold;
      margin: 0;
      padding: 12px 25px;
      text-decoration: none;
      text-transform: capitalize;
    }

    .btn-primary table td {
      background-color: #39b54a;
    }

    .btn-primary a {
      background-color: #39b54a;
      border-color: #39b54a;
      color: #ffffff;
    }

    /* -------------------------------------
          OTHER STYLES THAT MIGHT BE USEFUL
      ------------------------------------- */

    .last {
      margin-bottom: 0;
    }

    .first {
      margin-top: 0;
    }

    .align-center {
      text-align: center;
    }

    .align-right {
      text-align: right;
    }

    .align-left {
      text-align: left;
    }

    .clear {
      clear: both;
    }

    .mt0 {
      margin-top: 0;
    }

    .mb0 {
      margin-bottom: 0;
    }

    .preheader {
      color: transparent;
      display: none;
      height: 0;
      max-height: 0;
      max-width: 0;
      opacity: 0;
      overflow: hidden;
      mso-hide: all;
      visibility: hidden;
      width: 0;
    }

    .powered-by a {
      text-decoration: none;
    }

    hr {
      border: 0;
      border-bottom: 1px solid #dbdbdb;
      Margin: 20px 0;
    }

    /* -------------------------------------
          RESPONSIVE AND MOBILE FRIENDLY STYLES
      ------------------------------------- */

    @media only screen and (max-width: 620px) {
      table[class=body] h1 {
        font-size: 28px !important;
        margin-bottom: 10px !important;
      }
      table[class=body] p,
      table[class=body] ul,
      table[class=body] ol,
      table[class=body] td,
      table[class=body] span,
      table[class=body] a {
        font-size: 16px !important;
      }
      table[class=body] .wrapper,
      table[class=body] .article {
        padding: 10px !important;
      }
      table[class=body] .content {
        padding: 0 !important;
      }
      table[class=body] .container {
        padding: 0 !important;
        width: 100% !important;
      }
      table[class=body] .main {
        border-left-width: 0 !important;
        border-radius: 0 !important;
        border-right-width: 0 !important;
      }
      table[class=body] .btn table {
        width: 100% !important;
      }
      table[class=body] .btn a {
        width: 100% !important;
      }
      table[class=body] .img-responsive {
        height: auto !important;
        max-width: 100% !important;
        width: auto !important;
      }
    }

    /* -------------------------------------
          PRESERVE THESE STYLES IN THE HEAD
      ------------------------------------- */

    @media all {
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }
      .apple-link a {
        color: inherit !important;
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        text-decoration: none !important;
      }
      .btn-primary table td:hover {
        background-color: #2b8838 !important;
      }
      .btn-primary a:hover {
        background-color: #2b8838 !important;
        border-color: #2b8838 !important;
      }
    }
  </style>
</head>

<body class="">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
    <tr>
      <td>&nbsp;</td>
      <td class="container">
        <div class="footer">
          <table border="0" cellpadding="0" cellspacing="0">
            <tr>
              <td class="content-block">
                <a href="https://denvercbdco.com" target="_blank"><img src="https://www.harambee.rw/wp-content/uploads/2018/11/Harambee-logo.png" alt="Denver CBD" align="center" style="display:block;float:none;margin:0 auto;max-width:200px;outline:0;"></a>
              </td>
            </tr>
          </table>
        </div>
        <div class="content">

          <!-- START CENTERED WHITE CONTAINER -->
          <span class="preheader">HARAMBEE</span>
          <table role="presentation" class="main">

            <!-- START MAIN CONTENT AREA -->
            <tr>
              <td class="wrapper">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <h2>Congratulations ${name}!</h2>
                      <p>You have been shortlisted for the job position you have applied for.</p>
                      <p><b>Further communication:</b> ${company}<br>
                        <b>Company:</b> ${company}</p>
                        <b>Position:</b> ${jobTitle}</p>
                      <p>Log in to HC Platform <a href="#" target="_blank">Partner's Dashboard</a></p>
                      <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary">
                        <tbody>
                          <tr>
                            <td align="left">
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                  <tr>
                                    <td> <a href="#" target="_blank"></i>Go to Partner Dashboard</a>                                      </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- END MAIN CONTENT AREA -->
          </table>

          <!-- START FOOTER -->
          <div class="footer">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td class="content-block powered-by">
                  <a href="#" target="_blank" style="font-weight:bold">UNSUBSCRIBE</a> &nbsp;
                  <a href="#" target="_blank" style="font-weight:bold">PRIVACY POLICY</a> &nbsp;
                  <a href="#" target="_blank" style="font-weight:bold">PARTNER AGREEMENT</a> &nbsp;
                  <a href="#" target="_blank" style="font-weight:bold">DASHBOARD LOGIN</a>
                </td>
              </tr>
              <tr>
                <td class="content-block">
                  <span class="apple-link">This email was sent by H C,<br>Kigali Rwanda </span>
                  <br> Copyright © 2023  HARAMBEE CHALLENGE
                </td>
              </tr>
              <tr>
                <td class="content-block powered-by">
                  <a href="#" target="_blank"><img title="Facebook" src="https://hoiqh.stripocdn.email/content/assets/img/social-icons/logo-black/facebook-logo-black.png" alt="Facebook" width="32" height="32" style="display:inline-block;border:0;outline:none;text-decoration:none;"></a>                  &nbsp;
                  <a href="#" target="_blank" style="font-weight:bold"><img title="Instagram" src="https://hoiqh.stripocdn.email/content/assets/img/social-icons/logo-black/instagram-logo-black.png" alt="Instagram" width="32" height="32" style="display:inline-block;border:0;outline:none;text-decoration:none;"></a>                  &nbsp;
                  <a href="#" target="_blank" style="font-weight:bold"><img title="Youtube" src="https://hoiqh.stripocdn.email/content/assets/img/social-icons/logo-black/youtube-logo-black.png" alt="Youtube" width="32" height="32" style="display:inline-block;border:0;outline:none;text-decoration:none;"></a>                  &nbsp;
                  <a href="#" target="_blank" style="font-weight:bold"><img title="Email" src="https://hoiqh.stripocdn.email/content/assets/img/other-icons/logo-black/mail-logo-black.png" alt="Email" width="32" height="32" style="display:inline-block;border:0;outline:none;text-decoration:none;"></a>
                </td>
              </tr>
            </table>
          </div>
          <!-- END FOOTER -->

          <!-- END CENTERED WHITE CONTAINER -->
        </div>
      </td>
      <td>&nbsp;</td>
    </tr>
  </table>
</body>

</html>`,
  });
  console.log("Message sent: %s", email);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}




export async function resetMail(email, code) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-pulse.com",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "smolleys@smolleys.com", // generated ethereal user
      pass: "3c2dDBeL9Nd", // generated ethereal password
    },
  });
  // send mail with defined transport object
  await transporter.sendMail({
    from: '"Smolleys " <smolleys@smolleys.com>', // sender address
    to: email, // list of receivers
    subject: "Reset Your Smolleys Password", // Subject line
    html: "Here is your code to reset your password. " + `${code}`, // plain text body
  });
  console.log("Message sent: %s", email);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}