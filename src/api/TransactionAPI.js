import abiDecoder from "abi-decoder";
import { getAddress } from '@harmony-js/crypto';

import { getContractNameFromAddress, getABIFromContractName } from "./ContractAPI";
import contracts from '../assets/DFK-contracts/contracts';
import { hmyv2_getTransactionReceipt, hmyv2_getTransactionsHistory } from "./HarmonyAPI";

const contractValues = Object.values(contracts);
const contractsInOne = contractValues.map(contract => getAddress(contract).bech32);

export async function decodeLogsFromTrxReceipt(transaction, log = false) {
    let decodedLogs = [];
    if (!transaction) return;
    const contractName = getContractNameFromAddress(transaction.to);
    //can't decode logs from a contract that doesn't have an ABI
    if (!contractName.includes('one')) {
        await hmyv2_getTransactionReceipt(transaction.hash)
            .then((response) => {
                let getAbi = getABIFromContractName(contractName);
                if (getAbi) {
                    abiDecoder.addABI(getAbi);
                    decodedLogs = abiDecoder.decodeLogs(response.data.result.logs);
                    log && console.log(decodedLogs);
                    return decodedLogs;
                }
            }).catch(error => {
                try {
                    const method = decodeMethodFromTrx(transaction);
                    // console.log(contractName, method, error);
                    return `No logs found for ${method}`;
                } catch (error) {
                    // console.log(contractName, error);
                    return 'No logs found';
                }
            });
    }
    return decodedLogs;
}

export function decodeMethodFromTrx(trx, log = false, full = false) {
    if (!trx) return;
    const contractName = getContractNameFromAddress(trx.to);
    if (!contractName.includes('one')) {
        let getAbi = getABIFromContractName(contractName);
        if (getAbi) {
            abiDecoder.addABI(getAbi);
            const decodedMethod = abiDecoder.decodeMethod(trx.input);
            log && console.log(decodedMethod);
            if (decodedMethod === undefined) return;
            if (full) return decodedMethod;
            return decodedMethod.name;
        }
    }
}

export function filterDFKTransactions(trasactions) {
    const filteredTransactions = [];
    if (trasactions.length === 0) {
        return filteredTransactions;
    }
    trasactions.forEach(transaction => {
        if (contractsInOne.includes(transaction.to)) {
            filteredTransactions.push(transaction);
        } else { return null; }
    });
    return filteredTransactions;
}

export const getTransactions = async (account, debug = false) => {
    const { ethereum } = window;
    if (!ethereum) {
        //if ethereum is not available, then MetaMask is not installed
        return { data: [], loading: false, message: "MetaMask not installed!", code: 500 };
    } else {
        try {
            const response = await hmyv2_getTransactionsHistory(account);
            const data = await response.data.result.transactions;
            return { data: data, loading: false, message: "Data received!", code: 200 };
        } catch (error) {
            return { data: [], loading: false, message: "Error getting data!", code: 500 };
        }
    }
}