const { expect } = require("chai");

describe("EXPcontract", function () {
  it("Deployment + mint tokens to owner, check its equal", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");

    const hardhatToken = await Token.deploy();

    const ownerBalance = await hardhatToken.mint(owner.address, 100000);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });

  //test that owner can mint tokens and give them to a differnet user

  //owner can put USDC into the contract

  //different user can exchange EXP for USDC


});