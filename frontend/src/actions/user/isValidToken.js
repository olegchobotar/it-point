import axios from 'axios';
import logoutUser from './logoutUser';

export default () => dispatch => {
    const token = localStorage.token;
    if (token) {
        axios.get("http://localhost:5000/api/v1/users/profile", {
            headers: {
                'x-access-token': token,
            }
        })
        .catch(() => {
            localStorage.removeItem("token")
            dispatch(logoutUser());
        })
}
}
