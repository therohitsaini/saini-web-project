export const FETCH_USER_INFORMATIONS = "FETCH_USER_INFORMATIONS"
export const CHANGE_PATH = "CHANGE_PATH"

export const userInformationCurrent = (payload) => {
    return {
        type: FETCH_USER_INFORMATIONS,
        payload: payload
    }
}

export const changePathAction = (payload) => {
    return {
        type: CHANGE_PATH,
        payload: payload
    }
}