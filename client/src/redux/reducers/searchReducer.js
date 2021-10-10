export const FILTER = 'FILTER_USERS';

const initial = {
    name: '',
    surname: '',
    university: '',
    country: '',
    city: '',
}

const searchReducer = (state = initial, action) => {
    switch (action.type) {
        case FILTER: {
            return {
                ...state,
                ...action.payload
            }
        }

        default:
            return state;
    }
}

export default searchReducer;

