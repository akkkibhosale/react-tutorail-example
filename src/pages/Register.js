import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = props => {
    const history = useNavigate();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("")
    const [contact, setContact] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [nameError, setNameError] = useState("")
    const [contactError, setContactError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const handleLogin = () => {
        setError(null);
        setSuccess(null);
        setNameError("")
        setContactError("")
        setEmailError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly

        if ("" === name) {
            setNameError("Please enter a name")
            return
        }
        if ("" === contact) {
            setContactError("Please enter a contact")
            return
        }
        if (!/^\d{10}$/.test(contact)) {
            setContactError("Please enter a valid contact")
            return
        }
        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }
        // eslint-disable-next-line
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
        formdata.append("fullName", name);
        formdata.append("phoneNumber", contact);
        formdata.append("emailID", email);
        formdata.append("userPassword", password);

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch("http://localhost/Test/rest_api/register.php", requestOptions)
            .then(
                response => response.json()
            )
            .then(
                result => {
                    setLoading(false);
                    if (result.status === true) {
                        setSuccess(result.message);
                        setTimeout(() => {
                            history('/login')
                        }, 2000);
                    } else {
                        setError(result.message);
                    }
                }
            )
            .catch(error => {
                setLoading(false);
                if (error.response.status === 401) setError(error.response.data.message);
                else setError("Something went wrong. Please try again later.");
            });
    }

    return (
        <div className={"mainContainer"}>
            <div className={"titleContainer"}>
                <div>Register</div>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    value={name}
                    placeholder="Enter your name here"
                    onChange={ev => setName(ev.target.value)}
                    className={"inputBox"} />
                <label className="errorLabel">{nameError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    value={contact}
                    placeholder="Enter your contact number"
                    type="number"
                    onChange={ev => setContact(ev.target.value)}
                    className={"inputBox"} />
                <label className="errorLabel">{contactError}</label>
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
            {success && <><div className="alert alert-success py-1 w-50">{success}</div></>}
            <div className={"inputContainer"}>
                <input
                    className={"btn btn-dark"}
                    type="button"
                    onClick={handleLogin}
                    value={loading ? 'Loading...' : 'Register'} />
            </div>
            <br />
            <a href='/register' className='btn-sm btn btn-info'>Click here to login</a>
        </div>

    )
}
export default Register
