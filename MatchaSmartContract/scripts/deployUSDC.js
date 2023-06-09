const hre = require('hardhat');

async function main() {
  const MockUSDC = await hre.ethers.getContractFactory('MockUSDC');
  const mockUSDC = await MockUSDC.deploy();

  await mockUSDC.deployed();

  console.log('🥳 MockUSDC deployed to:', mockUSDC.address);
  console.log(
    '[❗] To Verify run:\n',
    `npx hardhat verify --network mumbai --contract contracts/MockUSDC.sol:MockUSDC ${mockUSDC.address}
  `
  );
  console.log(
    '\n[❗] Remember to replace the MockUSDC address in scripts/deploy.js! Replace with: ',
    mockUSDC.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
