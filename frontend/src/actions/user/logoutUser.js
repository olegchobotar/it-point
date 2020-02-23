import clearCompany from '../company/clearCompany';

export default () => dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT_USER' });
    dispatch(clearCompany());
}
