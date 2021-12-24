import abiDecoder from "abi-decoder";
import getABIFromContractName from "./getABIFromContractName";
import getContractNameFromAddress from "./getContractNameFromAddress";

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