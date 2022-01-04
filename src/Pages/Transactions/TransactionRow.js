import { useEffect, useState } from 'react';
import moment from 'moment';

import harmonyLogo from '../../assets/images/harmony-logo.png';
import { decodeLogsFromTrxReceipt, decodeMethodFromTrx } from '../../api/TransactionAPI';
import { accountToEllipsis, convertLogsToNote } from '../../api/FormatAPI';
import { getContractNameFromAddress, getLocationFromContractName } from '../../api/ContractAPI';
import TransactionDetails from './TransactionDetails';

import './Transactions.css'

function TransactionRow({ transaction, debug }) {

    const [data, setData] = useState([]);
    const [details, setDetails] = useState([]);
    const [method, setMethod] = useState('');
    const [isDetailsReady, setIsDetailsReady] = useState(false);
    // Harmony API returns the transaction
    // NOTES:
    // Need to match the transaction.to and transaction.from to the currentAccount
    // Need to identify the transaction type
    // Need to match the transaction method from ABI
    // Timestamp is in in seconds, so we need to convert it to a date 

    async function getNote() {
        const { data, code, method } = await convertLogsToNote(transaction);
        if (code === 200) {
            setData(data);
            setDetails(data.details);
            setIsDetailsReady(true);
            setMethod(method);
        }
    }

    useEffect(() => {
        getNote();
    }, [transaction]);


    return (
        <>
            <tr>
                {debug && (
                    <td className='d-none d-md-table-cell' rowSpan='2'>
                        <div className="dropdown">
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Actions
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><button className="dropdown-item" onClick={() => console.log(transaction)}>Trx</button></li>
                                <li><button className="dropdown-item" onClick={() => decodeMethodFromTrx(transaction, true)}>Decode</button></li>
                                <li><button className="dropdown-item" onClick={() => decodeLogsFromTrxReceipt(transaction, true)}>TrxHsty</button></li>
                                <li><button className="dropdown-item" onClick={() => convertLogsToNote(transaction, true)}>Note</button></li>
                                <li><button className="dropdown-item" onClick={() => console.log(method, details)}>Details</button></li>
                            </ul>
                        </div>
                    </td>
                )}
                <td>
                    <span className='timestamp'>{moment.unix(transaction.timestamp).format('YYYY-MM-DD hh:mm:ss')}</span>
                    <br />
                    <span className='moment-ago'>{moment.unix(transaction.timestamp).fromNow()}</span>
                </td>
                <td>{getLocationFromContractName(getContractNameFromAddress(transaction.to)) || transaction.to}</td>
                <td>{decodeMethodFromTrx(transaction)}</td>
                <td className='d-none d-md-table-cell'>Profit/Loss</td>
                {/* <td>{(convertTo2Decimal(transaction.gasPrice) * transaction.gas)}</td> */}
            </tr>
            <tr>
                <td colSpan='4'>
                    <div className='container'>
                        {isDetailsReady ? <TransactionDetails data={data} details={details} method={method} /> : 'Loading details...'}
                    </div>
                </td>
            </tr>
            <tr>
                <td colSpan='4' className='text-right'>
                    <div className='d-flex justify-content-end'>
                        <a href={`https://explorer.harmony.one/tx/` + transaction.hash}
                            target='_blank' rel="noreferrer">
                            {/* {accountToEllipsis(transaction.hash)} */}
                            <button className='btn btn-sm'>View on Harmony <img src={harmonyLogo} alt="harmony-logo" width='20px' height='100%' /></button>
                        </a>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default TransactionRow;

