// const API_URL = process.env.API_URL;
// const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
// const web3 = createAlchemyWeb3(API_URL);

const API_KEY = 'TDezl_W3Oyz-aw0D6iise9FGf6htp333';
const PRIVATE_KEYOWNER = '0x7036d977062a8a4534c8cdfda9005bfe47ba1c7cbab22290c3bf610b5bbbd5c2';
const PRIVATE_KEYADDR1 = '0x326f6f4eb5e461f68fc1c0635821a2cf907bd30b7ac26549e344ff6f415f17c7';

const CONTRACT_ADDRESS_USDC = '0xaaE86dDeEf621B5b5079ADd2b54466659db13341';
const CONTRACT_ADDRESS_EXPENSE= '0xDf0360Ad8C5ccf25095Aa97ee5F2785c8d848620';


const contractExpense = require("../artifacts/contracts/Expense.sol/Expense.json");
const contractUSDC = require("../artifacts/contracts/mockUSDC.sol/MockUSDC.json");


// console.log(JSON.stringify(contractExpense.abi));

// interact.js
// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="goerli", API_KEY);

// Signer
const signerOwner = new ethers.Wallet(PRIVATE_KEYOWNER, alchemyProvider);
const signerAddr1 = new ethers.Wallet(PRIVATE_KEYADDR1, alchemyProvider);

// Contract
const expense = new ethers.Contract(CONTRACT_ADDRESS_EXPENSE, contractExpense.abi, signer);
const usdc = new ethers.Contract(CONTRACT_ADDRESS_USDC, contractUSDC.abi, signer);




async function main() {
  console.log("The message is: ");
}
main();


