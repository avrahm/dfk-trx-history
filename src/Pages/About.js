import './Home/Home.css';
export function About() {
    return (
        <div className='home'>
            <div className='home-content'>
                <div className='container'>
                    <div className='about-scroll'>
                        <h2 className='p-3'>About</h2>
                        The purpose of this app is to provide a simple way to track your DFK transactions.
                        <br />

                        <h2 className='p-3'>Coming Soon</h2>
                        Download Transactions
                        <br />
                        Profit/Loss Calculations

                        <hr />

                        <h2 className='p-3'>Contact</h2>

                        Connect on Twitter <a href='https://twitter.com/avrahm'>@avrahm</a><br />
                        Connect on Github <a href='https://github.com/avrahm'>@avrahm</a><br /><br />

                        If you like my work, feel free to reach me at hire@avrahm.com or at 0x4f4871D2aC73a7Af211080539B01071961c19A84<br />

                        <hr />

                        <h2 className='p-3'>How to use</h2>
                        <b>Search by Address</b>: Searching by address will show you all transactions for that address and will not store any data.<br />
                        <b>Connect your wallet</b>: Connecting your wallet only grabs the address from MetaMask and remains connected.

                        <h4 className='p-2'>How is your wallet connected?</h4>
                        We check if your wallet is connected by asking MetaMask if you've authorized the app. MetaMask only provides the wallet address.<br />
                        Disconnecting your wallet will remove the link between your MetaMask and this site.<br />
                        To disconnect: Follow this guide from MetaMask support. <a href='https://metamask.zendesk.com/hc/en-us/articles/360059535551-Disconnect-wallet-from-Dapp'>Disconnect wallet from Dapp</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
