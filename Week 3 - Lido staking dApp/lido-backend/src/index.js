require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/apy', async (req, res) => {
  const GRAPH_URL = process.env.GRAPH_URL;
  const { query } = req.body;

  if (!GRAPH_URL) {
    return res.status(500).json({ error: 'GraphQL endpoint not configured' });
  }

  if (!query) {
    return res.status(400).json({ error: 'Missing GraphQL query' });
  }

  try {
    const response = await axios.post(
      GRAPH_URL,
      { query },
      { headers: { 'Content-Type': 'application/json' } }
    );
    if (response.data.errors) {
      console.error('GraphQL errors:', response.data.errors);
      return res.status(500).json({ error: 'GraphQL query failed', details: response.data.errors });
    }
    res.json(response.data);
  } catch (error) {
    console.error('GraphQL proxy error:', error.message);
    res.status(500).json({ error: 'Failed to fetch from subgraph', details: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});