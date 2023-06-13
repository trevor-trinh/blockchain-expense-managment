# SimpliSpend 📚💰

Welcome to SimpliSpend, a revolutionary expense management solution tailored specifically for university clubs! SimpliSpend is a decentralized application (dApp) designed to streamline expense management with the power of blockchain. It enables students to submit and club authorities to approve or deny expenses—all on-chain. The cherry on top? If an expense is approved, the contract mints SIMP tokens to the student, which can then be swapped with USDC stored on the contract. Let's ease the financial management process for university clubs in a smart way!

## 🌟 Features

- **💸 Fronting Cash**: Students can make payments upfront and then submit their expenses for approval.
- **📝 Expense Submission**: A user-friendly interface to submit expense requests along with transaction details.
- **🔒 On-chain Storage**: Transaction details are stored on-chain, ensuring transparency and security.
- **👍 Approval Process**: University clubs have the authority to approve or deny expense requests.
- **🪙 SIMP Token Generation**: If an expense is approved, the contract mints SIMP tokens as a representation of the expense, which the student can then swap with USDC.

## 🎬 Demo 

We've prepared some demonstration videos to showcase the functionality of SimpliSpend. These videos provide an overview of how the system works and how it can be used effectively for expense management in university clubs.

### New Video Demo
[![SimpliSpend New Demo](https://github.com/trevor-trinh/blockchain-expense-managment/assets/50549133/79fa9b3e-fffe-415b-9302-5faf97529a18)

Click on the image above to see our latest demo of SimpliSpend, where we delve into the latest features and improvements.

### Old Video Demo
[![SimpliSpend Old Demo](https://github.com/trevor-trinh/blockchain-expense-managment/assets/50549133/826e722f-cce1-4e15-9eef-67d1e8b84603)

Click on the image above if you wish to view our older demonstration. It provides a comprehensive overview of the fundamental features of SimpliSpend.

## 🛠️ Tech Stack

- **Frontend**: Next.js, Tailwind, Wagmi.js (ether.js)
- **Backend**: MongoDB, Solidity

## 📜 Contract Addresses

- **SimpliSpend**: 0x972EFe5b625dcC26111C67dd575978f03212eB77 [View on Mumbai Polygonscan](https://mumbai.polygonscan.com/address/0x972EFe5b625dcC26111C67dd575978f03212eB77)
- **MockUSDC**: 0x731Aaada70FfB1C1679a4aaA5d73252605dF06Cd [View on Mumbai Polygonscan](https://mumbai.polygonscan.com/token/0x731Aaada70FfB1C1679a4aaA5d73252605dF06Cd)

## 🧰 Prerequisites

- Install Node.js and yarn
- Install Hardhat `npm install --save-dev hardhat`

## 🚀 Setup and Run

### Frontend 🖥️

#### 📥 Install Dependencies

```
yarn install
```

#### 🏃 Run the Project

```
yarn dev
```

### Backend ⚙️

#### 📥 Install Dependencies

```
npm install
```

#### 🌍 Environment Variables

Create a `.env` file in the root directory and provide the following:

```
MUMBAI_ETHERSCAN_KEY=your_etherscan_key
MUMBAI_URL=your_rpc_url
PRIVATE_KEY=your_private_key
```

#### 🚀 Deploy SimpliSpend and MockUSDC

```
npx hardhat run scripts/deployUSDC.js --network mumbai
npx hardhat run scripts/deploy.js --network mumbai
```

#### ✅ Verify SimpliSpend and MockUSDC

Replace `${SimpliSpend.address}` and `${mockUSDC.address}` with the actual contract addresses from the deployment output.

```
npx hardhat verify --network mumbai ${SimpliSpend.address} ${usdcAddress}
npx hardhat verify --network mumbai --contract contracts/MockUSDC.sol:MockUSDC ${mockUSDC.address}
```

## 🙌 Contribute

We welcome contributions to SimpliSpend! Feel free to fork the repo, make your changes, and then submit a pull request. If you find issues, please report them in the issues section of this repository.

## 📝 License

SimpliSpend is licensed under the MIT License. See [LICENSE](LICENSE) for more details.

Let's simplify expense management for university clubs together!
