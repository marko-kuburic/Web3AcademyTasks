import { useState } from 'react';

export function useRewardsSimulator() {
  const [initialStake, setInitialStake] = useState(''); // ETH amount
  const [timePeriod, setTimePeriod] = useState(''); // Days
  const [apy, setApy] = useState(4); // Default APY: 4%
  const [yieldResult, setYieldResult] = useState(null);

  const calculateYield = () => {
    // Validate inputs
    if (!initialStake || !timePeriod || !apy) {
      return { error: 'All fields are required' };
    }

    const stake = parseFloat(initialStake);
    const period = parseFloat(timePeriod);
    const rate = parseFloat(apy);

    if (isNaN(stake) || isNaN(period) || isNaN(rate)) {
      return { error: 'Please enter valid numbers' };
    }

    if (stake <= 0 || period <= 0 || rate < 0) {
      return { error: 'Stake, time period, and APY must be positive' };
    }

    const principal = stake; // Initial ETH (assumed 1:1 with stETH)
    const annualRate = rate / 100; // APY as decimal (e.g., 0.04)
    const timeInYears = period / 365; // Convert days to years

    // Continuous compounding: A = P * e^(r*t)
    const amount = principal * Math.exp(annualRate * timeInYears);
    const yieldEarned = amount - principal;

    return {
      totalStETH: amount.toFixed(6), // Total stETH after yield
      yieldEarned: yieldEarned.toFixed(6), // Yield earned in stETH
      error: null,
    };
  };

  const simulateRewards = () => {
    setYieldResult(calculateYield());
  };

  return {
    initialStake,
    setInitialStake,
    timePeriod,
    setTimePeriod,
    apy,
    setApy,
    yieldResult,
    simulateRewards,
  };
}