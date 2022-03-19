import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import "./style.css";

const UserLoginLayout = () => {
  const [signIn, setSignIn] = useState(true);

  return (
    <div className="main" id="user-sign">
      <div
        className={signIn ? "container" : "container right-panel-active"}
        id="container"
      >
        {signIn ? <SignIn /> : <SignUp />}

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                onClick={() => setSignIn(true)}
                id="signIn"
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setSignIn(false)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLoginLayout;
