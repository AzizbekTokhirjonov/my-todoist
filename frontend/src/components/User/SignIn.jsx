import React, { useState, useEffect } from "react";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { addUserDetails, loginUser } from "../../redux/actions/actions";
import { withRouter } from "react-router-dom";
import Loader from "../Loader";

const SignIn = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();

  const { loading, error, userDetails } = useSelector((state) => state.user);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    const cookies = new Cookies();
    const cookistExists = cookies.get("jwt");
    const user = cookies.get("user");
    if (cookistExists && user) {
      dispatch(addUserDetails(user));
      history.push("/");
    }
    if (error) {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 5000);
    }
  }, [dispatch, history, error, userDetails]);

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleFormSubmit}>
        <h1>Sign in</h1>
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
        <span>or use your account</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {loading && <Loader />}
        <a href="/">Forgot your password?</a>
        <button type="submit" disabled={loading ? true : false}>
          Sign in
        </button>
        {alert && (
          <div
            style={{ fontSize: 10 }}
            className="alert alert-danger mt-2 w-100"
            role="alert"
          >
            Your email or password is wrong. Please try again.
          </div>
        )}
      </form>
    </div>
  );
};

export default withRouter(SignIn);
