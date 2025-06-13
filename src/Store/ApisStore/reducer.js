import { FETCH_API_DATA_SUCCESS, FETCH_ERROR } from "./action";


const initialState = {
    headerData: {}
}

const getHeaderDataReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_API_DATA_SUCCESS:
            return { ...state, headerData: action.payload }
        case FETCH_ERROR:
            return { ...state, headerData: action.payload }

        default:
            return state;
    }

}

export default getHeaderDataReducer