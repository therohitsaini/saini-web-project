export const FETCH_INFO_API_DATA_SUCCESS = "FETCH_INFO_API_DATA_SUCCESS"
export const fetchInFoData = (payload) => {
    return {
        type: FETCH_INFO_API_DATA_SUCCESS,
        payload: payload
    }
}