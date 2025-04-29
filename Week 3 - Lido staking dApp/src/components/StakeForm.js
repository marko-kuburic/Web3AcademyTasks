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
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto', backgroundColor: '#f9f9f9', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '1.5rem', color: '#333' }}>Stake ETH</h3>
      <form onSubmit={handleStake}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '1rem', color: '#555' }}>
            Amount to Stake (ETH)
          </label>
          <input
            type="number"
            step="0.00001"
            placeholder="e.g., 0.1"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            style={{
                width: '100%',
                padding: '10px',
                fontSize: '1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
            onFocus={(e) => (e.target.style.borderColor = '#8884d8')}
            onBlur={(e) => (e.target.style.borderColor = '#ccc')}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#8884d8',
            color: 'white',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#7366b5')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#8884d8')}
        >
          Stake ETH
        </button>
      </form>
    </div>
  );
}