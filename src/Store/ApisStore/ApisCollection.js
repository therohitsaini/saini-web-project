
import { fetchHeaderData } from "./action"


export const getHeaderData = ( userId ) => {
    return async (dispatch) => {
        try {
            const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/get-header-data/${userId}`
            const fetchData = await fetch(url, {
                method: "GET"
            })
            const responseJson = await fetchData.json()
            dispatch(fetchHeaderData(responseJson.userData))
        } catch (error) {

            console.log(error)
        }
    }
}

// export const updateHeaderData = () => {
//     return async (dispatch) => {
//         try {
//             const url = `${import.meta.env.VITE_BACK_END_URL}admin-api/header-top-bar/${"683e90debc43f5b825e98d4a"}`
//             const fetchData = await fetch(url, {
//                 method: "PUT"
//             })
//             const responseJson = await fetchData.json()
//             console.log(responseJson)
//             dispatch(FETCH_API_DATA_SUCCESS(responseJson))

//         } catch (error) {
//             // dispatch(FETCH_ERROR(error.message))
//             console.log(error)
//         }
//     }
// }