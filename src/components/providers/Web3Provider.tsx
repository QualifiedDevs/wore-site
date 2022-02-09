//@ts-nocheck

import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";

import isClient from "@utils/isClient";
import defaultProvider from "@utils/defaultProvider";
import getPurchaseAuth from "@utils/getPurchaseAuth";

import { AuthData } from "@api/get-signer";

export type Web3ContextValues = {

  connected?: boolean;
  setConnected?: React.Dispatch<boolean>;

  presaleContract?: any;
  setPresaleContract?: React.Dispatch<any>;

  connectedAccount?: string;
  setConnectedAccount?: React.Dispatch<string[] | null>;

  maxPerWallet?: number;
  setMaxPerWallet?: React.Dispatch<number>;

  maxSupply?: number;
  setMaxSupply?: React.Dispatch<number>;

  totalSupply?: number;
  setTotalSupply?: React.Dispatch<number>;

  soldOut?: boolean;
  setSoldOut?: React.Dispatch<boolean>;

  mintedBalance?: number;
  setMintedBalance?: React.Dispatch<number>;

  isMinting?: boolean;
  setIsMinting?: React.Dispatch<boolean>;

  provider?: any;
  setProvider?: React.Dispatch<any>;

  signer?: any;
  setSigner?: React.Dispatch<any>;

  price?: number;
  setPrice?: React.Dispatch<number>;

  whitelistAuth: AuthData | undefined | null;
  setWhitelistAuth: React.Dispatch<AuthData | undefined | null>;
};

import prePurchaseContractMetadata from "@src/artifacts/prePurchaseContract/metadata.json";
import prePurchaseAbi from "@src/artifacts/prePurchaseContract/abi.json";

//@ts-ignore

const readonlyPrePurchaseContract = new ethers.Contract(
  prePurchaseContractMetadata.address,
  prePurchaseAbi,
  defaultProvider
);

async function getReadonlyProperty(
  propertyName: string,
  contract: any,
  args?: any
) {
  let res;
  try {
    res = args
      ? await contract[propertyName](args)
      : await contract[propertyName]();
  } catch (err) {
    console.log(`PROPERTY QUERY FAILED: ${propertyName}`);
    throw err;
  }
  return res;
}

async function updateReadonlyProperty(
  propertyName: string,
  contract: any,
  callback: any, //TODO: Replace with function
  args?: [any]
) {
  let res;
  try {
    res = await getReadonlyProperty(propertyName, contract, args);
    callback(res);
  } catch (err) {
    throw err;
  }
  return res;
}

const defaultContext: Web3ContextValues = {
  //   conntectedAccounts: null,
  connected: false,
  isMinting: false,
  mintedBalance: 0,
};

export const Web3Context = createContext(defaultContext);

//! CONTRACT CONTRACT CONTRACT
const presaleContractRaw = new ethers.Contract(
  prePurchaseContractMetadata.address,
  prePurchaseAbi,
  defaultProvider,
);

export default function Web3Provider(props: any) {
  const [connected, setConnected] = useState(defaultContext.connected);
  const [presaleContract, setPresaleContract] = useState(
    defaultContext.presaleContract
  );
  const [connectedAccount, setConnectedAccount] = useState(
    defaultContext.connectedAccount
  );
  const [maxPerWallet, setMaxPerWallet] = useState(defaultContext.maxPerWallet);
  const [maxSupply, setMaxSupply] = useState(defaultContext.maxSupply);
  const [totalSupply, setTotalSupply] = useState(defaultContext.totalSupply);
  const [soldOut, setSoldOut] = useState(defaultContext.soldOut);
  const [mintedBalance, setMintedBalance] = useState(
    defaultContext.mintedBalance
  );
  const [isMinting, setIsMinting] = useState(defaultContext.isMinting);
  const [provider, setProvider] = useState(defaultContext.provider);
  const [signer, setSigner] = useState(defaultContext.signer);
  const [price, setPrice] = useState(defaultContext.price);
  const [whitelistAuth, setWhitelistAuth] = useState(
    defaultContext.whitelistAuth
  );

  //* ASYNC USEEFFECT TEMPLATE
  //   useEffect(() => {
  //     (async () => {
  //
  //     })()
  //   }, [])

  useEffect(() => {
    if (!provider) {
      presaleContractRaw.connect(defaultProvider);
      setSigner(null);
      setPresaleContract(null);
      setConnectedAccount(null);
      setConnected(false);
      return;
    }

    const signer = provider.getSigner();
    setSigner(signer);

    (async () => {
      const address = await signer.getAddress();
      setConnectedAccount(address);
      setConnected(true);
    })();

    //! Make the contract here!
  }, [provider]);

  useEffect(() => {
    if (!signer) return;
    setPresaleContract(
      new ethers.Contract(
        prePurchaseContractMetadata.address,
        prePurchaseAbi,
        signer
      )
    );
  }, [signer]);

  // * Initialize Readonly Properties w/out signer
  useEffect(() => {
    if (!isClient) return;

    updateReadonlyProperty(
      "MAX_PURCHASE",
      readonlyPrePurchaseContract,
    setMaxPerWallet
    );
    updateReadonlyProperty(
      "MAX_SUPPLY",
      readonlyPrePurchaseContract,
      setMaxSupply
    );
    updateReadonlyProperty(
      "totalSupply",
      readonlyPrePurchaseContract,
      setTotalSupply
    );
    updateReadonlyProperty("PRICE", readonlyPrePurchaseContract, setPrice);
    // ! updateReadonlyProperty("PURCHASED", readonlyPrePurchaseContract, setMintedBalance);
  }, [isMinting]);

  // * Sold Out State
  useEffect(() => {
    if (!maxSupply || !totalSupply) return;
    setSoldOut(!(totalSupply < maxSupply));
  }, [maxSupply, totalSupply]);

  useEffect(() => {
    if (!presaleContract || !connectedAccount) return;
    let res;
    (async () => {
      try {
        res = await presaleContract.PURCHASED(connectedAccount);
        setMintedBalance(res)
      } catch (err) {
        console.error(err);
      }
    })();
  }, [presaleContract, connectedAccount]);

  const context: Web3ContextValues = {
    connected,
    setConnected,
    presaleContract,
    connectedAccount,
    maxPerWallet,
    maxSupply,
    totalSupply,
    soldOut,
    mintedBalance,
    isMinting,
    setIsMinting,
    setProvider,
    price,
    whitelistAuth,
    setWhitelistAuth
  };

  return <Web3Context.Provider value={context} {...props} />;
}