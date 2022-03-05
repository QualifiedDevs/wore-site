import axios from "axios";

export default async function ({
  email,
  discord,
  walletAddress,
}: {
  email: string;
  discord?: string;
  walletAddress?: string;
}) {
  let res;
  try {
    res = await axios.post("/api/signup", {
      email,
      discord,
      walletAddress,
    });
  } catch (err) {
    throw err;
  }
  return res;
}
