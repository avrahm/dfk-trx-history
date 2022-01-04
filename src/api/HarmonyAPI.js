import axios from "axios";

export function hmyv2_getTransactionReceipt(trxHash) {
    return axios.post('https://api.harmony.one', {
        "jsonrpc": "2.0",
        "method": "hmyv2_getTransactionReceipt",
        "params": [trxHash],
        "id": 1
    }, { headers: { "Access-Control-Allow-Origin": "*" } }
    );
}

export function hmyv2_getTransactionsHistory(address = null, pageIndex = 0, pageSize = 1000, fullTx = true, txType = 'ALL', order = 'DESC') {
    return axios.post('https://api.harmony.one', {
        "jsonrpc": "2.0",
        "method": "hmyv2_getTransactionsHistory",
        "params": [{
            "address": address,
            "pageIndex": pageIndex,
            "pageSize": pageSize,
            "fullTx": fullTx,
            "txType": txType,
            "order": order
        }],
        "id": 1
    }, { headers: { "Access-Control-Allow-Origin": "*" } }
    );
}