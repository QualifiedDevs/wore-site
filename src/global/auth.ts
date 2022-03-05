import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { atom, useAtom } from "jotai";
import { signerAtom } from "@global/web3";
import formatRes from "@utils/formatRes";
import fetchAuth from "@utils/getPurchaseAuth";

interface AsyncAtomResult {
  data: any;
  err: any;
  loading: boolean;
}

function asyncAtom() {
  const res: AsyncAtomResult = { data: null, err: null, loading: false };
  return atom(res);
}

export const whitelistAuthResult = asyncAtom();
export const runFetchWhitelistAuth = atom(asyncAtom, (get, set) => {
  const accessToken = get(accessTokenAtom).data;

  const signer = get(signerAtom);
  if (!signer) {
    set(whitelistAuthResult, { data: null, err: null, loading: false });
    return;
  }

  async function fetchData() {
    set(whitelistAuthResult, (prev) => ({ ...prev, loading: true }));

    const [addressData, addressErr] = await formatRes(signer.getAddress());
    if (addressErr) {
      console.error(addressData);
      set(whitelistAuthResult, {
        data: null,
        err: addressErr,
        loading: false,
      });
      return;
    }

    console.log("ADDRESS DATA", addressData);

    const [data, err] = await formatRes(fetchAuth(addressData, accessToken));
    if (err) {
      set(whitelistAuthResult, { data: null, err, loading: false });
      console.error(`Cannot fetch authorization`, err);
      return;
    }
    set(whitelistAuthResult, { data, err: null, loading: false });
  }
  fetchData();
});

const accessTokenAtom = asyncAtom();

export const useWhitelistAuth = () => {
  const [get, set] = useAtom(whitelistAuthResult);
  const [, update] = useAtom(runFetchWhitelistAuth);
  return [get, set, update];
};

export const initWhitelistAuth = () => {
  const { query, isReady } = useRouter();
  const [signer] = useAtom(signerAtom);
  const [, setAccessTokenResult] = useAtom(accessTokenAtom);

  const [, , updateWhitelistAuth] = useWhitelistAuth();

  useEffect(() => {
    if (!isReady) return;
    const access = query.access;
    setAccessTokenResult({ data: access, err: null, loading: false });
    //@ts-ignore
    updateWhitelistAuth();
  }, [isReady, signer]);
};
