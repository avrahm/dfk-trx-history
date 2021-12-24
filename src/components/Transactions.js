import filterDFKTransactions from '../assets/filterTransactions';
import TransactionRow from './TransactionRow';

function Transactions({ data, isLoading, currentAccount }) {
    const filteredData = filterDFKTransactions(data)
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">Time</th>
                    {/* <th scope="col">Transaction Type</th> */}
                    <th scope="col">To</th>
                    <th scope="col">From</th>
                    <th scope="col">Method</th>
                    <th scope="col">Price</th>
                    <th scope="col">Fees</th>
                    {/* <th scope="col">Total</th> */}
                </tr>
            </thead>
            <tbody>
                {!isLoading && filteredData.map((transaction, index) => {
                    return (
                        <TransactionRow key={index} transaction={transaction} currentAccount={currentAccount} />
                    )
                })}
            </tbody>
        </table>
    )
}

export default Transactions;
