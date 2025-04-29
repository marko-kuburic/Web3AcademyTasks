// src/constants.js
export const LIDO_ADDRESS = "0x3e3FE7dBc6B4C189E7128855dD526361c49b40Af";
export const STETH_ADDRESS = "0x3e3FE7dBc6B4C189E7128855dD526361c49b40Af";

export const LIDO_ABI = [
  "function submit(address _referral) payable returns (uint256)",
  "function getTotalPooledEther() view returns (uint256)"
];

export const IERC20_ABI = [
  "function balanceOf(address) view returns (uint256)"
];
