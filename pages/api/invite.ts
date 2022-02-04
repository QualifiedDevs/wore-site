import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

import notion from "@utils/notionClient"
import sendEmail from "@utils/sendEmail"

const whitelist_id = process.env.NOTION_WHITELIST_ID!;
const referers_id = process.env.NOTION_REFERERS_ID!;

async function getDatabaseEntries(id: string) {
  const res = await notion.databases.query({ database_id: id });
  return res;
}

// Return the first page with the given email, or null if none is found
function getPageFromEmail(email: string, whitelist: any) {
  let matchingPage;
  return whitelist.results.some((page: any) => {
    matchingPage = page;
    if (page.properties.email.email === email) return true;
  })
    ? matchingPage
    : null;
}

// If a matching UUID is found, return null. Otherwise return the given uuid.
function availableUUID(uuid: string, db: any) {
  return db.results.some((page: any) => {
    if (page.properties.token.rich_text[0]?.plain_text === uuid) return true;
  })
    ? null
    : uuid;
}

function generateUUID(db: any) {
  let uuid;
  while (!uuid) {
    uuid = randomUUID();
    uuid = availableUUID(uuid, db);
  }
  return uuid;
}

function getAttachedWallet(page: any) {
  return page.properties.wallet_address.rich_text[0]?.plain_text;
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

async function createEntry(database_id: any, entry_id: string, props: any) {
  let res;

  const id = {
    title: [
      {
        type: "text",
        text: {
          content: entry_id,
        },
      },
    ],
  };

  try {
    const res = await notion.pages.create({
      parent: { database_id },
      properties: { id, ...props },
    });
  } catch (err) {
    throw err;
  }
  return res;
}

export default async function inviteHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //TODO: Pull referral token. How? Probably req params AND JWT. ignore for now.
  const { address } = req.body;

  //! If this is not a valid referer, respond with no access!

  const whitelist = await getDatabaseEntries(whitelist_id);
  const page = getPageFromEmail(address, whitelist);

  //TODO: Convert to struct with getters/setters
  const pageProps: any = {}; //TODO: Make my own properties
  pageProps.token = {
    // DOES THIS WORK?
    rich_text: [{ type: "text", text: { content: generateUUID(whitelist) } }],
  };

  if (!page) {
    pageProps.email = { email: address };
    const entry_id = whitelist.results.length.toString()
    const entryRes = await createEntry(whitelist_id, entry_id, pageProps);
    return res.status(200).send(`New entry for account: ${address}`);
  }

  if (!getAttachedWallet(page)) {
    // generate uuid
  }

  await updateEntry(page, pageProps);

  //? If an entry with email exists...

  //* TRUE: Wallet Conneted? If so we can send them the email.
  //! FALSE: Generate a UUID

  // If there is no page, just create a new entry from scratch.
  // If there is a page,

  // * NORMAL:
  // * UPDATE WHITELIST

  // ! We have page so it has been entered before. What if there is already a referer?

  let mailRes;
  try {
    mailRes = await sendEmail("minnow@qualifieddevs.io", "{TOKEN}")
    console.log("MAIL RESPONSE RECEIVED", mailRes)
  } catch(err) {
    console.error("MAIL FAILED", err)
  }


  res.status(200).send(`${address}`);
}