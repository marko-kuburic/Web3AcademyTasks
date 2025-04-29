// src/App.js
import { useWeb3 } from "./hooks/useWeb3";
import StakeForm     from "./components/StakeForm";
import Balance       from "./components/BalanceDisplay";
import UnstakeInfo   from "./components/UnstakeSimulation";

function App() {
  const { provider, signer, address, connect } = useWeb3();

  return (
    <div style={{ padding: 20 }}>
      {!address
        ? <button onClick={connect}>Connect MetaMask</button>
        : <>
            <p>Connected: {address}</p>
            <StakeForm signer={signer} address={address} />
            <Balance provider={provider} address={address} />
            <UnstakeInfo />
          </>
      }
    </div>
  );
}

export default App;
