const hre = require('hardhat');

async function main() {
  const MockUSDC = await hre.ethers.getContractFactory('MockUSDC');
  const mockUSDC = await MockUSDC.deploy();

  await mockUSDC.deployed();

  console.log('MockUSDC deployed to:', mockUSDC.address);
  console.log(
    '\nTo Verify run:\n',
    `npx hardhat verify --network mumbai --contract contracts/MockUSDC.sol:MockUSDC ${mockUSDC.address}
  `
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
