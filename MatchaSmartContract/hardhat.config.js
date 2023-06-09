require('@nomiclabs/hardhat-ethers');
require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const ALCHEMY_API_KEY = 'aw0D6iise9FGf6htp333';

const GOERLI_PRIVATE_KEY =
  '0x7036d977062a8a4534c8cdfda9005bfe47ba1c7cbab22290c3bf610b5bbbd5c2';
const GORELI_ETHERSCAN_KEY = 'KE44GSZK598SGKDCHQJHD26TU8NHFBT29T';

module.exports = {
  solidity: '0.8.9',
  defaultNetwork: 'mumbai',
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/TDezl_W3Oyz-aw0D6iise9FGf6htp333`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
    mumbai: {
      url: process.env.MUMBAI_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
    hardhat: {
      accounts: {
        accountsBalance: '10000000000000000000000', // 10,000 ETH
      },
    },
  },
  etherscan: {
    apiKey: process.env.MUMBAI_ETHERSCAN_KEY,
  },
};
