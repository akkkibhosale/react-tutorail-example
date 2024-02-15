import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setUserSession } from '../utils/common';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
// import axios from 'axios';
import '../App.css';

const Login = props => {
  const history = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setEmailError("")
    setPasswordError("")

    // Check if the user has entered both fields correctly
    if ("" === email) {
      setEmailError("Please enter your email")
      return
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email")
      return
    }

    if ("" === password) {
      setPasswordError("Please enter a password")
      return
    }

    if (password.length < 7) {
      setPasswordError("The password must be 8 characters or longer")
      return
    }

    setLoading(true);
    var formdata = new FormData();
    formdata.append("emailID", email);
    formdata.append("userPassword", password);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("http://localhost/Test/rest_api/login.php", requestOptions)
      .then(
        response => response.json()
      )
      .then(
        result => {
          setLoading(false);
          if (result.status == true) {
            setUserSession(result.userData.token, result.userData.fullName);
            history('/userlist');
            // history('/dashboard');
          } else {
            // setError(result.message);
            toast.error(result.message);
          }
        }
      )
      .catch(error => {
        setLoading(false);
        if (error.response.status === 401) setError(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  }

  return <div className={"mainContainer"}>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <div className={"titleContainer"}>
      <div>Login</div>
    </div>
    <br />
    <div className={"inputContainer"}>
      <input
        value={email}
        placeholder="Enter your email here"
        onChange={ev => setEmail(ev.target.value)}
        className={"inputBox"} />
      <label className="errorLabel">{emailError}</label>
    </div>
    <br />
    <div className={"inputContainer"}>
      <input
        value={password}
        type="password"
        placeholder="Enter your password here"
        onChange={ev => setPassword(ev.target.value)}
        className={"inputBox"} />
      <label className="errorLabel">{passwordError}</label>
    </div>
    <br />
    {error && <><div className="alert alert-danger py-1 w-50">{error}</div></>}
    <div className={"inputContainer"}>
      <input
        className={"btn btn-dark"}
        type="button"
        onClick={handleLogin}
        value={loading ? 'Loading...' : 'Log In'} />
    </div>
    <br />
    <a href='/register' className='btn-sm btn btn-info'>Click here to register</a>
  </div>

}

export default Login;