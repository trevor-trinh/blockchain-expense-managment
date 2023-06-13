// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol';

contract SimpliSpend is ERC20, ERC20Burnable, Ownable {
    using SafeERC20 for IERC20;

    IERC20 public usdc;
    uint256 public totalExpensed;

    enum TransactionStatus {
        Pending,
        Approved,
        Denied
    }

    struct Transaction {
        string detailsHash;
        uint256 cost;
        TransactionStatus status;
        address user;
    }

    Transaction[] public transactions;

    constructor(address usdcAddress) ERC20('SimpliSpend', 'SIMP') {
        usdc = IERC20(usdcAddress);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function fundUSDC(uint256 _amount) external {
        require(_amount > 0, 'deposit amount should be > 0');
        SafeERC20.safeTransferFrom(usdc, msg.sender, address(this), _amount);
    }

    function getTransactionsCount() public view returns (uint256) {
        return transactions.length;
    }

    function logTransaction(string memory _detailsHash, uint256 _cost) public {
        transactions.push(
            Transaction({
                detailsHash: _detailsHash,
                cost: _cost,
                status: TransactionStatus.Pending,
                user: msg.sender
            })
        );
    }

    function approveTransaction(uint256 _transactionId) public onlyOwner {
        Transaction storage transaction = transactions[_transactionId];
        require(
            transaction.status == TransactionStatus.Pending,
            'Transaction is not Pending'
        );

        transaction.status = TransactionStatus.Approved;
        _mint(transaction.user, transaction.cost);
    }

    function denyTransaction(uint256 _transactionId) public onlyOwner {
        Transaction storage transaction = transactions[_transactionId];
        require(
            transaction.status == TransactionStatus.Pending,
            'Transaction is not Pending'
        );

        transaction.status = TransactionStatus.Denied;
    }

    function exchangeSIMP(uint256 _amount) public {
        require(_amount > 0, 'exchange amount should be > 0');
        require(
            usdc.balanceOf(address(this)) >= _amount,
            'Not enough USDC in contract'
        );

        // transfer usdc from contract to user
        SafeERC20.safeTransfer(usdc, msg.sender, _amount);

        // burn EXP from user
        _transfer(msg.sender, address(this), _amount);
        _burn(address(this), _amount);

        totalExpensed += _amount; // Increase totalExpensed by the amount expensed
    }

    // The following functions are overrides required by Solidity.
    function _mint(address to, uint256 amount) internal override(ERC20) {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount) internal override(ERC20) {
        super._burn(account, amount);
    }
}
