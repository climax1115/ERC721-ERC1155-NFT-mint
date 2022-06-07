const Config = (
    state,
    action
) => {
    switch (action.type) {
        case 'MUSICSTORE': {
            return { ...state, musics: action.payload };
        }
        case 'ARTISTSTORE': {
            return { ...state, artist_list: action.payload };
        }
        default: {
            return { ...state };
        }
    }
};
export default Config;
