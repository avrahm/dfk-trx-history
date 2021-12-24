import dfkHeaderLogo from '../../assets/images/defi-kingdoms-logo.png'
import Account from '../Account/Account';
import './Header.css';

function Header({ currentAccount, isLoading, setIsLoading, connectWallet }) {
    return (
        <header className='header'>
            <div className='header-logo'>
                <img src={dfkHeaderLogo} alt="defi-kingdoms-logo" />
            </div>
            <div className='header-title'>
                <h3>Transaction History</h3>
            </div>
            <div className='header-account'>
                {currentAccount ? <Account account={currentAccount} /> : <button className='btn' onClick={connectWallet}>Connect Wallet</button>}
            </div>
        </header>
    )
}

export default Header
