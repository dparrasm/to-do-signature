import nodemailer from "nodemailer";
import {
  MAIL_USERNAME,
  MAIL_PASSWORD,
  OAUTH_CLIENTID,
  OAUTH_CLIENT_SECRET,
  OAUTH_REFRESH_TOKEN,
} from "../config/credentials";

exports.sendEmail = function (
  emailAddress: string,
  email: { subject: string; message: string },
  documents: { title: string; fileContent: string }[]
) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: MAIL_USERNAME,
      pass: MAIL_PASSWORD,
      clientId: OAUTH_CLIENTID,
      clientSecret: OAUTH_CLIENT_SECRET,
      refreshToken: OAUTH_REFRESH_TOKEN,
    },
  });
  const attachments = documents.map((d) => {
    return {
      filename: d?.title,
      path: d?.fileContent,
    };
  });

  let mailOptions = {
    from: MAIL_USERNAME,
    to: emailAddress,
    subject: email?.subject,
    text: email?.message,
    attachments: attachments,
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });
};
