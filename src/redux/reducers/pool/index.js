const Config = (
    state,
    action
) => {
    switch (action.type) {
        case 'STOREPOOL': {
            return { ...state, pool: action.payload };
        }
        default: {
            return { ...state };
        }
    }
};
export default Config;
