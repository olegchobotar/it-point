const defaultState = {
    company: {},
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_COMPANY':
            return {
                ...state,
                company: action.company,
            };
        default:
            return state;
    }
};
