//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

// BASIC SMART CONTRACT MODEL

contract Token {
  string public name = "ETH Token Demo";    // token name
  string public symbol = "CKU";             // token symbol
  uint public totalSupply = 1000000;        // token amount
  address public owner;                     
  mapping(address => uint) balances;        // const balances = {addresses: uint}

  constructor() {
    balances[msg.sender] = totalSupply;     // set balance of user who deployed the contract instance
    owner = msg.sender;                     // set user as value of owner property 
    // also: msg.value
  }

    // transfers a number of tokens to an address
  function transfer(address to, uint amount) external {
    require(balances[msg.sender] >= amount, "Not enough tokens"); // check to see if owner has enough tokens to send
    balances[msg.sender] -= amount; // subtract the amount sent from sender account
    balances[to] += amount; // send the amount to the address from the parameters  
  }

  function balanceOf(address account) external view returns (uint) {
    return balances[account];   // returns balance of account address
  }
}

// From Terminal:
// C:/User/repo/react-client/ > npx hardhat compile