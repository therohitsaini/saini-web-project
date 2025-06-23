import { fetchSeriveData } from "./action"

export const getServiceData = () => {
    return async (dispatch) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/funfact-get-data/${"683e90debc43f5b825e98d4a"}`
            const fetchData = await fetch(url, {
                method: "GET"
            })
            const responseJson = await fetchData.json()
            dispatch(fetchSeriveData(responseJson.data))
        } catch (error) {

            console.log(error)
        }
    }
}