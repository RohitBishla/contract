// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LoyaltyToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1_000_000 * (10**18); // 1 million tokens

    constructor() ERC20("LoyaltyToken", "LOYAL") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function mint(address account, uint256 amount) external onlyOwner {
        _mint(account, amount);
    }

    function burn(address account, uint256 amount) external onlyOwner {
        _burn(account, amount);
    }
}

contract LoyaltyProgram {
    LoyaltyToken public loyaltyToken;

    mapping(address => uint256) public userBalances;
    mapping(address => mapping(address => uint256)) public referrals;

    event TokensEarned(address indexed user, uint256 amount);
    event TokensTransferred(address indexed from, address indexed to, uint256 amount);

    constructor(address _loyaltyTokenAddress) {
        loyaltyToken = LoyaltyToken(_loyaltyTokenAddress);
    }

    function earnTokens(uint256 amount) external {
        userBalances[msg.sender] += amount;
        loyaltyToken.mint(msg.sender, amount);
        emit TokensEarned(msg.sender, amount);
    }

    function transferTokens(address to, uint256 amount) external {
        require(userBalances[msg.sender] >= amount, "Insufficient balance");
        
        userBalances[msg.sender] -= amount;
        userBalances[to] += amount;
        
        loyaltyToken.transferFrom(msg.sender, to, amount);
        emit TokensTransferred(msg.sender, to, amount);
    }

    function referUser(address referee, uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(referee != address(0) && referee != msg.sender, "Invalid referee address");

        referrals[referee][msg.sender] += amount;
        earnTokens(amount);
    }
}