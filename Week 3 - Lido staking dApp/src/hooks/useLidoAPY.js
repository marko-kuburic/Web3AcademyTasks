import { useState, useEffect } from 'react';

const QUERY = `
  {
    protocolMetrics(
      first: 100,
      orderBy: timestamp,
      orderDirection: desc
    ) {
      timestamp
      apr
    }
  }
`;

export function useLidoAPY() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAPY() {
      try {
        const res = await fetch('/api/apy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: QUERY }),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        if (json.errors) {
          throw new Error(json.errors[0].message);
        }
        setData(json.data?.protocolMetrics || []);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch APY data:', err);
        setError('Failed to load APY data. Please try again later.');
      }
    }
    fetchAPY();
  }, []);

  return { data, error };
}