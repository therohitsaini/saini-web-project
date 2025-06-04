import fullNameReducer from "./SignInModalRedux/reducer"
import userInfo from "./UserDetailsHeader/reducer";

const rootReducer = {

    fullName: fullNameReducer,
    user_info: userInfo
}

export default rootReducer;