import './Account.css';

function Account({ account }) {

    function truncate(str, n) {
        return (str.length > n) ? str.substr(0, n - 1) + '...' : str;
    };

    return (
        <div className='account-box'>
            <span className='account'>{account.length > 8 ? truncate(account, 8) : account}</span>
        </div>
    )
}

export default Account;
