import { useEffect, useState } from 'react';
import axios from 'axios';
import Transactions from './components/Transactions';

function App() {

  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [buttonText, setButtonText] = useState("Connect Wallet");

  const [transactions, setTransactions] = useState([]);

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
        await getData();
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

  const getData = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        //if ethereum is not available, then MetaMask is not installed
        setButtonText("MetaMask not installed!");
        return;
      } else {
        setStatus("getting data...");
        if (currentAccount) {
          axios.post('https://api.harmony.one', {
            "jsonrpc": "2.0",
            "method": "hmyv2_getTransactionsHistory",
            "params": [{
              "address": currentAccount,
              "pageIndex": 0,
              "pageSize": 1000,
              "fullTx": true,
              "txType": "ALL",
              "order": "ASC"
            }],
            "id": 1
          })
            .then((response) => {
              !response.data.error ? setStatus("Data received!") : setStatus("Error getting data!");
              if (!response.data.error) {
                setTransactions(response.data.result.transactions)
                setIsLoading(false);
              } else {
                setTransactions([]);
                setIsLoading(true);
              }
            }, (error) => {
              console.log(error);
            });
        }
      }
    } catch (error) {
      // console.log(error);
      console.log('catch error');
    }
  }

  const logData = () => {
    console.log('transactions', transactions);
    console.log('currentAccount', currentAccount);
    console.log('status', status);
    console.log('ethereum', window.ethereum);
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    getData();
  }, [currentAccount]);

  return (
    <div className="App">
      <br />
      <br />
      {currentAccount}
      <br />
      <br />
      {status}
      <br />
      <br />
      <button onClick={!currentAccount ? connectWallet : getData}>{buttonText}</button>
      <br />
      <button onClick={logData}>Log Data</button>
      <br />
      <Transactions data={transactions} isLoading={isLoading} currentAccount={currentAccount} />
      <br />
      <br />
    </div>
  );
}

export default App;