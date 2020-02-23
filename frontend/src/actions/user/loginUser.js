import axios from "axios";
import setCompany from '../company/setCompany';

const loginUser = user => ({
    type: 'LOGIN_USER',
    user,
});

export default (email, password) => dispatch =>
    axios.post('http://localhost:5000/api/v1/users/login',
        {email, password})
        .then(({ data: { user, token, company } }) => {
            dispatch(loginUser(user));
            localStorage.setItem('token', token);
            if (company) {
                dispatch(setCompany(company))
            }
        });




