import notion from "@utils/notionClient";

import sign from "@utils/sign";
import type { NextApiRequest, NextApiResponse } from "next";

export type AuthData = {
  hash: string;
  signature: string;
};

const privateKey = process.env.SIGNER_PRIVATE_KEY!;

import privateSaleContractMetadata from "@src/artifacts/privateSaleContract/metadata.json";

// * NOTION UTILS
const whitelist_id = process.env.NOTION_WHITELIST_ID!;

async function getDatabaseEntries(id: string) {
  const res = await notion.databases.query({ database_id: id });
  return res.results;
}

function getEntryFromWalletAddress(address: string, db: any) {
  let matchingPage;
  return db.some((page: any) => {
    matchingPage = page;
    if (page.properties.wallet_address.rich_text[0]?.plain_text === address)
      return true;
  })
    ? matchingPage
    : null;
}

function getEntryFromToken(token: string, db: any) {
  let matchingPage;
  return db.some((page: any) => {
    matchingPage = page;
    if (page.properties.token.rich_text[0]?.plain_text === token) return true;
  })
    ? matchingPage
    : null;
}

async function updateEntry(page: any, props: any) {
  let res;
  try {
    res = await notion.pages.update({
      page_id: page.id,
      properties: {
        ...props,
      },
    });
  } catch (err) {
    throw err;
  }
  return res;
}

export default async function getSigner(
  req: NextApiRequest,
  res: NextApiResponse<AuthData | string | { error: string }>
) {
  const { account, access } = req.body;

  console.log("ACCESSED");

  console.log(`AUTH REQUEST WITH ACCOUNT: ${account} AND ACCESS ${access}`);

  if (!account) return res.status(500).json({ error: "Account not provided" });

  console.log("PRIVATE SALE OPEN, ACCOUNT AUTHORIZED");
  const message: AuthData = await sign(
    privateKey,
    privateSaleContractMetadata.address,
    account
  );
  return res.status(200).json(message);

  // const whitelist = await getDatabaseEntries(whitelist_id);

  // if (getEntryFromWalletAddress(account, whitelist)) {
  //   console.log("WALLET ADDRESS PRESENT, ACCOUNT AUTHORIZED");
  //   const message: AuthData = await sign(
  //     privateKey,
  //     privateSaleContractMetadata.address,
  //     account
  //   );
  //   return res.status(200).json(message);
  // }

  // if (!access)
  //   return res
  //     .status(403)
  //     .json({ error: "Account not on whitelist, no access token provided" });

  // const page = getEntryFromToken(access, whitelist);

  // if (!page)
  //   return res.status(403).json({ error: "Token does not have access" });

  // const message: AuthData = await sign(
  //   privateKey,
  //   privateSaleContractMetadata.address,
  //   account
  // );

  // const pageProps: any = {};
  // pageProps.wallet_address = {
  //   rich_text: [{ type: "text", text: { content: account } }],
  // };
  // pageProps.token = { rich_text: [] };

  // try {
  //   console.log("UPDATING ENTRY");
  //   const res = await updateEntry(page, pageProps);
  //   console.error("UPDATE SUCCESSFUL", res);
  // } catch (err) {
  //   console.error("ENTRY UPDATE FAILED", err);
  //   throw err;
  // }

  // res.status(200).json(message);
}
