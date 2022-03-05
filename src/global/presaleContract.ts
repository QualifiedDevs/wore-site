import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import type { Atom } from "jotai";
import { atom, useAtom } from "jotai";

import defaultProvider from "@utils/defaultProvider";

import abi from "@src/artifacts/privateSaleContract/abi.json";
import metadata from "@src/artifacts/privateSaleContract/metadata.json";

import formatRes from "@utils/formatRes";

import { useWeb3, providerAtom, signerAtom } from "@src/global/web3";

export const contractAtom = atom(
  new ethers.Contract(metadata.address, abi, defaultProvider)
);

const updateContractProviderAtom = atom(
  (get) => get(contractAtom),
  (get, set) => {
    set(contractAtom, (prev) =>
      prev.connect(get(signerAtom) || get(providerAtom))
    );
  }
);

export const isMintingAtom = atom(false);

interface AsyncAtomResult {
  data: any;
  err: any;
  loading: boolean;
}

function asyncAtom() {
  const res: AsyncAtomResult = { data: null, err: null, loading: false };
  return atom(res);
}

interface FetchPropertyArgs {
  property: string;
  contract: any;
  args?: any;
}

interface ReadonlyPropertyAtomArgs {
  property: string;
  contractAtom: any;
  args?: any;
}

async function fetchReadonlyProperty({
  property,
  contract,
  args,
}: FetchPropertyArgs) {
  const [data, err] = await formatRes(contract[property](args));
  if (err) throw err;
  return data;
}

function readonlyPropertyAtom(args: ReadonlyPropertyAtomArgs) {
  const resultAtom = asyncAtom();
  const runFetchPropertyAtom = atom(resultAtom, (get, set) => {
    async function fetchData() {
      set(resultAtom, (prev) => ({ ...prev, loading: true }));
      const [data, err] = await formatRes(
        fetchReadonlyProperty({
          ...args,
          contract: get(contractAtom),
        })
      );
      if (err) {
        set(resultAtom, { data: null, err, loading: false });
        console.error(`Failed to fetch property ${args.property}`);
      }
      set(resultAtom, { data, err: null, loading: false });
    }
    fetchData();
  });
  return [resultAtom, runFetchPropertyAtom];
}

function fetchAtomHook(
  resultAtom: Atom<AsyncAtomResult> & any,
  runFetchUpdateAtom: Atom<AsyncAtomResult> & any
) {
  return function () {
    const [get, set]: [() => AsyncAtomResult, (res: AsyncAtomResult) => void] =
      useAtom(resultAtom);
    const [, update]: [() => AsyncAtomResult, () => void] =
      useAtom(runFetchUpdateAtom);
    return [get, set, update];
  };
}

function fetchReadonlyPropertyHook(args: ReadonlyPropertyAtomArgs) {
  const [resultAtom, runFetchPropertyAtom] = readonlyPropertyAtom(args);
  return fetchAtomHook(resultAtom, runFetchPropertyAtom);
}

export const useMaxSupply = fetchReadonlyPropertyHook({
  property: "MAX_SUPPLY",
  contractAtom,
});
export const useTotalSupply = fetchReadonlyPropertyHook({
  property: "totalSupply",
  contractAtom,
});
export const usePrice = fetchReadonlyPropertyHook({
  property: "PRICE",
  contractAtom,
});
export const useMaxPurchaseAmount = fetchReadonlyPropertyHook({
  property: "MAX_PURCHASE",
  contractAtom,
});
export const useAmountPurchased = fetchReadonlyPropertyHook({
  property: "PURCHASED",
  contractAtom,
});

export default function initPresaleContract() {
  const { provider, signer } = useWeb3();

  const [, updateContractProvider] = useAtom(updateContractProviderAtom);
  const [, , updateMaxSupply] = useMaxSupply();
  const [, , updateTotalSupply] = useTotalSupply();
  const [, , updatePrice] = usePrice();
  const [, , updateMaxPurchaseAmount] = useMaxPurchaseAmount();
  const [, , updateAmountPurchased] = useAmountPurchased();

  const [isMinting] = useAtom(isMintingAtom);

  useEffect(() => {
    if (!provider) return;
    updateContractProvider();
  }, [provider, signer]);

  useEffect(() => {
    //@ts-ignore
    updateTotalSupply();
    //@ts-ignore
    updateMaxSupply();
    //@ts-ignore
    updatePrice();
    //@ts-ignore
    updateMaxPurchaseAmount();
    //@ts-ignore
    updateAmountPurchased();
  }, [isMinting]);
}
