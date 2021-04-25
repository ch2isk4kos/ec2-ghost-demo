import React, { useState, useEffect } from "react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import Token from "./artifacts/contracts/Token.sol/Token.json";
import { ethers } from "ethers";
import "./styles/App.css";

// store contract address in a varibale where Greeter deployed to:
const greeterAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";
const tokenAddress = "0x0c2E4a06b76B262273E7f9290586C9cc894F75D7";

const App = () => {
  // greeting
  const [greeting, setGreeting] = useState("");
  const [content, setContent] = useState("");

  // token
  const [userAccount, setUserAccount] = useState("");
  const [userBalance, setUserBalance] = useState("");
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetchGreeting();
  }, []);

  const fetchGreeting = async () => {
    if (typeof window.ethereum !== "undefined") {
      // Web Provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Greeter Contract instance
      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );

      try {
        const d = await contract.greet();
        console.log("greeting content: ", d);
        setContent(d);
      } catch (err) {
        console.log("error: ", err);
      }
    }
  };

  const requestAccount = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" }); // prompts user to connect MetaMask account
  };

  const getUserBalance = async () => {
    if (typeof window.ethereum !== "undefined") {
      // returns an array of account
      const [account] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.Web3Provider(window.ethereum); // create provider
      const contract = new ethers.Contract(tokenAddress, Token.abi, provider); // create new instance of a token contract
      const balance = await contract.balanceOf(account); // get the balance of the account instance
      setUserBalance(balance.toString());
      console.log("Account Balance: ", balance.toString()); // print balance to console
    }
  };

  const transferCoins = async () => {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(tokenAddress, Token.abi, signer);
      const transation = await contract.transfer(userAccount, amount);
      await transation.wait();
      console.log(`${amount} Coins successfully sent to ${userAccount}`);
    }
  };

  // const handleOnGreetingInput = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.value);
  //   setGreeting(e.target.value);
  // };

  const handleOnGreetingUpdate = async () => {
    if (!greeting) return;

    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting); // set user input
      await transaction.wait().then((res) => {
        console.log(res);
        setGreeting("");
      }); // waiting for blockchain confirmation

      console.log({ transaction });
      fetchGreeting();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>React + Ethereum: Decentralized Application</h2>
        {!content ? <h2>No Greeting Found</h2> : <h2>{content}</h2>}
        {/* <button onClick={fetchGreeting}>GET</button> */}
        {/* <form onSubmit={handleOnGreetingUpdate}> */}
        <input
          value={greeting}
          onChange={(e) => setGreeting(e.target.value)}
          placeholder="Set Greeting"
          required
        />
        <button onClick={handleOnGreetingUpdate}>SIGN</button>
        {/* </form> */}
        <br />
        <input
          onChange={(e) => setUserAccount(e.target.value)}
          placeholder="Acount ID"
        />
        <input
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount: $0.00"
        />
        <button onClick={getUserBalance}>GET BALANCE</button>
        <button onClick={transferCoins}>TRANSFER COINS</button>
        {!userBalance ? (
          <h3>User Balance:</h3>
        ) : (
          <h3>User Balance: {userBalance}</h3>
        )}
      </header>
    </div>
  );
};

export default App;
