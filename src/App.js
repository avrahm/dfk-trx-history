import { useEffect, useState } from 'react';
import axios from 'axios';
import Transactions from './components/Transactions';
import { getAddress } from '@harmony-js/crypto';
import filterDFKTransactions from './assets/filterTransactions';
import Loading from './components/Loading/Loading';
import Header from './components/Header/Header';
import FilterRow from './components/FilterRow/FilterRow';
import DebugRow from './components/DebugRow';
import Home from './components/Home/Home';

function App() {

  const [currentAccount, setCurrentAccount] = useState("");
  const testAccount = "one1ydzt66wcuyxwawqxwh3splecf32zw7gsx52hdu";
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
        setCurrentAccount(getAddress(account).bech32);
        // setCurrentAccount(getAddress(testAccount).bech32);
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
    setIsLoading(true);
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
              "order": "DESC"
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
                setIsLoading(false);
              }
            }, (error) => {
              console.log(error);

              setIsLoading(false);
            });
        }
      }
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      console.log('catch error');
    }
  }

  const debug = false;

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    getData();
  }, [currentAccount]);

  return (
    <div className="App">
      <Header currentAccount={currentAccount} isLoading={isLoading} connectWallet={connectWallet} />

      {debug && <DebugRow status={status} currentAccount={currentAccount} connectWallet={connectWallet} getData={getData} buttonText={buttonText} filterDFKTransactions={filterDFKTransactions} transactions={transactions} />}
      <div className='body'>
        {currentAccount ? (
          isLoading ? <Loading /> :
            (<>
              <FilterRow />
              <Transactions data={transactions} isLoading={isLoading} currentAccount={currentAccount} />
            </>)

        ) : (
          <Home buttonText={buttonText} connectWallet={connectWallet} />
        )}
      </div>
    </div>
  );
}

export default App;