// Import necessary libraries and styles
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  const navigate = useNavigate();
  // State to manage the active tab (login or sign up)
  const [activeTab, setActiveTab] = useState("login");
  const [logInEmail, setLogInEmail] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [userName, setUserName] = useState("");
  const url = process.env.REACT_APP_URL;

  // Function to switch between login and sign up tabs
  const switchTab = (tab) => {
    setActiveTab(tab);
  };

  const submitLogin = (e) => {
    e.preventDefault();
    console.log(signUpEmail)
    if (activeTab === "login") {
      const fetchURL = `${url}/auth/signin`;
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ email: logInEmail, password: logInPassword }),
      };
      fetch(fetchURL, options)
      .then((response) => {
        return response.json()
      }).then(data=>{
        console.log(data)
        navigate('/');
      })
        .catch((error) => {
          console.error(error);
        });
  
    } else {
      const signUpEmailForm = document.getElementById("signupEmail") 
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      if(!signUpEmail.match(regex)){
        const invalidEmail = document.getElementById("invalidEmail") 
        signUpEmailForm.classList.add("warning")
        invalidEmail.classList.remove("hidden")
      }if(userName.trim().length<1) {
        const signUpName = document.getElementById("signupName") 
        const invalidUserName = document.getElementById("invalidUserName") 
        signUpName.classList.add("warning")
        invalidUserName.classList.remove("hidden")
      }if(signUpPassword.trim().length<1) {
        const signupPassword = document.getElementById("signupPassword") 
        const invalidPassword = document.getElementById("invalidPassword") 
        signupPassword.classList.add("warning")
        invalidPassword.classList.remove("hidden")

      }else{

      // this is my sign up function
      const fetchURL = `${url}/users/register`;
      const options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({ email: signUpEmail, password: signUpPassword, name: userName }),
      };
      fetch(fetchURL, options)
        .then((response) => {
          return response.json()
        }).then(data=>{
          console.log(data)
          navigate('/');
        })
        .catch((error) => {
          console.error(error);
        })
      }
    }
  };

  return (
    <div className="container mt-5">
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
                    <label htmlFor="loginEmail" className="form-label" id="">
                      Email address
                    </label>
                    <input type="text" value={logInEmail} onChange={(e) => setLogInEmail(e.target.value)} className="form-control " id="loginEmail" />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">
                      Password
                    </label>
                    <input type="password" value={logInPassword} onChange={(e) => setLogInPassword(e.target.value)} className="form-control" id="loginPassword" />
                  </div>
                  <div className="hidden" id="invalidLogin">The username or password you entered is incorrect</div>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </form>
              </div>
            )}
            {activeTab === "signup" && (
              <div className="tab-pane fade show active">
                {/* Sign up form */}
                <form onSubmit={(e) => submitLogin(e)}>
                  <div className="mb-3">
                    <label htmlFor="signupName" className="form-label">
                      Name
                    </label>
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} className="form-control" id="signupName" />
                    <div className="hidden" id="invalidUserName">Please enter a valid name</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signupEmail" className="form-label">
                      Email address
                    </label>
                    <input type="text" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} className="form-control " id="signupEmail" />
                 <div className="hidden" id="invalidEmail">Please enter a valid email adress</div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signupPassword" className="form-label">
                      Password
                    </label>
                    <input type="password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} className="form-control" id="signupPassword" />
                    <div className="hidden" id="invalidPassword">Please enter a valid Password</div>
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
