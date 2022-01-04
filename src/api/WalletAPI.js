import { getAddress } from "@harmony-js/crypto";

let currentAccount = '';
let message = '';

export const checkIfWalletIsConnected = async (debug = false) => {
    try {
        // extract ethereum object from the window
        const { ethereum } = window;
        if (!ethereum) {
            //if ethereum is not available, then MetaMask is not installed
            message = "MetaMask not installed!";
            return { currentAccount, code: 500, message };
        }
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length !== 0) {
            const account = accounts[0];
            //set the current account
            currentAccount = getAddress(account).bech32;
            message = `Got account: ${currentAccount}`;
            // await getData();
            return { currentAccount, code: 200, message };
        } else {
            currentAccount = "";
            message = "No authorized accounts found";
            return { currentAccount, code: 401, message };
        }
    } catch (error) {
        console.log(error);
        return { currentAccount, code: 500, message };
    }
}

