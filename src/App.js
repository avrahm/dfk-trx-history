import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

//apis
import { getTransactions } from './api/TransactionAPI';
import { checkIfWalletIsConnected } from './api/WalletAPI';

// pages
import Home from './Pages/Home/Home';
import Transactions from './Pages/Transactions/Transactions';

// components
import Header from './components/Header/Header';
import DebugRow from './components/DebugRow';
import PrivateRoute from './components/PrivateRoute';
import { About } from './Pages/About';

function App() {
  let navigate = useNavigate();

  const debug = false;
  const [currentAccount, setCurrentAccount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonText, setButtonText] = useState("Connect Wallet");
  const [status, setStatus] = useState("");

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        setButtonText("MetaMask not installed!");
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0])
      checkIfWalletIsConnected();
    } catch (error) {
      console.log(error);
      setButtonText("Error connecting wallet");
      setStatus("Unable to connect wallet! Make sure you're using MetaMask and try again.");
    }
  }

  async function getData() {
    if (currentAccount) {
      setIsLoading(true);
      navigate('/transactions');
      const { data = [], loading, message, code } = await getTransactions(currentAccount);
      if (code === 200) {
        setStatus(message);
        setTransactions(data);
        setIsLoading(loading);
      }
    }
  }

  async function checkWallet() {
    const { currentAccount, code, message } = await checkIfWalletIsConnected(debug);
    console.log(code, message);
    if (code === 200) {
      setCurrentAccount(currentAccount)
      setButtonText("Connected");
      setStatus(message);
      getData();
    }
  }

  useEffect(() => {
    checkWallet();
  }, []);

  useEffect(() => {
    getData();
  }, [currentAccount]);

  return (
    <div className="App">
      <Header currentAccount={currentAccount} isLoading={isLoading} connectWallet={connectWallet} setCurrentAccount={setCurrentAccount} />
      {debug && <DebugRow status={status} currentAccount={currentAccount} connectWallet={connectWallet} buttonText={buttonText} transactions={transactions} />}
      <Routes>
        <Route exact path="/" element={<Home connectWallet={connectWallet} buttonText={buttonText} setCurrentAccount={setCurrentAccount} />} />

        <Route exact path="/about" element={<About />} />

        <Route
          path="transactions"
          element={
            <PrivateRoute currentAccount={currentAccount} >
              <Transactions currentAccount={currentAccount} isLoading={isLoading} setTransactions={setTransactions} debug={debug} transactions={transactions} />
            </PrivateRoute>
          }
        />

        {/* <Route
          path="taxabletransactions"
          element={
            <PrivateRoute currentAccount={currentAccount} >
              <Transactions currentAccount={currentAccount} status={status} connectWallet={connectWallet} getData={getData} buttonText={buttonText} transactions={transactions} />
            </PrivateRoute>
          }
        /> */}

      </Routes>
    </div>
  );
}

export default App;