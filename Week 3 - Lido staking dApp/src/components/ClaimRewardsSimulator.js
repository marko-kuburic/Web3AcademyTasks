import React from 'react';
import { useRewardsSimulator } from '../hooks/useRewardsSimulator';

export default function ClaimRewardsSimulator() {
  const {
    initialStake,
    setInitialStake,
    timePeriod,
    setTimePeriod,
    apy,
    setApy,
    yieldResult,
    simulateRewards,
  } = useRewardsSimulator();

  const handleSubmit = (e) => {
    e.preventDefault();
    simulateRewards();
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '400px', 
      margin: '0 auto', 
      backgroundColor: '#f9f9f9', 
      borderRadius: '8px', 
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' 
    }}>
      <h3 style={{ margin: '0 0 15px 0', fontSize: '1.5rem', color: '#333', textAlign: 'center' }}>
        Claim Rewards Simulator
      </h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '1rem', color: '#555' }}>
            Initial Stake (ETH)
          </label>
          <input
            type="number"
            step="0.01"
            value={initialStake}
            onChange={(e) => setInitialStake(e.target.value)}
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
            placeholder="e.g., 1.0"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '1rem', color: '#555' }}>
            Time Period (Days)
          </label>
          <input
            type="number"
            value={timePeriod}
            onChange={(e) => setTimePeriod(e.target.value)}
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
            placeholder="e.g., 365"
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '1rem', color: '#555' }}>
            APY (%)
          </label>
          <input
            type="number"
            step="0.1"
            value={apy}
            onChange={(e) => setApy(e.target.value)}
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
            placeholder="e.g., 4.0"
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
          Calculate Yield
        </button>
      </form>
      {yieldResult && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          {yieldResult.error ? (
            <p style={{ color: 'red', fontSize: '1rem' }}>
              {yieldResult.error}
            </p>
          ) : (
            <>
              <p style={{ fontSize: '1rem', color: '#555' }}>
                <strong>Total stETH:</strong> {yieldResult.totalStETH} stETH
              </p>
              <p style={{ fontSize: '1rem', color: '#555' }}>
                <strong>Yield Earned:</strong> {yieldResult.yieldEarned} stETH
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}