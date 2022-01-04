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
                <div className='container'>
                    <h2 className='p-4'>Welcome to the DFK Bookkeeper</h2>
                    <form onSubmit={(e) => handelSubmit(e)}>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" value={walletAddress} id="floatingInput" onChange={(e) => setWalletAddress(e.target.value)}
                                placeholder="0xEx... or one15..." />
                            <label htmlFor="floatingInput">Wallet Address (0x/one)</label>
                        </div>
                    </form>
                    <hr style={{ width: '50%', margin: '30px auto' }} />
                    <div>
                        <h6>You can also connect your wallet to stay logged in. Read <a href='/#/about'>About</a> </h6>
                        <button className='btn' onClick={connectWallet}>{buttonText}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
