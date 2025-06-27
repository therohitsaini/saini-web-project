import { FETCH_INFO_API_DATA_SUCCESS } from "./action";

const initialState = {
    inFoData: {}
}

const getInFoDataReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_INFO_API_DATA_SUCCESS:
            return { ...state, inFoData: action.payload }
      
        default:
            return state;
    }

}

export default getInFoDataReducer