import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import isClient from "@utils/isClient";
import config from "config.json"

const providerOptions = {
  /* See Provider Options Section */
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "34fbd7dbc3fa4d2cb3afbb1fb7f73197",
    },
  },
};

export default isClient? new Web3Modal({
  network: config.network, // optional
  cacheProvider: true, // optional
  providerOptions // required
}) : null;

// ! CORS ERROR?

// const instance = await web3Modal.connect();

// const provider = new ethers.providers.Web3Provider(instance);
// const signer = provider.getSigner();