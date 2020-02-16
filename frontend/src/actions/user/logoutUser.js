
export default () => dispatch => {
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT_USER' });
}
