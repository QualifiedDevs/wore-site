//@ts-nocheck

import Web3 from "web3";
const web3 = new Web3("wss://remotenode.com:8546");
import type AuthData from "@api/get-getSigner"

async function sign(
  privateKey: string,
  contractAddress: string,
  account: string
) {
  const data = web3.utils.soliditySha3(
    { t: "address", v: contractAddress },
    { t: "address", v: account }
  );
  
  const { messageHash: hash, signature } = await web3.eth.accounts.sign(
    data,
    privateKey
  );

  return { hash, signature } as AuthData;
}

export default sign;

//! err probably in here, presumable with wss connection