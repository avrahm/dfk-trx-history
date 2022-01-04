import { fromBech32 } from '@harmony-js/crypto';
import { isBech32Address } from '@harmony-js/utils';

import contracts from '../assets/DFK-contracts/contracts';

//ABI json files
import Bank from '../assets/DFK-contracts/abi/Bank.json';
import Banker from '../assets/DFK-contracts/abi/Banker.json';
import ERC20 from '../assets/DFK-contracts/abi/ERC20.json';
import ERC721 from '../assets/DFK-contracts/abi/ERC721.json';
import HeroSale from '../assets/DFK-contracts/abi/HeroSale.json';
import HeroSummoningUpgradeable from '../assets/DFK-contracts/abi/HeroSummoningUpgradeable.json';
import MasterGardener from '../assets/DFK-contracts/abi/MasterGardener.json';
import MeditationCircle from '../assets/DFK-contracts/abi/MeditationCircle.json';
import QuestCore from '../assets/DFK-contracts/abi/QuestCoreV2.json';
import SaleAuction from '../assets/DFK-contracts/abi/SaleAuction.json';
import UniswapV2Router02 from '../assets/DFK-contracts/abi/UniswapV2Factory.json';
import Profiles from '../assets/DFK-contracts/abi/Profiles.json';
import Hero from '../assets/DFK-contracts/abi/Hero.json';
import Crystals from '../assets/DFK-contracts/abi/Crystals.json';
import Vendor from '../assets/DFK-contracts/abi/Vendor.json';

const contractKeys = Object.keys(contracts);

export function getContractNameFromAddress(address) {
    const checksum = isBech32Address(address.toLowerCase()) ? fromBech32(address.toLowerCase()) : address.toLowerCase();
    let contractName = address.toLowerCase();
    contractKeys.forEach(contractKey => {
        const contractValue = contracts[contractKey];
        const contractChecksum = isBech32Address(contractValue) ? fromBech32(contractValue) : contractValue;
        if (checksum.toLowerCase() === contractChecksum.toLowerCase()) {
            contractName = contractKey;
            return;
        }
    });
    return contractName;
}

function isQuest(contractName) {
    const questCoreArr =
        ['QuestCoreV2', 'Ambertaffy', 'Darkweed', 'Goldvein', 'Ragweed', 'Redleaf', 'Rockroot', 'SwiftThistle', 'Bloater', 'Ironscale', 'Lanterneye', 'Redgill', 'Sailfish', 'Shimmerskin', 'Silverfin', 'ShvasRune', 'BluePetEgg', 'GreyPetEgg', 'GoldenEgg', 'GaiasTears', 'DFKGold', 'Gardening', 'Fishing', 'Mining', 'Foraging', 'WishingWell'];

    if (questCoreArr.includes(contractName)) {
        return true;
    } else {
        return false;
    }
}

export function getABIFromContractName(contractName) {
    const contract = isQuest(contractName) ? 'QuestCoreV2' : contractName;

    let contractABI = null;
    switch (contract) {
        case 'Banker':
            contractABI = Banker;
            break;
        case 'Bank':
            contractABI = Bank;
            break;
        case 'JewelToken':
            contractABI = ERC20;
            break;
        case 'xJEWEL':
            contractABI = ERC721;
            break;
        case 'HeroSale':
            contractABI = HeroSale;
            break;
        case 'HeroSummoningUpgradeable':
            contractABI = HeroSummoningUpgradeable;
            break;
        case 'MasterGardener' || 'Banker':
            contractABI = MasterGardener;
            break;
        case 'MeditationCircle':
            contractABI = MeditationCircle;
            break;
        case 'QuestCoreV2':
            contractABI = QuestCore;
            break;
        case 'SaleAuction':
            contractABI = SaleAuction;
            break;
        case 'UniswapV2Router02' || 'UniswapV2Factory':
            contractABI = UniswapV2Router02;
            break;
        case 'Profiles':
            contractABI = Profiles;
            break;
        case 'Vendor':
            contractABI = Vendor;
            break;
        case 'Crystals':
            contractABI = Crystals;
            break;
        case 'Hero':
            contractABI = Hero;
            break;
        default:
            contractABI = null;
            break;
    }
    return contractABI;
}


export function getLocationFromContractName(contractName) {
    let location = null;
    switch (contractName) {
        case 'Banker':
            location = 'Bank';
            break;
        case 'Bank':
            location = 'Bank';
            break;
        case 'JewelToken':
            location = 'Bank';
            break;
        case 'xJEWEL':
            location = 'Bank';
            break;
        case 'HeroSale':
            location = 'Tavern';
            break;
        case 'HeroSummoningUpgradeable':
            location = 'Portal';
            break;
        case 'MasterGardener':
            location = 'Gardens';
            break;
        case 'MeditationCircle':
            location = 'Portal';
            break;
        case 'QuestCoreV2':
            location = 'Professions';
            break;
        case 'SaleAuction':
            location = 'Tavern';
            break;
        case 'UniswapV2Router02':
            location = 'Marketplace';
            break;
        case 'UniswapV2Factory':
            location = 'Marketplace';
            break;
        case 'Profiles':
            location = 'Profiles';
            break;
        case 'Vendor':
            location = 'Marketplace';
            break;
        case 'Crystals':
            location = 'Portal';
            break;
        case 'Hero':
            location = 'Hero';
            break;
        default:
            location = null;
            break;
    }
    return location;
}