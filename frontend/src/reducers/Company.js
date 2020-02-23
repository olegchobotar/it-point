const defaultState = {
    company: null,
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_COMPANY':
            return {
                ...state,
                company: action.company,
            };
        case 'CLEAR_COMPANY':
            return defaultState;
        default:
            return state;
    }
};
