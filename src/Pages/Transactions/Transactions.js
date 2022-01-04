import FilterRow from '../../components/FilterRow/FilterRow';
import Loading from '../../components/Loading/Loading';
import TransactionsTable from './TransactionsTable';
import './Transactions.css';

function Transactions({ isLoading, transactions, currentAccount, setTransactions, debug }) {

    return (
        <div>
            {isLoading ? <Loading /> :
                (!transactions.length || !currentAccount) ? (
                    <div className="container">No transactions found<hr />
                        <a href='https://game.defikingdoms.com' target='_blank' rel="noreferrer" className="btn">Head to DeFi Kingdoms to get started</a>
                    </div>
                ) :
                    (<>
                        <FilterRow setTransactions={setTransactions} transactions={transactions} />
                        <div className='container'>
                            <TransactionsTable data={transactions} isLoading={isLoading} currentAccount={currentAccount} debug={debug} />
                        </div>
                    </>)
            }
        </div>
    )
}

export default Transactions;
