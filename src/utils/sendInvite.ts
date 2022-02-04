import axios from "axios";

export default async function sendInvite(address: string) {
  // Send a post request to invite.ts, + middleware

  try {
      console.log("Sending post...")
    const res = await axios.post("/api/invite", {
      address,
    });
    console.log(res.data)
    return res
  } catch (err) {
    throw err;
  }
}
