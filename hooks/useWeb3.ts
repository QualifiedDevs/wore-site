import React, { useContext } from "react";
import { Web3Context } from "@components/providers/Web3Provider";

export default function useWeb3() {
  return useContext(Web3Context);
}
