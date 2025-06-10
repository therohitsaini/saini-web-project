import { FETCH_API_DATA_SUCCESS, FETCH_ERROR } from "./action"


export const getHeaderData = () => {
    return async (dispatch) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/header-top-bar/${""}`
            const fetchData = await fetch(url, {
                method: "GET"
            })
            const responseJson = await fetchData.json()
            console.log(responseJson)
            dispatch(FETCH_API_DATA_SUCCESS(responseJson))

        } catch (error) {
            dispatch(FETCH_ERROR(error.message))
        }
    }
}

export const updateHeaderData = () => {
    return async (dispatch) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/header-top-bar/${""}`
            const fetchData = await fetch(url, {
                method: "GET"
            })
            const responseJson = await fetchData.json()
            console.log(responseJson)
            dispatch(FETCH_API_DATA_SUCCESS(responseJson))

        } catch (error) {
            dispatch(FETCH_ERROR(error.message))
        }
    }
}