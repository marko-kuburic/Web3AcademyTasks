import { useState } from "react";
import { Contract, parseEther, ZeroAddress } from "ethers";
import { LIDO_ADDRESS, LIDO_ABI } from "../constants";

export default function StakeForm({ signer, address }) {
  const [amount, setAmount] = useState("");

  async function handleStake(e) {
    e.preventDefault();
    const contract = new Contract(LIDO_ADDRESS, LIDO_ABI, signer);
    const tx = await contract.submit(
      ZeroAddress,
      { value: parseEther(amount) }
    );
    await tx.wait();
    await fetch('http://localhost:3001/api/log-stake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: address, amount })
      });
      
    alert("Staked!");
  }

  return (
    <form onSubmit={handleStake}>
      <input
        type="number"
        step="0.00001"
        placeholder="ETH to stake"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">Stake ETH</button>
    </form>
  );
}
