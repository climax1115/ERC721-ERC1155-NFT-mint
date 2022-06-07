export const env = 'testnet';
const TestContracts = {
    "0x61": {
        address: '0x4f11c8bCf64a050306Df4FCb29A490Fcce2F5cBA',
        abi: require("../abis/nft.json")
    },
    "0x13881": {
        address: '0x4f11c8bCf64a050306Df4FCb29A490Fcce2F5cBA',
        abi: require("../abis/nft.json")
    },
    "0x3": {
        address: '0xdEc634fEeEB2E627C39c7827BAd44A7f435435e9',
        abi: require("../abis/nft.json")
    }
}

const MainContracts = {
    "0x38": {
        address: '',
        abi: require("../abis/nft.json")
    },
    "0x89": {
        address: '',
        abi: require("../abis/nft.json")
    },
    "0x1": {
        address: '',
        abi: require("../abis/nft.json")
    }
}

const Contracts = env === 'testnet' ? TestContracts : MainContracts;
export const defaultChainId = env === 'testnet' ? '0x3' : '0x1';
export const supportedNetworks = env === 'testnet' ? [3, 97, 80001] : [1, 56, 137];

export default Contracts;