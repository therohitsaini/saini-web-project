import {
    UPLOAD_DATA_REQUEST,
    UPLOAD_DATA_SUCCESS,
    UPLOAD_DATA_FAILURE,
    FETCH_UPLOADED_DATA_SUCCESS,
    FETCH_UPLOADED_DATA_FAILURE,
    DELETE_UPLOADED_DATA_SUCCESS,
    DELETE_UPLOADED_DATA_FAILURE
} from './action'

const initialState = {
    uploadedData: [],
    loading: false,
    error: null,
    success: false,
    uploadProgress: 0
}

const dataUploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_DATA_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                success: false,
                uploadProgress: 0
            }

        case UPLOAD_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                success: true,
                error: null,
                uploadProgress: 100,
                uploadedData: [...state.uploadedData, action.payload]
            }

        case UPLOAD_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                success: false,
                error: action.payload,
                uploadProgress: 0
            }

        case FETCH_UPLOADED_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                uploadedData: action.payload,
                error: null
            }

        case FETCH_UPLOADED_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case DELETE_UPLOADED_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                uploadedData: state.uploadedData.filter(item => item.id !== action.payload),
                error: null
            }

        case DELETE_UPLOADED_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

export default dataUploadReducer 