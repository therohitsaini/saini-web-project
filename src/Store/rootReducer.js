// import getHeaderDataReducer from "./ApisStore/reducer";
// import fullNameReducer from "./SignInModalRedux/reducer"
// import userInfo from "./UserDetailsHeader/reducer";

// const rootReducer = {

//     fullName: fullNameReducer,
//     user_info: userInfo,
//     getHeaderDataReducer_: getHeaderDataReducer
// }

// export default rootReducer;



import { combineReducers } from "redux";
import getHeaderDataReducer from "./ApisStore/reducer";
import fullNameReducer from "./SignInModalRedux/reducer";
import userInfo from "./UserDetailsHeader/reducer";

const rootReducer = combineReducers({
    fullName: fullNameReducer,
    user_info: userInfo,
    getHeaderDataReducer_: getHeaderDataReducer,
});

export default rootReducer;
