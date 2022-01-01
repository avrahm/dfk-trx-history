import FilterRow from '../../components/FilterRow/FilterRow';
import Loading from '../../components/Loading/Loading';
import TransactionsTable from './TransactionsTable';
import './Transactions.css';

function Transactions({ buttonText, connectWallet, isLoading, transactions, currentAccount }) {

    return (
        <div>
            {isLoading ? <Loading /> :
                (<>
                    <FilterRow />
                    <TransactionsTable data={transactions} isLoading={isLoading} currentAccount={currentAccount} />
                </>)}
        </div>
    )
}

export default Transactions;
