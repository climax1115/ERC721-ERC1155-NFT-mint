import { combineReducers } from "redux";
import nft from "./nft";
import pool from "./pool";
import music from "./music";

const rootReducer = combineReducers({
    nft,
    pool,
    music
});
export default rootReducer;
