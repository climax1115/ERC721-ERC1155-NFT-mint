import random from 'lodash/random'

// Array of available nodes to connect to
const nodes = ['https://bsc-dataseed.binance.org/', 'https://bsc-dataseed1.defibit.io', 'https://bsc-dataseed.binance.org']
// const nodes = ['https://data-seed-prebsc-1-s1.binance.org:8545']

const getRpcUrl = (networkId) => {
    if (networkId === '0x38') {
        const randomIndex = random(0, nodes.length - 1)
        return nodes[randomIndex]
    } else if (networkId === '0x89') {
        return 'https://rpc-mainnet.matic.quiknode.pro';
    } else if (networkId === '0x1') {
        return 'https://eth-rpc.gateway.pokt.network';
    } else if (networkId === '0x61') {
        return 'https://data-seed-prebsc-2-s2.binance.org:8545';
    } else if (networkId === '0x13881') {
        return 'https://matic-mumbai.chainstacklabs.com';
    } else if (networkId === '0x3') {
        return 'https://ropsten.infura.io/v3/d2225a81cdfa45a79a4b2135ba0cc3d8';
    }
}

export default getRpcUrl
