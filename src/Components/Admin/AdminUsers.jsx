
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminUsers.scss';

const AdminUsersComponent = () => {
    const [users, setUsers] = useState([]);
    const API_URL = 'https://backendexpressfinalproject-production.up.railway.app/user/all';

    useEffect(() => {
        axios.get(API_URL)
            .then(res => setUsers(res.data, console.log(res.data)))
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='table'>
            <h2>All registered users on the Database</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role ID</th>

                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.id_role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsersComponent;