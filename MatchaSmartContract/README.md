SimpliSpend: https://mumbai.polygonscan.com/address/0xB35E3b02a577a481A46c9Ac93F2f1F301Cfd01Fd

MockUSDC: https://mumbai.polygonscan.com/token/0xa4cbc33cc3d3f7e9338db3950c8d37435a602607

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
