import notion from "@utils/notionClient";
import { pagespeedonline } from "googleapis/build/src/apis/pagespeedonline";

// Look for email in database
// If it doesn't exist, make a new entry

const collection_id = process.env.NOTION_LANDING_PAGE_COLLECTIONS_ID!;

async function getPageFromEmail(email: string) {
  let res;
  try {
    res = await notion.databases.query({
      database_id: collection_id,
      filter: {
        property: "Email Address",
        text: {
          contains: email,
        },
      },
    });
  } catch (err) {
    throw err;
  }
  const page = res.results[0];
  console.log("PAGE", page);
  return page;
}

async function makeEntry(props: {
  email: string;
  discord?: string;
  walletAddress?: string;
}) {
  const pageProps: any = {};

  pageProps["Email Address"] = {
    email: props.email,
  };

  // pageProps.Discord = {
  //   rich_text: [{ type: "text", text: { content: props.discord } }],
  // };

  // pageProps["Wallet Address"] = props.walletAddress? {
  //   rich_text: [{ type: "text", text: { content: props.walletAddress } }],
  // } : undefined;

  let res;
  try {
    res = await notion.pages.create({
      parent: { database_id: collection_id },
      properties: { ...pageProps },
    });
  } catch (err) {
    throw err;
  }
  return res;
}

async function updateEntry(
  page: any,
  props: {
    email?: string;
    discord?: string;
    walletAddress?: string;
  }
) {
  const pageProps: any = {};

  pageProps["Email Address"] = props.email
    ? {
        email: props.email,
      }
    : undefined;

  pageProps.Discord = props.discord
    ? {
        rich_text: [{ type: "text", text: { content: props.discord } }],
      }
    : undefined;

  pageProps["Wallet Address"] = props.walletAddress
    ? {
        rich_text: [{ type: "text", text: { content: props.walletAddress } }],
      }
    : undefined;

  let res;
  try {
    res = await notion.pages.update({
      page_id: page.id,
      properties: { ...pageProps },
    });
  } catch (err) {
    throw err;
  }
  return res;
}

export default async function submitData(
  email: string,
  discord: string,
  walletAddress?: string
) {
  const page = await getPageFromEmail(email);
  return page ? await updateEntry(page, { email }) : await makeEntry({ email });
}
