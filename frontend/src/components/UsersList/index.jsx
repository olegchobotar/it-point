import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './styles.css';

const UsersList = props => {
    const [users, setUsers] = useState([]);
    const { companyId } = props;

    useEffect(() => {
        const fetchApi = async () => {
            const { data } = await axios.get(`http://localhost:5000/api/v1/companies/${companyId}/users`);
            setUsers(data.users);
        };
        fetchApi();
    }, []);

    return (
        <>
            <div className="user-list-header">
                <strong>Users List</strong>
            </div>
            <div className="user-list-wrapper">
                {users.map((user, key) => (
                    <div key={key} className="user-list-item">
                        <p>{user.nickname}</p>
                        <p>{user.email}</p>
                  </div>
              ))}
            </div>
        </>
    );
};

export default UsersList;
