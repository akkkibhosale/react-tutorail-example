import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, removeUserSession } from '../utils/common';
import '../css/dashboard.css'
const Dashboard = props => {
  const history = useNavigate();
  const user = getUser();

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    history('/login');
  }

  // return (
  // <div>
  //   Welcome {user}!<br /><br />
  //   <input type="button" onClick={handleLogout} value="Logout" />
  // </div>
  // );
  return (
    <>
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-3">Welcome {user}</h1>
          <input className="btn btn-lg btn-success" type="button" onClick={handleLogout} value="Logout" />
          <p className="lead">Cras justo odio, dapibus ac facilisis in. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
          {/* <p><a className="btn btn-lg btn-success" href="#" role="button">Welcome</a></p> */}

        </div>

        <div className="row marketing">
          <div className="col-lg-6">
            <h4>Subheading</h4>
            <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>

            <h4>Subheading</h4>
            <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>

            <h4>Subheading</h4>
            <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
          </div>

          <div className="col-lg-6">
            <h4>Subheading</h4>
            <p>Donec id elit non mi porta gravida at eget metus. Maecenas faucibus mollis interdum.</p>

            <h4>Subheading</h4>
            <p>Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis consectetur purus sit amet fermentum.</p>

            <h4>Subheading</h4>
            <p>Maecenas sed diam eget risus varius blandit sit amet non magna.</p>
          </div>
        </div>
      </div ></>
  )
}

export default Dashboard;