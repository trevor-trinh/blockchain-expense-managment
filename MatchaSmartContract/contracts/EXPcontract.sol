// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20FlashMint.sol";

/// @custom:security-contact derrick_cui@berkeley.edu
contract Expense is
    ERC20,
    ERC20Burnable,
    Pausable,
    Ownable,
    ERC20Permit,
    ERC20Votes,
    ERC20FlashMint
{
    constructor() ERC20("Expense", "EXP") ERC20Permit("Expense") {
        USDc = USDC(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48); //initailize USDC contract
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override whenNotPaused {
        super._beforeTokenTransfer(from, to, amount);
    }

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._mint(to, amount);
    }

    function _burn(
        address account,
        uint256 amount
    ) internal override(ERC20, ERC20Votes) {
        super._burn(account, amount);
    }

    //functionality so anyone can transfer USDC to contract
    USDC public USDc;

    //functionality that allows transfer of USDC to contract
    function fundUSDC(uint _amount) public {
        // amount should be > 0
        require(_amount > 0, "amount should be > 0");

        // transfer Dai to this contract for staking
        USDc.transferFrom(msg.sender, address(this), _amount);
    }

    //functionality that allows exchange of EXP for USDC
    function exchangeEXP(uint _amount) public {
        // amount should be > 0
        require(_amount > 0, "amount should be > 0");

        // transfer EXP to this contract for staking
        _transfer(msg.sender, address(this), _amount);

        require(
            USDc.balanceOf(address(this)) >= _amount,
            "Not enough USDC in contract"
        );

        // transfer USDC to this contract for staking
        USDc.transfer(msg.sender, _amount);
    }
}

interface USDC {
    function balanceOf(address account) external view returns (uint256);

    function allowance(
        address owner,
        address spender
    ) external view returns (uint256);

    function transfer(
        address recipient,
        uint256 amount
    ) external returns (bool);

    function approve(address spender, uint256 amount) external returns (bool);

    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);
}
