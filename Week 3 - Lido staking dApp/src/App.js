import { useWeb3 } from "./hooks/useWeb3";
import StakeForm from "./components/StakeForm";
import Balance from "./components/BalanceDisplay";
import UnstakeInfo from "./components/UnstakeSimulation";
import APYChart from './components/APYChart';
import ClaimRewardsSimulator from './components/ClaimRewardsSimulator';

function App() {
  const { provider, signer, address, connect } = useWeb3();

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f0f2f5',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <h1 style={{
        fontSize: '2rem',
        color: '#333',
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        Lido Staking dApp
      </h1>
      {!address ? (
        <button
          onClick={connect}
          style={{
            padding: '12px 24px',
            backgroundColor: '#8884d8',
            color: 'white',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#7366b5')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#8884d8')}
        >
          Connect MetaMask
        </button>
      ) : (
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <p style={{
            fontSize: '1rem',
            color: '#555',
            marginBottom: '20px',
            wordBreak: 'break-all',
            textAlign: 'center'
          }}>
            Connected: {address}
          </p>
          <StakeForm signer={signer} address={address} />
          <Balance provider={provider} address={address} />
          <ClaimRewardsSimulator />
          <UnstakeInfo />
          <APYChart />
        </div>
      )}
    </div>
  );
}

export default App;