export const FETCH_API_DATA_SUCCESS = "FETCH_API_DATA"
export const FETCH_ERROR = "FETCH_ERROR"

export const fetchHeaderData = (payload) => {
    return {
        type: FETCH_API_DATA_SUCCESS,
        payload: payload
    }
}


export const handleError = (payload) => {
    return {
        type: FETCH_ERROR,
        payload: payload
    }
}

