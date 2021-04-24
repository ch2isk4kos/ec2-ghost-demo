import React, { useState } from "react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";
import "./styles/App.css";

// store contract address in a varibale where Greeter deployed to:
const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const App = () => {
  return (
    <div className="App">
      <h2>React + Ethereum: Decentralized Application</h2>
      <form onSubmit={handleOnSubmit}></form>
    </div>
  );
};

export default App;
