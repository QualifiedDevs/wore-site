import axios from "axios";

import { AuthData } from "@api/get-signer";

export default async function requestAuth(
  account: string,
  access: string | null
) {
  let data: AuthData | null = null;
  let res;
  try {
    console.log("REQUESTING AUTH...");
    res = await axios.post("api/get-signer", {
      account,
      access,
    });
    data = res.data;
    console.log("WHITELIST AUTHORIZED", data);
  } catch (err) {
    console.error("WHITELIST DENIED", err);
  }
  return data;
}
