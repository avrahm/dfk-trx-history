
import Bank from '../consts/DFK-contracts/abi/Bank.json';
import ERC20 from '../consts/DFK-contracts/abi/ERC20.json';
import ERC721 from '../consts/DFK-contracts/abi/ERC721.json';
import HeroSale from '../consts/DFK-contracts/abi/HeroSale.json';
import HeroSummoningUpgradeable from '../consts/DFK-contracts/abi/HeroSummoningUpgradeable.json';
import MasterGardener from '../consts/DFK-contracts/abi/MasterGardener.json';
import MeditationCircles from '../consts/DFK-contracts/abi/MeditationCircle.json';
import QuestCore from '../consts/DFK-contracts/abi/QuestCoreV2.json';
import SaleAuction from '../consts/DFK-contracts/abi/SaleAuction.json';
import UniswapV2Router02 from '../consts/DFK-contracts/abi/UniswapV2Factory.json';
import Profiles from '../consts/DFK-contracts/abi/Profiles.json';
import Hero from '../consts/DFK-contracts/abi/Hero.json';
import Crystals from '../consts/DFK-contracts/abi/Crystals.json';

function isQuest(contractName) {
    const questCoreArr =
        ['QuestCoreV2', 'Ambertaffy', 'Darkweed', 'Goldvein', 'Ragweed', 'Redleaf', 'Rockroot', 'SwiftThistle', 'Bloater', 'Ironscale', 'Lanterneye', 'Redgill', 'Sailfish', 'Shimmerskin', 'Silverfin', 'ShvasRune', 'BluePetEgg', 'GreyPetEgg', 'GoldenEgg', 'GaiasTears'];

    if (questCoreArr.includes(contractName)) {
        return true;
    } else {
        return false;
    }
}

function getABIFromContractName(contractName) {
    const contract = isQuest(contractName) ? 'QuestCoreV2' : contractName;

    let contractABI = null;
    switch (contract) {
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
        case 'MeditationCircles':
            contractABI = MeditationCircles;
            break;
        case 'QuestCoreV2':
            contractABI = QuestCore;
            break;
        case 'SaleAuction':
            contractABI = SaleAuction;
            break;
        case 'UniswapV2Router02':
            contractABI = UniswapV2Router02;
            break;
        case 'Profiles':
            contractABI = Profiles;
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

export default getABIFromContractName;