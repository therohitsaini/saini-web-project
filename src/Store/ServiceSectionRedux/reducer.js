import { FETCH_SERIVCE_API_DATA_SUCCESS } from "./action";



const initialState = {
    funfactSection: {}
}

const getSerivceSectionReducer = (state = initialState, action) => {
    switch (action.type) {

        case FETCH_SERIVCE_API_DATA_SUCCESS:
            return { ...state, funfactSection: action.payload }
        // case FETCH_ERROR:
        //     return { ...state, serivceSection: action.payload }

        default:
            return state;
    }

}

export default getSerivceSectionReducer