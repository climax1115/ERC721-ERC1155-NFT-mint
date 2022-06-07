import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { nftMint } from '../utils/callHelpers'
import { useNftContract } from './useContract'

const useMint = (chainId) => {
  const { account } = useWallet()
  const NftContract = useNftContract(chainId)

  const handleMint = useCallback(
    async (amount, nftURI, supply, artist) => {
      if (account) {
        const txHash = await nftMint(NftContract, amount, nftURI, supply, artist, account)
        return txHash;
      } else {
        return {};
      }
    },
    [account, NftContract],
  )

  return { onMint: handleMint }
}

export default useMint