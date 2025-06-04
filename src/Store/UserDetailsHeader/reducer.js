import { CHANGE_PATH, FETCH_USER_INFORMATIONS } from "./action";


const initialState = {
    info: {},
    pathname: null
}

const userInfo = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_INFORMATIONS:
            return { ...state, info: action.payload }
        case CHANGE_PATH:
            return { ...state, pathname: action.payload }

        default:
            return state;
    }

}
export default userInfo;
