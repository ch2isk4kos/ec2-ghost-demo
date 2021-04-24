import React, { useState } from "react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";
import "./styles/App.css";

// store contract address in a varibale where Greeter deployed to:
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const App = () => {
  const [greeting, setGreeting] = useState("");
  const [data, setData] = useState("");

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
        setData(d);
        console.log("data: ", d);
      } catch (err) {
        console.log("error: ", err);
      }
    }
  };

  const handleOnAccountRequest = async () => {
    await window.ethereum.request({ method: "eth_requestAccounts" }); // prompts user to connect MetaMask account
  };

  const handleOnGreetingSignature = async () => {
    if (!greeting) return;

    if (typeof window.ethereum !== "undefined") {
      await handleOnAccountRequest();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract.setGreeting(greeting); // set user input

      await transaction.wait(); // waiting for blockchain confirmation

      fetchGreeting();
    }
  };

  const handleOnSubmit = () => {
    //
    //
    //
  };

  return (
    <div className="App">
      <h2>React + Ethereum: Decentralized Application</h2>
      <form></form>
    </div>
  );
};

export default App;
