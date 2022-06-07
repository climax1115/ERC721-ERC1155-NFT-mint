export const nft_store = (params) => {
    return (dispatch) =>
        dispatch({
            type: 'ALLNFTS',
            payload: params,
        });
};

export const ownNft_store = (params) => {
    return (dispatch) =>
        dispatch({
            type: 'OwnNFT',
            payload: params,
        });
};

export const artist_store = (params) => {
    return (dispatch) =>
        dispatch({
            type: 'ARTISTS',
            payload: params,
        });
};

export const pool_store = (params) => {
    return (dispatch) =>
        dispatch({
            type: 'STOREPOOL',
            payload: params,
        });
};

export const music_store = (params) => {
    return (dispatch) =>
        dispatch({
            type: 'MUSICSTORE',
            payload: params,
        });
};

export const artistInfo_store = (params) => {
    return (dispatch) =>
        dispatch({
            type: 'ARTISTSTORE',
            payload: params,
        });
};
