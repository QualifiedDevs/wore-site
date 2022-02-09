import nodemailer from "nodemailer";
import { google } from "googleapis";

// const CLIENT_ID =
//   "887504843204-asq8cgktnkgq1csf4nqasfb3fi61alui.apps.googleusercontent.com";
// const CLIENT_SECRET = "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";
// const REDIRECT_URI = "https://developers.google.com/oauthplayground";
// const REFRESH_TOKEN =
//   "1//04q6MHsld-tYxCgYIARAAGAQSNwF-L9IrcjkTeFTEcQ86J3xE8HtA2ZIVZ7RZf11qhFLV52rV0GNFpbbGCM4yYmxlI5kLE4s_B7k";

// const oAuth2Client = new google.auth.OAuth2(
//   CLIENT_ID,
//   CLIENT_SECRET,
//   REDIRECT_URI
// );
// oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

// const transporter = nodemailer.createTransport({
//   host: "wolfofrealestate.com",
//   port: 587,
//   auth: {
//     user: process.env.WORE_EMAIL_USER!,
//     pass: process.env.WORE_EMAIL_PASS!,
//   },
// });

// export default async function sendEmail(address: string, token: string) {
//   const res = await transporter.sendMail({
//     from: "WORE Info <info@wolfofrealestate.com>",
//     to: address,
//     subject: `Presale access for ${address}`,
//     html: `<span>Here is your access link https://wolfofrealestate.com/presale?u=${token}<span>`,
//   });
//   console.log("Message Sent with Response:", res);
// }

export default async function sendEmail(address: string, token: string) {
  //   const accessToken = (await oAuth2Client.getAccessToken()) as string;

  // const transport = nodemailer.createTransport({
  //   service: "gmail",
  //   auth: {
  //     type: "OAuth2",
  //     user: process.env.WORE_EMAIL_USER!,
  //     clientId: CLIENT_ID,
  //     clientSecret: CLIENT_SECRET,
  //     refreshToken: REFRESH_TOKEN,
  //     accessToken,
  //   },
  // });

  const user = process.env.WORE_EMAIL_USER!;
  const pass = process.env.WORE_EMAIL_PASS!;

  const transport = nodemailer.createTransport({
    // service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user,
      pass,
    },
    tls: {
      ciphers: "SSLv3",
    },
  });

  const mailOptions = {
    from: `WORE Info ${user}`,
    to: address,
    subject: `Presale access for ${address}`,
    html: `<span><a href=https://wolfofrealestate.com/join-whitelist?access=${token} >Click Here</a> to join the WORE presale<span>`,
  };

  const res = await transport.sendMail(mailOptions);
  return res;
}