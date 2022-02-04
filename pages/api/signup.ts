import type { NextApiRequest, NextApiResponse } from "next";
import submitData from "@utils/submitData";

export default async function signup(req: NextApiRequest, res: NextApiResponse) {
    
    const {email, discord, walletAddress} = req.body;
    
    let entryRes;

    try {
        entryRes = await submitData(email, discord, walletAddress);
        console.log("RESPONSE RECEIVED", entryRes)
        res.status(200).send("Submission Successful");
    } catch(err) {
        throw(err)
    }

    return res;
}