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

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '400px', 
      margin: '20px auto', 
      backgroundColor: '#f9f9f9', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.5rem', color: '#333' }}>
        Your stETH Balance
      </h3>
      <p style={{ fontSize: '1.2rem', color: '#8884d8', fontWeight: 'bold' }}>
        {balance} stETH
      </p>
    </div>
  );
}