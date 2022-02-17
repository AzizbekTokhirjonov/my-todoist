import React, { useState } from "react";
import { useEffect } from "react";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../redux/actions/actions";


const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleAlert = (type) => {
    setAlert(true);
    type === "success" ? setSuccess(true) : setSuccess(false);
    setTimeout(() => {
      setAlert(false);
    }, 5000);
  };

  const { loading, success:successfulSignUp, error } = useSelector(state => state.userSignUp)
  const dispatch = useDispatch()
   
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(signUpUser({firstName, lastName, email, password}))
  }

  useEffect(()=> {
    if(successfulSignUp){
      handleAlert('success')
    } else if (error){
      setErrorMessage(error)
      handleAlert('error')

    }
  }, [error, successfulSignUp])

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleSubmit}>
        {!alert && <h3>Create Account</h3>}
        <div className="social-container">
          <a href="/" className="social">
            <FaFacebookF />
          </a>
          <a href="/" className="social">
            <FcGoogle />
          </a>
          <a href="/" className="social">
            <FaLinkedin />
          </a>
        </div>
        <span>or use your email for registration</span>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          placeholder="First Name"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="Last Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />

        <button type="submit" disabled={loading ? true: false}>
          Sign Up
        </button>
        { alert && (
          <div className="alert">
            {success ? (
              <div
                className="alert alert-success mt-2 w-100"
                role="alert"
                style={{ fontSize: 10 }}
              >
                Your account has been created. Please login in.
              </div>
            ) : (
              <div
                style={{ fontSize: 10 }}
                className="alert alert-danger mt-2 w-100"
                role="alert"
              >
                {errorMessage}
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SignUp;
