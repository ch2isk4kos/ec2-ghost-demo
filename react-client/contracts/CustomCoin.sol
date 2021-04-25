//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// CUSTOM CRYPTO COIN

contract CustomCoin is ERC20 {
  // constructor() ERC20("Chris Kakos Custom Coin", "CSTCN") {
  constructor(string memory name, string memory symbol) ERC20(name, symbol) {
    _mint(msg.sender, 10000 * (10 ** 18));
  }
}
