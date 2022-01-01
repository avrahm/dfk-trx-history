import { filterDFKTransactions } from '../../api/TransactionAPI';
import TransactionRow from './TransactionRow';

function TransactionsTable({ data, isLoading, currentAccount }) {
    const filteredData = filterDFKTransactions(data)
    return (
        <div className='table-responsive'>
            <table className='table table-sm'>
                <thead>
                    <tr>
                        <th className='d-none d-md-table-cell' scope="col"></th>
                        <th className='d-none d-md-table-cell' scope="col"></th>
                        <th className='d-none d-md-table-cell' scope="col"></th>
                        <th scope="col">Time</th>
                        {/* <th scope="col">Transaction Type</th> */}
                        <th scope="col">Contract</th>
                        {/* <th scope="col">From</th> */}
                        <th scope="col">Method</th>
                        <th scope="col">Price</th>
                        {/* <th scope="col">Fees</th> */}
                        {/* <th scope="col">Total</th> */}
                        <th className='d-none d-md-table-cell' scope="col">Notes</th>
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

        </div>
    )
}

export default TransactionsTable;
