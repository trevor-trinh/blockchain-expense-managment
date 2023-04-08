const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("EXPcontract", function () {

  async function deployContract() {
    const [owner, addr1] = await ethers.getSigners();

    const Expense = await ethers.getContractFactory("EXPcontract");
    const hardhatExpense = await Expense.deploy();

    return { hardhatExpense, owner, addr1 };
  }

  describe("testing", function () {
    //check ownership
    it("Should set the right owner", async function () {
      const { hardhatExpense, owner, addr1 } = await loadFixture(deployContract);

      expect(await hardhatExpense.owner()).to.equal(owner.address);
    });

    //test that owner can mint tokens 
    it("Should set the right unlockTime", async function () {
      const { hardhatExpense, owner, addr1 } = await loadFixture(deployContract);

      const ownerBalance = await hardhatExpense.mint(owner.address, 100000);
      expect(await hardhatExpense.totalSupply()).to.equal(ownerBalance);
    });
    // owner mint and give them to a differnet user
    it("mint tokens to other person", async function () {
      const { hardhatExpense, owner, addr1 } = await loadFixture(deployContract);

      const addr1Balance = await hardhatExpense.mint(addr1.address, 100000);
      expect(await hardhatExpense.totalSupply()).to.equal(addr1Balance);
    });

    //owner can put USDC into the contract
    it("owner can put USDC into the contract", async function () {
      const { hardhatExpense, owner, addr1 } = await loadFixture(deployContract);

      const ownerBalance = await hardhatExpense.mint(owner.address, 100000);
      expect(await hardhatExpense.totalSupply()).to.equal(ownerBalance);
    });

    
  });

  // describe ("Deployment", function () {

  // it("Deployment + mint tokens to owner, check its equal", function () {
  //   const hardhatExpense = await Token.deploy();

  //   const ownerBalance = await hardhatToken.mint(owner.address, 100000);
  //   expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  // });

  // it("test send tokens to secondary address", async function () {
  //   const [owner] = await ethers.getSigners();

  //   const Token = await ethers.getContractFactory("Token");

  //   const hardhatToken = await Token.deploy();

  //   const ownerBalance = await hardhatToken.mint(owner.address, 100000);
  //   expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  // });

  // });

  //test that owner can mint tokens and give them to a differnet user



  //owner can put USDC into the contract

  //different user can exchange EXP for USDC


});