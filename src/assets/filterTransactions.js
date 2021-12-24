import { fromBech32, getAddress } from '@harmony-js/crypto';
import contracts from '../consts/DFK-contact/contracts';

const contractValues = Object.values(contracts);
const contractsInOne = contractValues.map(contract => getAddress(contract).bech32);

function filterDFKTransactions(trasactions) {
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

export default filterDFKTransactions;
