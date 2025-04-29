// src/components/UnstakeInfo.js
import { useState } from 'react';

export default function UnstakeInfo() {
  const [showUniswap, setShowUniswap] = useState(false);
  return (
    <div>
      <h3>Unstaking (Simulated)</h3>
      <p>
        Lido uses an ERC-721 “Withdrawal Request” NFT to queue your withdrawal on Sepolia.  
        While you wait, you can instantly swap your stETH back to SepoliaETH on the Uniswap Testnet:
      </p>
      <button onClick={() => setShowUniswap(true)}>
        Show Uniswap Testnet Swap
      </button>
      {showUniswap && (
        <iframe
          src="https://uniswap-testnet.sourcehat.io/#/swap?inputCurrency=0x3e3FE7dBc6B4C189E7128855dD526361c49b40Af&outputCurrency=ETH"
          width="100%"
          height="500px"
          style={{ border: 0, marginTop: '1rem' }}
        />
      )}
      <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>
        Note: Native on-chain withdrawals (Lido v2) are coming soon—stay tuned!
      </p>
    </div>
  );
}
