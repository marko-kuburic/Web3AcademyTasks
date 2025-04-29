import { useState } from "react";
import Web3Modal from "web3modal";
import { BrowserProvider, JsonRpcProvider } from "ethers";

export function useWeb3() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);

  async function connect() {
    const modal = new Web3Modal();
    const externalProvider = await modal.connect();
    const prov = new BrowserProvider(externalProvider);
    const sign = await prov.getSigner();
    const addr = await sign.getAddress();
    setProvider(prov);
    setSigner(sign);
    setAddress(addr);
  }

  return { provider, signer, address, connect };
}
