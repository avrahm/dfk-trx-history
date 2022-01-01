import { useEffect, useState } from 'react';
import moment from 'moment';

import harmonyLogo from '../../assets/images/harmony-logo.png';
import { decodeLogsFromTrxReceipt, decodeMethodFromTrx } from '../../api/TransactionAPI';
import { mapLogs, shiftByBigNumber } from '../../api/FormatAPI';
import { getContractNameFromAddress } from '../../api/ContractAPI';

function TransactionRow({ transaction, currentAccount }) {

    const [note, setNote] = useState('');
    // Harmony API returns the transaction
    // NOTES:
    // Need to match the transaction.to and transaction.from to the currentAccount
    // Need to identify the transaction type
    // Need to match the transaction method from ABI
    // Timestamp is in in seconds, so we need to convert it to a date 

    async function convertLogsToNote(transaction, debug = false) {
        const contract = getContractNameFromAddress(transaction.to);
        const method = decodeMethodFromTrx(transaction);
        const note = await decodeLogsFromTrxReceipt(transaction)
            .then(async (decodedLogs) => {
                switch (contract) {
                    case 'UniswapV2Router02':
                        switch (method) {
                            case 'swapExactETHForTokens':
                                let eachLog = []
                                // console.log(await mapLogs(decodedLogs));
                                let allLogs = await mapLogs(decodedLogs)
                                    .then(async (logs) => {
                                        if (logs) {
                                            logs.map((log) => {
                                                eachLog.push(`${log.from} sent ${log.value} to ${log.to}`);
                                            })
                                            return eachLog.join("\r\n");
                                        }
                                    })
                                if (debug) console.log(allLogs.toString());
                                return allLogs;
                            // break;
                            default:
                                return 'Unknown';
                        }
                    default:
                        return 'Unknown';
                }
            }).catch(error => {
                console.log(error);
            });
        return setNote(note);
    }

    useEffect(() => {
        convertLogsToNote(transaction);
    }, [transaction]);

    return (
        <tr>
            <td className='d-none d-md-table-cell' ><button onClick={() => console.log(transaction)}>Trx</button></td>
            <td className='d-none d-md-table-cell' ><button onClick={() => decodeMethodFromTrx(transaction, true)}>Decode</button></td>
            <td className='d-none d-md-table-cell' ><button onClick={() => decodeLogsFromTrxReceipt(transaction, true)}>TrxHsty</button></td>
            <td>{moment.unix(transaction.timestamp).format('YYYY-MM-DD')}</td>
            <td>{getContractNameFromAddress(transaction.to) || transaction.to}</td>
            <td>{decodeMethodFromTrx(transaction)}</td>
            <td>{shiftByBigNumber(transaction.value)} ONE</td>
            <td>{note}</td>
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

