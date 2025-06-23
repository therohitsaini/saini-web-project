export const FETCH_SERIVCE_API_DATA_SUCCESS = "FETCH_API_DATA"
// export const FETCH_ERROR = "FETCH_ERROR"

export const fetchSeriveData = (payload) => {
    return {
        type: FETCH_SERIVCE_API_DATA_SUCCESS,
        payload: payload
    }
}


// export const handleError = (payload) => {
//     return {
//         type: FETCH_ERROR,
//         payload: payload
//     }
// }