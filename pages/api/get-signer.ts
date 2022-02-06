//@ts-nocheck

import sign from "@utils/sign";
import type { NextApiRequest, NextApiResponse } from "next";

export type AuthData = {
  hash: string;
  signature: string;
};

import whitelist from "@src/whitelist.json"
const privateKey = process.env.SIGNER_PRIVATE_KEY!;

import prePurchaseContractMetadata from "@src/artifacts/prePurchaseContract/metadata.json";

export default async function getSigner(
  req: NextApiRequest,
  res: NextApiResponse<AuthData | string>
) {
    const {account} = req.query;

    console.log(`Auth requested for account ${account}`)
    const isWhitelisted = whitelist[account];
    if (!isWhitelisted) return res.status(403).send({error: "Account Not on Whitelist"});

    const message: AuthData = await sign(
        privateKey,
        prePurchaseContractMetadata.address,
        account
    )

    res.status(200).json(message)
}