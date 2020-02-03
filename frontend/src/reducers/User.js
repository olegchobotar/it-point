const defaultState = {
    currentUser: {},
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                currentUser: action.user,
            };
        case 'LOGOUT_USER':
            return {
                ...state,
                currentUser: {},
            };
        default:
            return state;
    }
};
