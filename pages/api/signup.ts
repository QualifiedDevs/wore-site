import type { NextApiRequest, NextApiResponse } from "next";
import submitData from "@utils/submitData";

import { sendRegistrationConfirmation } from "@utils/sendEmail";
import formatRes from "@utils/formatRes";

export default async function signup(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, discord, walletAddress } = req.body;

  let entryRes;

  const [data1, err1] = await formatRes(submitData(email, discord, walletAddress))
  if (err1) {
    res.status(500).send("Failed to register, please try again");
    throw err1;
  }
  console.log(`${email} successfully added to notion collection`)

  console.log("sending registration email...");
  const [data2, err2] = await formatRes(
    sendRegistrationConfirmation({ address: email })
  );
  if (err2) {
    res
      .status(500)
      .send("Registration successful but confirmation failed to send");
      throw err2;
  }
  console.log("Email sent successfully")
  
  res.status(200).send("Submission Successful");
}
