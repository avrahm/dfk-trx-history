import { fromBech32 } from '@harmony-js/crypto';
import React from 'react'
import { getTokenInfo } from '../api/FormatAPI';

function DebugRow({ status, currentAccount, connectWallet, getData, buttonText, filterDFKTransactions, transactions }) {

    const logData = () => {
        // console.log('transactions', transactions);
        console.log('filtered transactions', filterDFKTransactions(transactions));
        console.log('currentAccount', currentAccount);
        // console.log('status', status);
        // console.log('ethereum', window.ethereum);
        console.log('fromBech32', fromBech32('one1zwn9h8uq883vqv4uqgshrhq9kvxr72yjjjz9la'));
        // console.log('One token', getTokenInfo("one1vh02j0mm3pkr8fuvzq6rye7a89e8w7xzvel70f"));
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
