import React, { useState, useEffect } from "react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";
import "./styles/App.css";

// store contract address in a varibale where Greeter deployed to:
const greeterAddress = "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9";

const App = () => {
  const [greeting, setGreeting] = useState("");
  // const [account, setAccount] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchGreeting();
    // fetchGreetings();
  }, []);

  // const fetchGreetings = async () => {
  //   if (typeof window.ethereum !== "undefined") {
  //     const provider = new ethers.providers.JsonRpcProvider();
  //     await provider.getBlockNumber().then((res) => {
  //       console.log("response:", res.data);
  //     });
  //   }
  // };

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
      </header>
    </div>
  );
};

export default App;
