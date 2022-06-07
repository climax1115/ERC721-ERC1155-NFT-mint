import { useEffect, useState } from 'react'
import useWeb3 from './useWeb3'
import contracts from '../config/constants/constants'

const useContract = (abi, address, contractOptions) => {
  const web3 = useWeb3()
  const [contract, setContract] = useState(null)

  useEffect(() => {
    if (abi && address) {
      setContract(new web3.eth.Contract(abi, address, contractOptions))
    }
  }, [abi, address, contractOptions, web3])

  return contract
}

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useNftContract = (chainId) => {
  const hexChainId = '0x' + (chainId || "").toString(16);
  const abi = contracts[hexChainId] && contracts[hexChainId].abi;
  const address = contracts[hexChainId] && contracts[hexChainId].address;
  return useContract(abi, address)
}


export default useContract;