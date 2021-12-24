import moment from 'moment';
import getContractNameFromAddress from '../assets/getContractNameFromAddress';
import decodeLogsFromTrxReceipt from '../assets/decodeLogsFromTrxReceipt';
import { decodeTransaction } from '../assets/decodeTransaction';

import harmonyLogo from '../assets/images/harmony-logo.png';

function TransactionRow({ transaction, currentAccount }) {

    // Harmony API returns the transaction
    // NOTES:
    // Need to match the transaction.to and transaction.from to the currentAccount
    // Need to identify the transaction type
    // Need to match the transaction method from ABI
    // Timestamp is in in seconds, so we need to convert it to a date 

    function checkType() {
        if (currentAccount === transaction.from) {
            return 'Sent';
        } else if (currentAccount === transaction.to) {
            return 'Received';
        } else {
            return 'Unknown';
        }
    }

    return (
        <tr>
            <td><button onClick={() => decodeTransaction(transaction, true)}>Decode</button></td>
            <td><button onClick={() => decodeLogsFromTrxReceipt(transaction)}>Trx History</button></td>
            <td>{moment.unix(transaction.timestamp).format('YYYY-MM-DD')}</td>
            {/* <td>{checkType()}</td> */}
            <td>{transaction.to === currentAccount ? " ME " : getContractNameFromAddress(transaction.to)}</td>
            <td>{transaction.from === currentAccount ? " ME " : getContractNameFromAddress(transaction.from)}</td>
            <td>{decodeTransaction(transaction)}</td>
            {/* <td>{(transaction.gas === 48922 || transaction.gas === 96360) && "This One"}</td> */}
            {/* <td>Quantity</td> */}
            {/* <td></td> */}
            <td>{transaction.value}</td>
            <td>{transaction.gas}</td>
            {/* <td>{transaction.hash}</td> */}
            {/* <td>Total</td> */}
            {/* <td></td> */}

            <td>
                <a href={`https://explorer.harmony.one/tx/` + transaction.hash}
                    target='_blank' rel="noreferrer">
                    <img src={harmonyLogo} alt="harmony-logo" width='30px' height='100%' />
                </a>
            </td>
        </tr>
    )
}

export default TransactionRow;
