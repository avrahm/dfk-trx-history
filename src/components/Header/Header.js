import dfkHeaderLogo from '../../assets/images/defi-kingdoms-logo.png'
import Account from '../Account/Account';
import './Header.css';

function Header({ currentAccount, isLoading, setIsLoading, connectWallet }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/" target='_self' >
                    <img src={dfkHeaderLogo} alt="defi-kingdoms-logo" className='header-logo' />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link" href="/transactions" target='_self'>Transaction History</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/taxabletrx" target='_self'>Taxable Transactions</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" rel="noreferrer" href="https://game.defikingdoms.com" target='_blank'>Go to the Kingdoms</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        {currentAccount ? <Account account={currentAccount} /> : <button className='btn' onClick={connectWallet}>Connect Wallet</button>}
                    </form>
                </div>
            </div>
        </nav>


    )
}

export default Header
