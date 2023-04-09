const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Expense", function () {

  async function deployContract() {
    const [owner, addr1] = await ethers.getSigners();

    //deploye MockUSDC
    const MockUSDC = await ethers.getContractFactory("MockUSDC");
    const mockUSDC = await MockUSDC.deploy();

    //deploye Expense
    const Expense = await ethers.getContractFactory("Expense");
    const hardhatExpense = await Expense.deploy(mockUSDC.address);//CHANGE THIS WHEN YOU DEPLOY TO MAINNET, NEED TO ADD ADDRESS OF USDC

    // Mint some MockUSDC for testing purposes
    await mockUSDC.mint(addr1.address, ethers.utils.parseUnits("100000", 6));
    await hardhatExpense.mint(owner.address, ethers.utils.parseUnits("1000", 18));

    return { hardhatExpense, owner, addr1, mockUSDC };
  }

  describe("testing", function () {
    //check ownership
    it("owner is correct", async function () {
      const { hardhatExpense, owner, addr1 } = await loadFixture(deployContract);
      expect(await hardhatExpense.owner()).to.equal(owner.address);
    });

    //test that owner can mint tokens 
    it("owner mint tokens", async function () {
      const { hardhatExpense, owner, addr1, mockUSDC} = await loadFixture(deployContract);

      await hardhatExpense.mint(owner.address, 100000); // Removed assignment to ownerBalance variable
      const ownerBalance = await hardhatExpense.balanceOf(owner.address); // Use balanceOf function to get the balance
      expect(await hardhatExpense.totalSupply()).to.equal(ownerBalance);
    });
    // owner mint and give them to a differnet user
    it("mint tokens to addr1", async function () {
      const { hardhatExpense, owner, addr1, mockUSDC} = await loadFixture(deployContract);

      await hardhatExpense.mint(addr1.address, ethers.utils.parseUnits("100000", 18));
      const addr1Balance = await hardhatExpense.balanceOf(addr1.address); // Use balanceOf function to get the balance
      expect(addr1Balance).to.equal(ethers.utils.parseUnits("100000", 18));
    });

    //owner can put USDC into the contract
    it("User can put USDC inside the contract and owner can swap EXP for USDC", async function () {
      const { hardhatExpense, owner, addr1, mockUSDC} = await loadFixture(deployContract);
    // Transfer USDC tokens from addr1 to Expense contract
      await mockUSDC.connect(addr1).approve(hardhatExpense.address, ethers.utils.parseUnits("50000", 6));
      await hardhatExpense.connect(addr1).fundUSDC(ethers.utils.parseUnits("50000", 6));

      // Verify USDC balance inside the Expense contract
      console.log(await mockUSDC.balanceOf(hardhatExpense.address));
      console.log(ethers.utils.parseUnits("50000", 6));
      expect(await mockUSDC.balanceOf(hardhatExpense.address)).to.equal(ethers.utils.parseUnits("50000", 6));

      console.log(await hardhatExpense.balanceOf(owner.address));
      // Swap EXP tokens for USDC tokens using owner
      await hardhatExpense.connect(owner).approve(hardhatExpense.address, ethers.utils.parseUnits("50000", 6));
      await hardhatExpense.connect(owner).exchangeEXP(ethers.utils.parseUnits("50000", 6));

      // Verify the balance change of USDC and EXP tokens for owner
      expect(await mockUSDC.balanceOf(owner.address)).to.equal(ethers.utils.parseUnits("50000", 6));
      // expect(await hardhatExpense.balanceOf(owner.address)).to.equal(ethers.utils.parseUnits("99000"));
  });

  });


});