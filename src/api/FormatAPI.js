import BigNumber from 'bignumber.js';
import { getContractNameFromAddress } from './ContractAPI';
import { decodeLogsFromTrxReceipt, decodeMethodFromTrx } from './TransactionAPI';

import { tokens } from '../assets/consts/tokenList.json'
import contracts from '../assets/DFK-contracts/contracts';

export function accountToEllipsis(account) {
    if (!account) return null;
    return account.slice(0, 6) + '...' + account.slice(-4);
}

export function convertTo2Decimal(value, back = false) {
    try {
        const convert = new BigNumber(value).shiftedBy(-18);
        if (convert == 0) {
            return convert.toString();
        } else if (back) {
            return new BigNumber(value).shiftedBy(18).toString();
        } else if (convert.toString().includes('.')) {
            return convert.toFixed(5).toString();
        } else {
            return convert.toFixed(2).toString();
        }
    } catch (error) {
        console.log(error);
    }
}

export async function formatLogData(logs) {
    if (!logs) return null;
    const eachLog = await logs.map((log, index) => {
        switch (log.name) {
            case 'Transfer': {
                return (
                    { i: index, name: log.name, token: getTokenInfo(log.address), currency: '$', value: convertTo2Decimal(log.events[2].value) }
                )
            }
            case 'QuestStarted': {
                return (
                    { i: index, name: log.name, questId: log.events[0].value, currency: '$', heroId: log.events[2].value }
                )
            }
            case 'QuestReward': {
                return (
                    { i: index, name: log.name, questId: log.events[0].value, currency: '$', heroId: log.events[2].value, rewardItem: log.events[3].value, itemQuantity: log.events[4].value }
                )
            }
            case 'QuestCompleted': {
                return (
                    { i: index, name: log.name, questId: log.events[0].value, currency: '$', heroId: log.events[2].value }
                )
            }
            case 'QuestCanceled': {
                return (
                    { i: index, name: log.name, questId: log.events[0].value, currency: '$', heroId: log.events[2].value }
                )
            }
            case "MeditationBegun": {
                return (
                    { i: index, name: log.name, mediationId: log.events[2].value, currency: '$', heroId: log.events[1].value }
                )
            }
            default: {
                return (
                    { i: index, name: log.name, message: '' }
                )
            }
        }
    });
    return eachLog
}

async function mapData(method, decodedLogs, debug) {
    let jsonLog = [];
    let data = await formatLogData(decodedLogs)
        .then(async (logs) => {
            if (debug) console.log('mapData: logs', logs)
            if (logs) {
                logs.map((log) => {
                    jsonLog.push(log);
                })
                return {
                    details: jsonLog
                };
            }
        })
    if (debug) console.log('mapData', data);
    return data;
}

export async function convertLogsToNote(transaction, debug = false) {
    const contract = getContractNameFromAddress(transaction.to);
    const method = await decodeMethodFromTrx(transaction);
    const data = await decodeLogsFromTrxReceipt(transaction)
        .then(async (decodedLogs) => {
            switch (contract) {
                case 'UniswapV2Router02': {
                    const formattedData = await mapData(method, decodedLogs, debug);
                    return formattedData;
                }
                case 'MasterGardener': {
                    const formattedData = await mapData(method, decodedLogs, debug);
                    return formattedData;
                }
                case 'Bank': {
                    const formattedData = await mapData(method, decodedLogs, debug);
                    return formattedData;
                }
                case 'Banker': {
                    const formattedData = await mapData(method, decodedLogs, debug);
                    return formattedData;
                }
                case 'SaleAuction': {
                    const methodData = await decodeMethodFromTrx(transaction, false, true);
                    return methodData;
                }
                case 'QuestCoreV2': {
                    const methodData = await decodeMethodFromTrx(transaction, false, true);
                    const formattedData = await mapData(method, decodedLogs, debug);
                    return { methodData, formattedData };
                }
                case 'MeditationCircle': {
                    const methodData = await decodeMethodFromTrx(transaction, false, true);
                    const formattedData = await mapData(method, decodedLogs, debug);
                    return { methodData, formattedData };
                }
                default:
                    return 'Unknown';
            }
        }).catch(error => {
            console.log(error);
            return 'Unknown';
        });
    return { data: data, contract: contract, method: method, code: 200 };
}

export function getTokenInfo(address) {
    if (!address) return null;
    const token = tokens.find(token => token.address.toLowerCase() === address.toLowerCase());
    return token ? token : address;
}
