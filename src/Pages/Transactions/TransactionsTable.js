import { filterDFKTransactions } from '../../api/TransactionAPI';
import TransactionRow from './TransactionRow';

function TransactionsTable({ data, isLoading, currentAccount, debug }) {
    const filteredData = filterDFKTransactions(data)
    return (
        <div className='table-responsive'>
            <table className='table table-sm'>
                <thead>
                    <tr>
                        {/* <th className='d-none d-md-table-cell' scope="col"></th> */}
                        <th scope="col">Timestamp/Moment</th>
                        <th scope="col">Location</th>
                        {/* <th scope="col">From</th> */}
                        <th scope="col">Action</th>
                        <th className='d-none d-md-table-cell' scope="col">Profit/Loss</th>
                        {/* <th scope="col">Fees</th> */}
                        {/* <th scope="col">Total</th> */}
                        {/* <th className='d-none d-md-table-cell' scope="col">Notes</th> */}
                    </tr>
                </thead>
                <tbody>
                    {!isLoading && filteredData.map((transaction, index) => {
                        return (
                            <TransactionRow key={index} transaction={transaction} currentAccount={currentAccount} debug={debug} />
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default TransactionsTable;
