const hre = require('hardhat');

async function main() {
  // change as needed
  const usdcAddress = '0xa4cBc33Cc3d3f7e9338DB3950c8D37435A602607';

  const simpFactory = await hre.ethers.getContractFactory('SimpliSpend');
  const SimpliSpend = await simpFactory.deploy(usdcAddress);

  await SimpliSpend.deployed();

  console.log('Deployed EXPcontract: ', SimpliSpend.address);
  console.log(
    '\nTo Verify run:\n',
    `npx hardhat verify --network mumbai ${SimpliSpend.address} ${usdcAddress}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
