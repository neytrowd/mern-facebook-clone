export const LOGIN = 'USER_LOGIN';
export const LOGOUT = 'USER_LOGOUT';

const initial = {
    id: undefined,
    token: undefined
}

const authReducer = (state = initial, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                id: action.payload.id,
                token: action.payload.token
            }
        }
        case LOGOUT: {
            return {
                id: undefined,
                token: undefined
            }
        }

        default:
            return state;
    }
}

export default authReducer;