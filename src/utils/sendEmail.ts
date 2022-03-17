import nodemailer from "nodemailer";
import { google } from "googleapis";

import formatRes from "@utils/formatRes";

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

const user = process.env.WORE_EMAIL_USER!;
const pass = process.env.WORE_EMAIL_PASS!;

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
    from: `WORE Info <${user}>`,
    to: address,
    subject: `Presale access for ${address}`,
    html: `<span><a href=https://wolfofrealestate.com/?access=${token}#private-sale >Click Here</a> to join the WORE presale<span>`,
  };

  const res = await transport.sendMail(mailOptions);
  return res;
}

export async function sendRegistrationConfirmation({
  address,
}: {
  address: string;
}) {

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
    from: `WORE Info <${user}>`,
    to: address,
    subject: `WORE Raffle Entry Confirmation`,
    html: `<html>
    <head>
      <style>
        h1 {
          text-align: center;
        }
      </style>
    </head>
    <body>
    <h1>Congratulations On Entering Into Our Wolf Of Real Estate NFT Whitelist Giveaway!</h1>
    <p>Hi, Lupa here!&nbsp;</p>
    
    <p>I wanted to congratulate you for entering into our Wolf of Real Estate NFT whitelist giveaway.</p>
    
    <p>These WORE NFTs are going to&nbsp;be loaded with utility and connected to physical real-world rewards and businesses.</p>
    
    <p>Look, you are early joining us now. Whether you are a seasoned NFT enthusiast or looking to finally get into the NFT space for the first time with a trusted team, being here this early will have future benefits.&nbsp;</p>
    
    <p>We would like to invite you to join our Twitter community to be part of our conversations and to keep updated with the latest insider news!</p>
    
    <p><em>Please <a href="https://twitter.com/worenft">follow us on Twitter</a>&nbsp; to stay up to date and look to get access to our discord.</em></p>
    
    <p>Not only that will you receive more WORE information&hellip;</p>
    
    <p>&hellip;you will have opportunities to enter&nbsp;<strong>future giveaways for chances to win additional Whitelist spots &amp; even NFTs!</strong></p>
    
    <p>Other than that, make sure you save our email address to your contact and keep an eye out for our emails as we will be sharing secret information about this collection over the upcoming days/weeks, without&nbsp;being spammy.</p>
    
    <p>And most importantly, we&rsquo;ll be randomly selecting winners, (possibly you) to receive an early&nbsp;Private&nbsp;sale link!&nbsp;</p>
    
    <p>Talk soon,</p>
    <strong>Lupa from Wolf Of Real Estate</strong></body>
    </html>`
  };
  const [data, err] = await formatRes(transport.sendMail(mailOptions));
  if (err) throw err;
  return data;
}