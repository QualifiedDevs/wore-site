import axios from "axios";

export default async function sendInvite(access: string, address: string) {
  // Send a post request to invite.ts, + middleware
  let res;
  try {
    res = await axios.post("/api/invite", {
      access,
      address,
    });
    return res;
  } catch (err) {
    throw err;
  }
}
