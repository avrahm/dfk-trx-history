import abiDecoder from "abi-decoder";
import { getAddress } from '@harmony-js/crypto';

import { getContractNameFromAddress, getABIFromContractName } from "./ContractAPI";
import contracts from '../assets/DFK-contracts/contracts';
import { hmyv2_getTransactionReceipt } from "./HarmonyAPI";

const contractValues = Object.values(contracts);
const contractsInOne = contractValues.map(contract => getAddress(contract).bech32);

export async function decodeLogsFromTrxReceipt(transaction, log) {
    let decodedLogs = [];
    if (!transaction) return;
    const contractName = getContractNameFromAddress(transaction.to);
    //can't decode logs from a contract that doesn't have an ABI
    if (!contractName.includes('one')) {
        try {
            await hmyv2_getTransactionReceipt(transaction.hash)
                .then((response) => {
                    let getAbi = getABIFromContractName(contractName);
                    if (getAbi) {
                        abiDecoder.addABI(getAbi);
                        decodedLogs = abiDecoder.decodeLogs(response.data.result.logs);
                        log && console.log(decodedLogs);
                        return decodedLogs;
                    }
                }, (error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }
    return decodedLogs;
}

export function decodeTransaction(trx, log = false) {
    if (!trx) return;
    const contractName = getContractNameFromAddress(trx.to);
    if (!contractName.includes('one')) {
        let getAbi = getABIFromContractName(contractName);
        if (getAbi) {
            abiDecoder.addABI(getAbi);
            const decodedData = abiDecoder.decodeMethod(trx.input);
            if (log) console.log(decodedData);
            if (decodedData === undefined) return;
            return decodedData.name;
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