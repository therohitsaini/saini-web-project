import { combineReducers } from "redux";
import getHeaderDataReducer from "./ApisStore/reducer";
import fullNameReducer from "./SignInModalRedux/reducer";
import userInfo from "./UserDetailsHeader/reducer";
import getSerivceSectionReducer from "./ServiceSectionRedux/reducer";

const rootReducer = combineReducers({

    fullName: fullNameReducer,
    user_info: userInfo,
    getHeaderDataReducer_: getHeaderDataReducer,
    getSerivceSectionReducer_: getSerivceSectionReducer

});

export default rootReducer;
