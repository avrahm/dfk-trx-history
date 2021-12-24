import React from 'react'

function DebugRow({ status, currentAccount, connectWallet, getData, buttonText, filterDFKTransactions, transactions }) {

    const logData = () => {
        // console.log('transactions', transactions);
        console.log('filtered transactions', filterDFKTransactions(transactions));
        console.log('currentAccount', currentAccount);
        // console.log('status', status);
        // console.log('ethereum', window.ethereum);
        // console.log('fromBech32', fromBech32('one1yjkky5pdr3jje3mggzq3d8gy394vyresl69pgt'));
    }


    return (
        <div style={{ display: 'flex', flexDirection: 'row', textAlign: 'center' }}>

            <br /> 
            <br />
            {status}   
            <br />
            <br />
            <button onClick={!currentAccount ? connectWallet : getData}>{buttonText}</button>
            <br />
            <button onClick={logData}>Log Data</button>
            <br />
            <br />
        </div>
    )
}

export default DebugRow;
