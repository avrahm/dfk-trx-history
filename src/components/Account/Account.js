import { accountToEllipsis } from '../../api/FormatAPI';
import './Account.css';

function Account({ account }) {

    return (
        <div className='account-box'>
            <span className='account'>{account.length > 8 ? accountToEllipsis(account) : account}</span>
        </div>
    )
}

export default Account;
