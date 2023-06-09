const hre = require('hardhat');

async function main() {
  // change as needed
  const usdcAddress = '0x731Aaada70FfB1C1679a4aaA5d73252605dF06Cd';

  const simpFactory = await hre.ethers.getContractFactory('SimpliSpend');
  const SimpliSpend = await simpFactory.deploy(usdcAddress);

  await SimpliSpend.deployed();

  console.log('🥳 Deployed SimpliSpend Contract: ', SimpliSpend.address);
  console.log(
    '[❗] To Verify run:\n',
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

  console.log('🥳 Approved!');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
