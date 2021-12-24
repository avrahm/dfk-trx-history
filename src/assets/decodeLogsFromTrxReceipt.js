import abiDecoder from "abi-decoder";
import axios from "axios";
import getABIFromContractName from "./getABIFromContractName";
import getContractNameFromAddress from "./getContractNameFromAddress";

async function decodeLogsFromTrxReceipt(transaction) {
    if (!transaction) return;
    const contractName = getContractNameFromAddress(transaction.to);

    //can't decode logs from a contract that doesn't have an ABI
    if (!contractName.includes('one')) {
        try {
            await axios.post('https://api.harmony.one', {
                "jsonrpc": "2.0",
                "method": "hmyv2_getTransactionReceipt",
                "params": [transaction.hash],
                "id": 1
            })
                .then((response) => {
                    let getAbi = getABIFromContractName(contractName);
                    if (getAbi) {
                        abiDecoder.addABI(getAbi);
                        const decodedLogs = abiDecoder.decodeLogs(response.data.result.logs);
                        console.log(decodedLogs);
                    }

                }, (error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }
    return;
}


export default decodeLogsFromTrxReceipt;