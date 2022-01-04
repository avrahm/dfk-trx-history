import { useState } from 'react';
import './Home.css';

function Home({ buttonText, connectWallet, setCurrentAccount }) {

    const [walletAddress, setWalletAddress] = useState('');

    const handelSubmit = (e) => {
        e.preventDefault();
        setCurrentAccount(walletAddress);
    }

    return (
        <div className='home'>
            <div className='home-content'>
                <h2 className='p-4'>Welcome to the DFK Bookkeeper</h2>
                <form onSubmit={(e) => handelSubmit(e)}>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" value={walletAddress} id="floatingInput" onChange={(e) => setWalletAddress(e.target.value)}
                            placeholder="0xEx... or one15..." />
                        <label htmlFor="floatingInput">Wallet Address</label>
                    </div>
                </form>
                <div>
                    <h6>You can also connect your wallet to stay logged in.</h6>
                    <button className='btn' onClick={connectWallet}>{buttonText}</button>
                </div>
            </div>
        </div>
    )
}

export default Home
