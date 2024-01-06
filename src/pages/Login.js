// Import necessary libraries and styles
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Login.scss";
import * as jwt_decode from "jwt-decode";
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login(props) {
  // State to manage the active tab (login or sign up)
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const signUpEmailForm = document.getElementById("signupEmail");
  const invalidEmail = document.getElementById("invalidEmail");
  const signUpName = document.getElementById("signupName");
  const invalidUserName = document.getElementById("invalidUserName");
  const signupPassword = document.getElementById("signupPassword");
  const invalidPassword = document.getElementById("invalidPassword");
  const [successMessage, setSuccessMessage] = useState("");
  const url = process.env.REACT_APP_URL;
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordLogin: "",
    emailLogin: "",
    error: "",
    sendNewUser: true,
  });

  const {handleTokenAdd, user} = props;
  const { name, email, password, passwordLogin, emailLogin, error, sendNewUser } = values;
console.log(user)


const showSuccess = () => (
  <div className="alert alert-success" style={{ display: successMessage? "" : "none" }}>
    {successMessage}
  </div>
);

if (user!== null){
 navigate("/")
}


  const checkSignUp = () => {

    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let submit = true;
    if (!email.match(regex)) {
      invalidEmail?.classList.add("warning");
      invalidEmail?.classList.remove("hidden");
      submit = false;
    }
    if (name.trim().length < 1) {

      invalidUserName?.classList.add("warning");
      invalidUserName?.classList.remove("hidden");
      submit = false;
    }
    if (password.trim().length < 1) {
   
      invalidPassword?.classList.add("warning");
      invalidPassword?.classList.remove("hidden");
      submit = false;
    }
    if (!submit) {
      setValues({ ...values, sendNewUser: false });
    }else{
      setValues({ ...values, sendNewUser: true});
      setSuccessMessage("Sign up successful!");
    }
  };
  
  const showError = () => (
    <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
      {error}
    </div>
  );

  // Function to switch between login and sign up tabs
  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    invalidEmail?.classList.remove("warning");
    invalidEmail?.classList.add("hidden");
    invalidUserName?.classList.remove("warning");
    invalidUserName?.classList.add("hidden");
    invalidPassword?.classList.remove("warning");
    invalidPassword?.classList.add("hidden");
    setValues({ ...values, [name]: value, error: "" });
  };

  const submitLogin = (e) => {
    e.preventDefault();
    if (activeTab === "login") {
      const fetchURL = `${url}/auth/signin`;
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ email: values.emailLogin, password: values.passwordLogin }),
      };
      fetch(fetchURL, options)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data)
          if (data.error) {
            let message = data.error
            setValues({ ...values, error: message})
          } else {
            let token = data.token.split(" ")[1]
            handleTokenAdd(token);
            console.log(token);
            try {
              const decodedToken = jwt_decode(token);
              console.log(decodedToken);
            } catch (error){
              console.log("Error decoding token:", error);
            }
            navigate("/");

          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {

      checkSignUp()
      console.log(sendNewUser)
      if (sendNewUser) {
        console.log({ email: values.email, password: values.password, name: values.name })
        const fetchURL = `${url}/users/register`;
        const options = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          body: JSON.stringify({ email: values.email.toLowerCase(), password: values.password, name: values.name }),
        };
        fetch(fetchURL, options)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  return (
    <div className="container mt-5">
         {showError()}
         {showSuccess()}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className={`nav-link ${activeTab === "login" ? "active" : ""}`} onClick={() => switchTab("login")} href="#">
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${activeTab === "signup" ? "active" : ""}`} onClick={() => switchTab("signup")} href="#">
                Sign Up
              </a>
            </li>
          </ul>
          <div className="tab-content mt-2">
            {activeTab === "login" && (
              <div className="tab-pane fade show active">
                {/* Login form */}
                <form onSubmit={(e) => submitLogin(e)}>
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">
                      Email address
                    </label>
                    <input type="text" value={emailLogin} onChange={handleChange("emailLogin")} className="form-control " id="loginEmail" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">
                      Password
                    </label>
                    <input type="password" value={passwordLogin} onChange={handleChange("passwordLogin")} className="form-control" id="loginPassword" />
                  </div>
             
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </form>
              </div>
            )}
            {activeTab === "signup" && (
              <div className="tab-pane fade show active">
                {/* Sign up form */}
                <form onSubmit={(e) => submitLogin(e)} className="form-container">
                  <div className="mb-2">
                    <label htmlFor="signupName" className="form-label">
                      Name
                    </label>
                    <input type="text" value={name} onChange={handleChange("name")} className="form-control" id="signupName" />
                    <div className="hidden" id="invalidUserName">
                      Please enter a valid name
                    </div>
                  </div>
                  <div className="mb-2">
                    <label htmlFor="signupEmail" className="form-label">
                      Email address
                    </label>
                    <input type="text" value={email} onChange={handleChange("email")} className="form-control " id="signupEmail" />
                    <div className="hidden" id="invalidEmail">
                      Please enter a valid email adress
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signupPassword" className="form-label">
                      Password
                    </label>
                    <input type="password" value={password} onChange={handleChange("password")} className="form-control" id="signupPassword" />
                    <div className="hidden" id="invalidPassword">
                      Please enter a valid Password
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
