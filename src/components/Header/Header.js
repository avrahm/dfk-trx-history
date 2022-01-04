import { useState } from 'react';
import dfkHeaderLogo from '../../assets/images/defi-kingdoms-logo.png'

import dfkLogo from '../../assets/images/dfk-logo.png'
import './Header.css';

function Header({ currentAccount, setCurrentAccount, isLoading, setIsLoading, connectWallet }) {

    const [walletAddress, setWalletAddress] = useState(currentAccount);

    const handelSubmit = (e) => {
        e.preventDefault();
        setCurrentAccount(walletAddress);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a href="/" className="navbar-brand" target='_self' >
                    <img src={dfkHeaderLogo} alt="defi-kingdoms-logo" className='header-logo' />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {/* <li className="nav-item">
                            <a className="nav-link" rel="noreferrer" href="https://dfkbookkeeper.com" target='_blank'>DFKBookkeeper.com</a>
                        </li> */}
                        <li className="nav-item">
                            <a className="nav-link" rel="noreferrer" href="/about" target='_self'>About</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" rel="noreferrer" href="https://game.defikingdoms.com" target='_blank'>Go to the Kingdom</a>
                        </li>
                    </ul>
                    {currentAccount && (
                        <form className="d-flex" onSubmit={(e) => handelSubmit(e)}>
                            <input className="form-control me-2" type="search" placeholder={currentAccount}
                                value={walletAddress} onChange={(e) => setWalletAddress(e.target.value)}
                                aria-label="Search" />
                            <button className="btn btn-outline-success">Search</button>
                        </form>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Header
