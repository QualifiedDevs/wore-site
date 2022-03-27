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
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <span>Congratulations! Here is your personal Wolf of Real Estate Private sale link:<br/><br/></span><a href=https://wolfofrealestate.com/?access=${token}#private-sale >https://wolfofrealestate.com/?access=${token}#private-sale</a><br/><br/><span>This link allows you to purchase up to a maximum of 3 presale NFT's at 0.5 ETH each. The link has been formatted to bind to one wallet and will not allow another wallet to purchase.<br/></span> <span>Therefor, sharing this link will not work for another person and is your unique link.</span>
    </body>
    </html>`,
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
    from: `Rocky Mix REALTORⓇ`,
    to: address,
    subject: `WORE Raffle Entry Confirmation`,
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>WORE Subscriber Confirmation Email</title>
      <style>
        body {
          display: flex;
          flex-direction: column;
        }
        span {
          margin-bottom: 1rem;
        }
        .logo {
          width: 200px;
        }
      </style>
    </head>
    <body>
      <h1>Congratulations On Entering Our Wolf Of Real Estate NFT Whitelist Giveaway!</h1>
      <span>Hi future Wolf,<br/><br/></span>
      <span>We wanted to thank you for entering our Wolf Of Real Estate NFT whitelist giveaway.</span>
      <span>In case you weren't aware, the WORE NFTs are going to be loaded with utility and connected to physical real-world rewards and businesses, by a team that has proven itself in the real world to deliver<br/><br/>.</span>
      <span>Look, however you see this, you are early joining us now. Whether you are a seasoned NFT enthusiast or looking to finally get into the NFT space for the first time with a trusted team, being here this early will have future benefits.<br/><br/></span>
      <span>We would like to invite you to join our Twitter community to be part of our conversations and to keep updated with the latest insider news!<br/><br/></span>
      <span>Please <a href="https://twitter.com/worenft">follow us on Twitter</a> to stay up to date and look to get access to our discord.<br/><br/></span>
      <span>Not only will you receive more WORE information…<br/><br/></span>
      <span>…you will have opportunities to enter future giveaways for chances to win additional Whitelist spots, NFTs, and more!<br/><br/></span>
      <span>Other than that, make sure you save our email address to your contact and keep an eye out for our notifications as we will be sharing secret information about this collection over the upcoming days & weeks.<br/><br/></span>
      <span>Most importantly, we'll be randomly selecting winners, (possibly you) to receive an early "Private sale" link<br/><br/></span>
      <span>Don't hesitate to ask any questions.<br/><br/></span>
      <span>Talk soon,<br/><br/></span>
      <h3>Rocky from Wolf of Real Estate</h3>
      <a href="https://www.wolfofrealestate.com">
      <img src="https://www.wolfofrealestate.com/email-logo.png" class="logo"/>
      </a>
    </body>
    </html>`,
  };
  const [data, err] = await formatRes(transport.sendMail(mailOptions));
  console.error(err);
  if (err) throw err;
  return data;
}