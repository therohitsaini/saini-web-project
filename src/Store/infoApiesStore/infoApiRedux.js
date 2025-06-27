import { fetchInFoData } from "./action"



export const getInfoData = async (userId) => {
    return async (dispatch) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}api/info/get/info/${"685ce1733b28b00f29622728"}`
            const fatchData = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            })
            const jsonResponse = await fatchData.json()
            // if (fatchData.ok) {
            dispatch(fetchInFoData(responseJson.getInfoData))
            // }
        } catch (error) {
            console.log(error)
        }
    }
}