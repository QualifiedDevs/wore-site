import { randomUUID } from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";

import notion from "@utils/notionClient";
import sendEmail from "@utils/sendEmail";

const whitelist_id = process.env.NOTION_WHITELIST_ID!;
const referrers_id = process.env.NOTION_REFERRERS_ID!;

console.log("WHITELIST_ID", whitelist_id);
console.log("REFERRERS_ID", referrers_id);

async function getDatabaseEntries(id: string) {
  const res = await notion.databases.query({ database_id: id });
  return res;
}

async function getReferrerFromToken(token: string) {
  let res;
  console.log(referrers_id);
  try {
    res = await notion.databases.query({
      database_id: referrers_id,
      filter: {
        property: "UUID",
        text: {
          equals: token,
        },
      },
    });
  } catch (err) {
    throw err;
  }
  return res.results[0];
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

  const { access, address } = req.body;
  const referrer: any = await getReferrerFromToken(access);

  if (!referrer)
    return res.status(403).send("Referrer not authorized to send invites");
  console.log("referrer", referrer);

  const whitelist = await getDatabaseEntries(whitelist_id);
  const page = getPageFromEmail(address, whitelist);

  const pageProps: any = {};

  pageProps.referrer = referrer.properties.Email;

  pageProps.token = {
    rich_text: [{ type: "text", text: { content: generateUUID(whitelist) } }],
  };

  if (!page) {
    pageProps.email = { email: address };
    const entry_id = whitelist.results.length.toString();
    const entryRes = await createEntry(whitelist_id, entry_id, pageProps);
    return res.status(200).send(`New entry for account: ${address}`);
  }

  if (!getAttachedWallet(page)) {
    // generate uuid
  }

  await updateEntry(page, pageProps);

  let mailRes;
  try {
    mailRes = await sendEmail("minnow@qualifieddevs.io", "{TOKEN}");
    console.log("MAIL RESPONSE RECEIVED", mailRes);
  } catch (err) {
    console.error("MAIL FAILED", err);
  }

  res.status(200).send(`${address}`);
}
