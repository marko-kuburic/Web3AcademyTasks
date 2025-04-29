const { JsonRpcProvider, Contract } = require("ethers");

// Minimal ABI for getTotalPooledEther()
const LIDO_ABI = [
  "function getTotalPooledEther() view returns (uint256)"
];

class LidoService {
  /**
   * @param {string} rpcUrl - JSON-RPC endpoint
   * @param {string} lidoAddress - Sepolia Lido contract address
   */
  constructor(rpcUrl, lidoAddress) {
    this.provider = new JsonRpcProvider(rpcUrl);
    this.lido = new Contract(lidoAddress, LIDO_ABI, this.provider);
  }

  /**
   * Fetch total pooled ETH from Lido (in ETH units)
   */
  async getTotalStaked() {
    const totalWei = await this.lido.getTotalPooledEther();
    return parseFloat(totalWei.toString()) / 1e18;
  }
}

module.exports = LidoService;