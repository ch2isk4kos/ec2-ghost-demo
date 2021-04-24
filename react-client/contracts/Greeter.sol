//SPDX-License-Identifier: Unlicense
// pragma solidity ^0.7.0;
pragma solidity ^0.8.3; // version set in hardhat.configire.js

import "hardhat/console.sol";

contract Greeter {
  string greeting;

  constructor(string memory _greeting) {
    console.log("Deploying a Greeter with greeting:", _greeting);
    greeting = _greeting;
  }

  // keywords:
  // public --> makes function readable from outside of contract - React client
  // view   --> read only from blockchain; no write
  function greet() public view returns (string memory) {
    return greeting;
  }

  function setGreeting(string memory _greeting) public {
    console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
    greeting = _greeting;
  }
}
