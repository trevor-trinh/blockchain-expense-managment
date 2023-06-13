SimpliSpend:

```
Address:0x972EFe5b625dcC26111C67dd575978f03212eB77
https://mumbai.polygonscan.com/address/0x972EFe5b625dcC26111C67dd575978f03212eB77
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
