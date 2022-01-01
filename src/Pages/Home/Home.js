import './Home.css';
function Home({ buttonText, connectWallet }) {
    return (
        <div className='home'>
            <div className='home-content'>
                <h2>Welcome to the DeFi Kingdoms Transaction History</h2>
                <h4>Please connect your wallet to view your transactions</h4>
                <button className='btn' onClick={connectWallet}>{buttonText}</button>
            </div>
        </div>
    )
}

export default Home
