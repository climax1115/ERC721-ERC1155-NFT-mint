import { useEffect } from 'react'
import { getArtists } from '../utils/callHelpers'
import { useNftContract } from './useContract'
import { useDispatch, useSelector } from 'react-redux'
import { artist_store } from '../redux/actions'

export const useArtists = () => {
    const NftContract = useNftContract()
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const artists = await getArtists(NftContract);
            dispatch(artist_store(artists))
        })()
    }, [dispatch, NftContract])

    const { artists } = useSelector((store) => store.nft);
    return artists;
}