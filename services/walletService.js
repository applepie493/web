const { ethers } = require('ethers');
const { MONAD_RPC_URL, NFT_CONTRACT_ADDRESS } = require('../utils/config');

const provider = new ethers.JsonRpcProvider(MONAD_RPC_URL);
const nftABI = [
  "function balanceOf(address owner) view returns (uint256)"
];

async function verifyWalletOwnership(walletAddress) {
  try {
    const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, nftABI, provider);
    const balance = await contract.balanceOf(walletAddress);
    return balance > 0;
  } catch (error) {
    console.error('NFT確認エラー:', error);
    return false;
  }
}

module.exports = { verifyWalletOwnership };
