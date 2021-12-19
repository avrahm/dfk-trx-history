import { useEffect, useState } from 'react';

function App() {

  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [buttonText, setButtonText] = useState("Connect Wallet");

  const [status, setStatus] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      // extract ethereum object from the window
      const { ethereum } = window;

      if (!ethereum) {
        //if ethereum is not available, then MetaMask is not installed
        setButtonText("MetaMask not installed!");
        return;
      } else {
        setStatus("Wallet connected!");
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        //set the current account
        setCurrentAccount(account);

        setButtonText("Get Data");
        // await getData();
      } else {
        setCurrentAccount("");
        setStatus("No authorized accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        setButtonText("MetaMask not installed!");
        checkIfWalletIsConnected();
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      setCurrentAccount(accounts[0]);
      checkIfWalletIsConnected();
    } catch (error) {
      setStatus("Unable to connect wallet! Make sure you're using MetaMask and try again.");

      console.log(error);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <div className="App">
      <br />
      <br />
      <br />
      <br />
      {currentAccount}
      <br />
      <br />
      {status}
      <br />
      <br />
      <button onClick={connectWallet}>{buttonText}</button>
    </div>
  );
}

export default App;
