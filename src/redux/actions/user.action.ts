export const userTypes = {
    USER_UPDATE: "USER_UPDATE",
    USER_LOGOUT: "USER_LOGOUT"
};

export const userUpdate = (
    firstname: string,
    lastname: string,
    role: string,
    id: string,
    email: string,
    username: string,
    loggedIn: boolean
) => (dispatch: any) => {
    dispatch({
        payload: {
            firstname,
            lastname,
            role,
            id,
            email,
            username,
            loggedIn
        },
        type: userTypes.USER_UPDATE
    });
};


export const userLogout = () => (dispatch: any) => {
    dispatch({
        payload: {},
        type: userTypes.USER_LOGOUT
    });
};