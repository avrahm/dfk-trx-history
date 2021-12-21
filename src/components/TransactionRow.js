
function TransactionRow({ transaction, currentAccount }) {

    // Harmony API returns the transaction
    // NOTES:
    // Need to match the transaction.to and transaction.from to the currentAccount
    // Need to identify the transaction type
    // Need to match the transaction method from ABI
    // Timestamp is in in seconds, so we need to convert it to a date 
    // {
    //     blockHash: transaction.blockHash,
    //     blockNumber: 4,
    //     from: one1spshr72utf6rwxseaz339j09ed8p6f8ke370zj,
    //     timestamp: 1580422063,
    //     gas: 21000,
    //     gasPrice: 1000000000,
    //     hash: 0x8b8d3e33442828e4eaed0c335cb6fdb953fbdbaef519261bd6ddec83d529d85e,
    //     input: 0x,
    //     nonce: 0,
    //     to: one1r4zyyjqrulf935a479sgqlpa78kz7zlcg2jfen,
    //     transactionIndex: 0,
    //     value: 100000000000000000,
    //     shardID: 0,
    //     toShardID: 1,
    //     v: 0x27,
    //     r: 0x55e9f46eca0060821a6bdafe51210132a174e93658ec1b7430ed7cb57a9abc1,
    //     s: 0x4105b1d6c7310ea4af44759d717d8a5c9b52731e4877ae45110da43f184905f8
    // }

    function checkType(address) {
        if (address == transaction.from) {
            return 'sent';
        } else if (address == transaction.to) {
            return 'received';
        } else {
            return 'unknown';
        }
    }
    
    return (
        <tr>
            <td>{transaction.timestamp}</td>
            <td>{checkType(currentAccount)}</td>
            <td>{transaction.to}</td>
            <td>{transaction.from}</td>
            <td>Quantity</td>
            <td>{transaction.value}</td>
            <td>{transaction.gas}</td>
            <td>Total</td>
            <td><a href={`https://explorer.harmony.one/tx/` + transaction.hash}>Harmony</a></td>
        </tr>
    )
}

export default TransactionRow;
