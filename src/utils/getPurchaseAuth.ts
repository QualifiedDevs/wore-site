import axios from "axios";

import { AuthData } from "@api/get-signer";

export default async function requestAuth(account: string) {
  
  let data: AuthData | null = null;

  try {
    console.log("REQUESTING AUTH...");
    const res = await axios.get(`/api/get-signer?account=${account}`);
    data = res.data;
    console.log("WHITELIST AUTHORIZED", data);
  } catch (err) {
    console.error("WHITELIST DENIED", err);
  }

  return data;
}