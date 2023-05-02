require('@nomicfoundation/hardhat-toolbox');

// Go to https://alchemy.com, sign up, create a new App in
// its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY = 'aw0D6iise9FGf6htp333';

// Replace this private key with your Sepolia account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY =
  '0x7036d977062a8a4534c8cdfda9005bfe47ba1c7cbab22290c3bf610b5bbbd5c2';
const GORELI_ETHERSCAN_KEY = 'KE44GSZK598SGKDCHQJHD26TU8NHFBT29T';
module.exports = {
  solidity: '0.8.9',
  defaultNetwork: 'goerli',
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/TDezl_W3Oyz-aw0D6iise9FGf6htp333`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      goerli: GORELI_ETHERSCAN_KEY,
    },
  },
};
