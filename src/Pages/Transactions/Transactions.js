import FilterRow from '../../components/FilterRow/FilterRow';
import Loading from '../../components/Loading/Loading';
import TransactionsTable from './TransactionsTable';
import './Transactions.css';

function Transactions({ isLoading, transactions, currentAccount, setTransactions, debug }) {

    return (
        <div>
            {isLoading ? <Loading /> :
                (<>
                    <FilterRow setTransactions={setTransactions} transactions={transactions} />
                    <div className='container'>
                        <TransactionsTable data={transactions} isLoading={isLoading} currentAccount={currentAccount} debug={debug} />
                    </div>
                </>)}
        </div>
    )
}

export default Transactions;
