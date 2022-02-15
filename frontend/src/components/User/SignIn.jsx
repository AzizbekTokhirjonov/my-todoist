import React, { useState, useEffect } from "react";
import { FaFacebookF, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Cookies from "universal-cookie";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../../redux/actions";
import { withRouter } from "react-router-dom";
const url = process.env.REACT_APP_DEV_URL;

const SignIn = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const dispatch = useDispatch();
  const login = async () => {
    try {
      const response = await fetch(`${url}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        const { token, user } = data;
        const cookies = new Cookies();
        const today = new Date();
        const tomorrow = new Date(today);
        const expiryDate = new Date(tomorrow.setDate(tomorrow.getDate() + 2));
        cookies.set("jwt", token, { expires: expiryDate });
        cookies.set("user", user);

        dispatch(addUserDetails({ user }));
        history.push("/");
      } else {
        const data = await response.json();
        console.log(data);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          history.push("/login");
        }, 5000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const cookies = new Cookies();
    const cookistExists = cookies.get("jwt");
    if (cookistExists) {
      const user = cookies.get("user");
      dispatch(addUserDetails(user));
      history.push("/");
    }
  }, []);
  return (
    <div className="form-container sign-in-container">
      <form action="#">
        <h1>Sign in</h1>
        <div className="social-container">
          <a href="#" className="social">
            <FaFacebookF />
          </a>
          <a href="#" className="social">
            <FcGoogle />
          </a>
          <a href="#" className="social">
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
        <a href="#">Forgot your password?</a>
        <button
          onClick={(e) => {
            e.preventDefault();
            login();
          }}
        >
          Sign In
        </button>
        {alert && (
          <div
            style={{ fontSize: 10 }}
            class="alert alert-danger mt-2 w-100"
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
