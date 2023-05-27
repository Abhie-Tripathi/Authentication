import { useState, useRef, useContext} from "react";
import { AuthContext } from "../../Auth-context/AuthContext";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const authctx = useContext(AuthContext)
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isloading, setisloading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setisloading(true);
    let url;

    if(isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7344iRGQ2vtTko_2awbK36aPE_nCUw2c";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7344iRGQ2vtTko_2awbK36aPE_nCUw2c";
    }
    fetch(
      url,
      {
        method: "POST",
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      }
    ).then((response) => {
      setisloading(false);
      if (response.ok) {
        return response.json()
        //If the post is successfull
      } else {
        //If the post is unsuccessfull
        return response.json().then((data) => {
          let errorMessage = "Authentication Failed";
          if (data && data.error && data.error.message) errorMessage = data.error.message;
          
        throw new Error(errorMessage);
        });
      }
    })
    .then((data)=>{
      authctx.login(data.idToken)
    })
    .catch((err)=>{
      alert(err.message)
    })
    
  



  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            ref={passwordInputRef}
            type="password"
            id="password"
            required
          />
        </div>
        <div className={classes.actions}>
          {!isloading && (
            <button>{isLogin ? "Log In" : "Create Account"}</button>
          )}
          {isloading && <p>Sending Request</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
