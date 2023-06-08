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

  console.log('\nApproving SimpliSpend to transfer USDC from deployer...');
  const [deployer] = await ethers.getSigners();

  const USDC = await ethers.getContractAt('IERC20', usdcAddress);

  const approveTx = await USDC.connect(deployer).approve(
    SimpliSpend.address,
    ethers.constants.MaxUint256
  );
  await approveTx.wait();

  console.log('🥳 Approved SimpliSpend to transfer USDC from deployer');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
