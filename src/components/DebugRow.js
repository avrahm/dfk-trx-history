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
        <div style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center' }}>
            <span> {status}</span>
            <button className='btn btn-sm' onClick={!currentAccount ? connectWallet : getData}>{buttonText}</button>
            <button className='btn btn-sm' onClick={logData}>Log Data</button>
        </div>
    )
}

export default DebugRow;
