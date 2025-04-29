import { useEffect, useState } from "react";
import { Contract, formatEther } from "ethers";
import { STETH_ADDRESS, IERC20_ABI } from "../constants";

export default function Balance({ provider, address }) {
  const [balance, setBalance] = useState("0.0");

  useEffect(() => {
    if (!provider || !address) return;

    const token = new Contract(STETH_ADDRESS, IERC20_ABI, provider);

    async function fetchBalance() {
        const bal = await token.balanceOf(address);
        setBalance(formatEther(bal));
    }

    fetchBalance();
    const interval = setInterval(fetchBalance, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [provider, address]);

  return <p>Your stETH Balance: {balance} stETH</p>;
}
