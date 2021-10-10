export const LOAD = 'LOAD_USERS';
export const CHANGE = 'CHANGE_PERMISSIONS';

const initial = {
    users: []
}

const usersReducer = (state = initial, action) => {
    switch (action.type) {
        case LOAD: {
            return {
                ...state,
                users: [...action.payload]
            }
        }

        case CHANGE: {
            let users = [...state.users];
            let index = users.findIndex(user => user._id === action.payload._id);
            users[index] = action.payload;
            return {
                ...state, users
            }
        }

        default:
            return state;
    }
}

export default usersReducer;