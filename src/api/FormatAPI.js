import BigNumber from 'bignumber.js';

export function accountToEllipsis(account) {
    if (!account) return null;
    return account.slice(0, 6) + '...' + account.slice(-4);
}

export function shiftByBigNumber(value) {
    try {
        const convert = new BigNumber(value).shiftedBy(-18);
        if (convert == 0) {
            return convert.toString();
        } else if (convert.toString().includes('.')) {
            return convert.toFixed(5).toString();
        } else {
            return convert.toFixed(2).toString();
        }
    } catch (error) {
        console.log(error);
    }
}

export async function mapLogs(logs) {
    if (!logs) return null;
    const eachLog = await logs.map((log, index) => {
        if (log.name === 'Transfer') {
            return (
                { i: index, name: log.name, from: accountToEllipsis(log.events[0].value), to: accountToEllipsis(log.events[1].value), value: shiftByBigNumber(log.events[2].value) }
            )
        }
    });
    return eachLog
}