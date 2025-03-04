const { ethers } = require('ethers');

const nonceStore = new Map(); // ユーザーごとの nonce を保存

function generateNonce() {
  return `Verify your wallet ownership: ${Math.floor(Math.random() * 1000000)}`;
}

/*function saveNonce(userId, nonce) {
  nonceStore.set(userId, nonce);
}

function getNonce(userId) {
  return nonceStore.get(userId);
}*/

function saveNonce(userId, nonce) {
  console.log(`✅ nonce を保存: userId=${userId.toString()}, nonce=${nonce}`);
  nonceStore.set(userId.toString(), nonce);
}

function getNonce(userId) {
  console.log(`🔹 getNonce の呼び出し: userId=${userId.toString()}`);
  return nonceStore.get(userId.toString());
}


function verifySignature(walletAddress, signature, nonce) {
  try {
    const recoveredAddress = ethers.verifyMessage(nonce, signature);
    return recoveredAddress.toLowerCase() === walletAddress.toLowerCase();
  } catch (error) {
    console.error("署名検証エラー:", error);
    return false;
  }
}

module.exports = { generateNonce, saveNonce, getNonce, verifySignature };
