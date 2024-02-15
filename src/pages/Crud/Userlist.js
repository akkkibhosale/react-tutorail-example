import React, { useEffect, useState } from "react";
import './crud.css'
import { FaPencilAlt, FaTrashAlt, FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
function Userlist() {
    const count = useSelector((state) => state.counter.value)
    const [userinfo, setUserinfo] = useState(JSON.parse(localStorage.getItem("userinfo")));

    const deleteEvent = (index) => {
        const updateArray = userinfo.filter((_, i) => i !== index);
        setUserinfo(updateArray);
        toast.info('Employee deleted successfully..!')
    }
    useEffect(() => {
        localStorage.setItem('userinfo', JSON.stringify(userinfo));
    }, [userinfo]);


    return (
        <>
            <div className="container">
                <div className="table-wrapper shadow border">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2>Manage <b>Employees</b></h2>
                            </div>
                            <div className="col-sm-6">
                                <a href="/crud/adduser" className="btn btn-success">
                                    <FaUser className="mx-2" />
                                    <span>Add New Employee</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>
                                    {/* <span className="custom-checkbox">
                                        <input type="checkbox" id="selectAll" />
                                        <label for="selectAll"></label>
                                    </span> */}
                                    #
                                </th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th>Phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                count.map((item, i) => (
                                    <tr key={i}>
                                        <td>
                                            {/* <span className="custom-checkbox">
                                                <input type="checkbox" id={"checkbox-" + i} name="options[]" value="1" />
                                                <label for="checkbox1"></label>
                                            </span> */}
                                            {i + 1}
                                        </td>
                                        <td>{item.firstName} {item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>{item.phone}</td>
                                        <td>
                                            <Link to={"/crud/" + i} className="edit"><FaPencilAlt /></Link>
                                            <Link to={""} className="delete mx-3" onClick={() => deleteEvent(i)}><FaTrashAlt /></Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div >
            </div >
        </>
    )
}
export default Userlist;