import { useState } from 'react';

export default function UnstakeInfo() {
  const [showUniswap, setShowUniswap] = useState(false);

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '400px', 
      margin: '20px auto', 
      backgroundColor: '#f9f9f9', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
    }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '1.5rem', color: '#333' }}>
        Unstaking (Simulated)
      </h3>
      <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.5', marginBottom: '15px' }}>
        Lido uses an ERC-721 “ withdrawal Request” NFT to queue your withdrawal on Sepolia.  
        While you wait, you can instantly swap your stETH back to SepoliaETH on the Uniswap Testnet:
      </p>
      <button
        onClick={() => setShowUniswap(true)}
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
          marginBottom: '15px'
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#7366b5')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#8884d8')}
      >
        Show Uniswap Testnet Swap
      </button>
      {showUniswap && (
        <iframe
          src="https://uniswap-testnet.sourcehat.io/#/swap?inputCurrency=0x3e3FE7dBc6B4C189E7128855dD526361c49b40Af&outputCurrency=ETH"
          width="100%"
          height="500px"
          style={{ border: '1px solid #ccc', borderRadius: '4px', marginBottom: '15px' }}
        />
      )}
      <p style={{ fontSize: '0.9rem', color: '#777', fontStyle: 'italic' }}>
        Note: Native on-chain withdrawals (Lido v2) are coming soon—stay tuned!
      </p>
    </div>
  );
}