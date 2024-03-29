import React, { useState } from "react";
import Web3 from "web3";

function Task4() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });
        // Get the current account
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
        setError(null);
      } catch (err) {
        setError("Error connecting to MetaMask.");
        console.error(err);
      }
    } else {
      setError("Please install MetaMask to use this feature.");
    }
  };

  return (
    <div>
      <p>
        You have to Install metamask Extension , then login and after that this
        connect wallet feature will work
      </p>
      <br/>
      {!account ? (
        <button onClick={connectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected Account: {account}</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default Task4;
