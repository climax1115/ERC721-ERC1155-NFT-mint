const Config = (
    state,
    action
) => {
    switch (action.type) {
        case 'ALLNFTS': {
            return { ...state, nfts: action.payload };
        }
        case 'OwnNFT': {
            return { ...state, ownNfts: action.payload };
        }
        case 'ARTISTS': {
            return { ...state, artists: action.payload };
        }
        default: {
            return { ...state };
        }
    }
};
export default Config;
