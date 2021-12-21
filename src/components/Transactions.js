import TransactionRow from './TransactionRow';

function Transactions({ data, isLoading }) {
    console.log(data);
    return (
        <table>
            <thead>
                <tr>
                    <th>Time</th>
                    <th>Transaction Type</th>
                    <th>To</th>
                    <th>From</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Fees</th>
                    <th>Total</th>
                    <th>View on Harmony</th>
                </tr>
            </thead>
            <tbody>
                {!isLoading && data.map((transaction, index) => {
                    return (
                        <TransactionRow key={index} transaction={transaction} />
                    )
                })}
            </tbody>
        </table>
    )
}

export default Transactions;
