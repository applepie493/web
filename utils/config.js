require('dotenv').config();

module.exports = {
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN,
  GUILD_ID: process.env.GUILD_ID,
  ROLE_ID: process.env.ROLE_ID,
  MONAD_RPC_URL: process.env.MONAD_RPC_URL,
  NFT_CONTRACT_ADDRESS: process.env.NFT_CONTRACT_ADDRESS,
};
