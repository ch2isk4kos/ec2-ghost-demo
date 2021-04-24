require("@nomiclabs/hardhat-waffle");

const METAMASK_ACCOUNT_KEY = process.env.METAMASK_ACCOUNT_KEY;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

// Where the project configuration lives:
module.exports = {
  // solidity: "0.7.3",
  solidity: "0.8.3",
  paths: {
    artifacts: "./src/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/04236aabc8c844f5a93b71b2fece2dba",
      accounts: [`0x${METAMASK_ACCOUNT_KEY}`],
    },
  },
};
