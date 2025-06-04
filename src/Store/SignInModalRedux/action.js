export const FETCH_FULL_NAME = "FETCH_FULL_NAME"
export const FETCH_PROFILE_HEADER = "FETCH_PROFILE_HEADER"



export const fetchFullName = (payload) => {
    return {
        type: FETCH_FULL_NAME,
        payload: payload
    }
};

export const sendUserDetailHeader = (payload) => {
    return {
        type: FETCH_PROFILE_HEADER,
        payload: payload
    }
};
