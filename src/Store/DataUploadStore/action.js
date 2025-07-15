export const UPLOAD_DATA_REQUEST = "UPLOAD_DATA_REQUEST"
export const UPLOAD_DATA_SUCCESS = "UPLOAD_DATA_SUCCESS"
export const UPLOAD_DATA_FAILURE = "UPLOAD_DATA_FAILURE"
export const FETCH_UPLOADED_DATA_SUCCESS = "FETCH_UPLOADED_DATA_SUCCESS"
export const FETCH_UPLOADED_DATA_FAILURE = "FETCH_UPLOADED_DATA_FAILURE"
export const DELETE_UPLOADED_DATA_SUCCESS = "DELETE_UPLOADED_DATA_SUCCESS"
export const DELETE_UPLOADED_DATA_FAILURE = "DELETE_UPLOADED_DATA_FAILURE"

export const uploadDataRequest = () => {
    return {
        type: UPLOAD_DATA_REQUEST
    }
}

export const uploadDataSuccess = (payload) => {
    return {
        type: UPLOAD_DATA_SUCCESS,
        payload: payload
    }
}

export const uploadDataFailure = (payload) => {
    return {
        type: UPLOAD_DATA_FAILURE,
        payload: payload
    }
}

export const fetchUploadedDataSuccess = (payload) => {
    return {
        type: FETCH_UPLOADED_DATA_SUCCESS,
        payload: payload
    }
}

export const fetchUploadedDataFailure = (payload) => {
    return {
        type: FETCH_UPLOADED_DATA_FAILURE,
        payload: payload
    }
}

export const deleteUploadedDataSuccess = (payload) => {
    return {
        type: DELETE_UPLOADED_DATA_SUCCESS,
        payload: payload
    }
}

export const deleteUploadedDataFailure = (payload) => {
    return {
        type: DELETE_UPLOADED_DATA_FAILURE,
        payload: payload
    }
} 