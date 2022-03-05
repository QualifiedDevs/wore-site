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
  const [data, err] = await formatRes(
    args !== undefined ? contract[property](args) : contract[property]()
  );
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
        console.error(`Failed to fetch property ${args.property}`, err);
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

const amountPurchasedResultAtom = asyncAtom();
const runFetchAmountPurchasedResultAtom = atom(
  amountPurchasedResultAtom,
  (get, set) => {
    const signer = get(signerAtom);
    if (!signer) {
      set(amountPurchasedResultAtom, { data: null, err: null, loading: false });
      return;
    }

    async function fetchData() {
      set(amountPurchasedResultAtom, (prev) => ({ ...prev, loading: true }));

      const [addressData, addressErr] = await formatRes(signer.getAddress());
      if (addressErr) {
        console.error("Failed to fetch property PURCHASED", addressData);
        set(amountPurchasedResultAtom, {
          data: null,
          err: addressErr,
          loading: false,
        });
        return;
      }

      const [data, err] = await formatRes(
        fetchReadonlyProperty({
          property: "PURCHASED",
          contract: get(contractAtom),
          args: addressData,
        })
      );
      if (err) {
        set(amountPurchasedResultAtom, { data: null, err, loading: false });
        console.error(`Failed to fetch property PURCHASED`, err);
      }
      set(amountPurchasedResultAtom, { data, err: null, loading: false });
    }
    fetchData();
  }
);

export const useAmountPurchased = fetchAtomHook(
  amountPurchasedResultAtom,
  runFetchAmountPurchasedResultAtom
);

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
  }, [isMinting]);

  useEffect(() => {
    //@ts-ignore
    updateAmountPurchased();
  }, [signer, isMinting]);
}
