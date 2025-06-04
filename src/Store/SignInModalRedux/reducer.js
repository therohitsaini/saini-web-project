import { FETCH_FULL_NAME, FETCH_PROFILE_HEADER } from "./action"


const initialState = {
    data: {}
}


const fullNameReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FULL_NAME:
            return { ...state, data: action.payload }

        case FETCH_PROFILE_HEADER:
            return { ...state, data: action.payload }


        default:
            return state;

    }
}

export default fullNameReducer;


