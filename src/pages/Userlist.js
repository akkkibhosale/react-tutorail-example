import React from 'react';
// import './App.css';

class Userlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: [],
            loading: false
        }
        this.getUserList = this.getUserList.bind(this);
    }

    getUserList() {
        this.setState({ loading: true });
        fetch('https://reqres.in/api/users')
            .then(res => res.json())
            .then(res => {
                setTimeout(() => {
                    this.setState({ loading: false, userList: res.data });
                }, 2000);
            })
    }

    render() {
        const { userList, loading } = this.state;

        return (
            <div className="container App">
                <button className="btn btn-info float-right" onClick={this.getUserList} disabled={loading}>{loading ? 'Loading...' : 'Get User List'}</button>
                <div className="clearfix"></div>

                <table class="table table-hover mt-3">
                    <thead class="thead-dark">
                        <tr>
                            <th>Avatar</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userList.map(x => <tr>
                            <td><img src={x.avatar} width="50" height="50" className='rounded-circle' /></td>
                            <td>{x.first_name}</td>
                            <td>{x.last_name}</td>
                            <td>{x.email}</td>
                        </tr>)}
                        {userList.length == 0 && <tr>
                            <td className="text-center" colSpan="4">
                                <b>No data found to display.</b>
                            </td>
                        </tr>}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Userlist;