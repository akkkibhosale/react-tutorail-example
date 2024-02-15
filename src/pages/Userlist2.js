import React, { useState, useEffect } from 'react';
import axios from 'axios'
// import './App.css';

function Userlist2() {
    const [userList, setData] = useState([]);
    const fetchInfo = () => {
        return axios.get('https://reqres.in/api/users').then((res) => setData(res.data.data));
    };

    useEffect(() => {
        fetchInfo();
    }, []);
    return (
        <>
            <div className="container App">
                <div className="clearfix"></div>

                <table className="table table-hover mt-3">
                    <thead className="thead-dark">
                        <tr>
                            <th>Avatar</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map((x, i) =>
                            <tr key={i}>
                                <td><img src={x.avatar} alt="sample" width="50" height="50" className='rounded-circle' /></td>
                                <td>{x.first_name}</td>
                                <td>{x.last_name}</td>
                                <td>{x.email}</td>
                            </tr>)}
                        {userList.length === 0 && <tr>
                            <td className="text-center" colSpan="4">
                                <b>No data found to display.</b>
                            </td>
                        </tr>}
                    </tbody>
                </table>
            </div>
        </>
    );
}
export default Userlist2;