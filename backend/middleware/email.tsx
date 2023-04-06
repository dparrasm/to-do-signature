import nodemailer from "nodemailer";

exports.sendEmail = function (
  emailAddress: string,
  email: { subject: string; message: string } /*,
documents: { title: string; fileContent: string}[]*/
) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });
  // const attachments = documents.map((d) => {
  //   return {
  //     filename: d?.title,
  //     path: d?.fileContent,
  //   };
  // });

  let mailOptions = {
    from: process.env.MAIL_USERNAME,
    to: emailAddress,
    subject: email?.subject,
    text: email?.message,
    //attachments: attachments,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
};
