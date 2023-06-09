SimpliSpend:

```
Address:0x53bCF3D773aA483d9E49135e8ac8777EfEb4818C
https://mumbai.polygonscan.com/address/0x53bCF3D773aA483d9E49135e8ac8777EfEb4818C
```

MockUSDC:

```
Address: 0x731Aaada70FfB1C1679a4aaA5d73252605dF06Cd
https://mumbai.polygonscan.com/token/0x731Aaada70FfB1C1679a4aaA5d73252605dF06Cd
```

deploy mockusdc

```
npx hardhat run scripts/deployUSDC.js --network mumbai
```

deploy contract

```
npx hardhat run scripts/deploy.js --network mumbai
```

verify SimpliSpend and MockUSDC

```
npx hardhat verify --network mumbai ${SimpliSpend.address} ${usdcAddress}
```

```
npx hardhat verify --network mumbai --contract contracts/MockUSDC.sol:MockUSDC ${mockUSDC.address}
```

.env file

```
MUMBAI_ETHERSCAN_KEY=
MUMBAI_URL=
PRIVATE_KEY=
```
