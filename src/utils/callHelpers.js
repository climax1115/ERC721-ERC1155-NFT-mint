import BigNumber from 'bignumber.js'

export const getDecimals = (pid) => {
  if (pid === 27) return 8
  return 18
}

export const nftMint = async (nftContract, amount, nftURI, supply, artist, account) => {
  return nftContract.methods
    .create(artist, supply, nftURI, new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      return tx.transactionHash
    })
}