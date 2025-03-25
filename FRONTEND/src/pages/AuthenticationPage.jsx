import React, { useState } from "react";
import RegisterComponent from "../components/Login/RegisterComponent";
import LoginComponent from "../components/Login/LoginComponent";
import BrandContainer from "../components/Login/BrandContainer";
import styles from "./AuthenticationPage.module.css";

function AuthenticationPage() {
  const [isLogin, setIsLogin] = useState(true); 

  return (
    <div className={styles.container}>
      <div>
        <BrandContainer />
      </div>
      <div className={styles.authContainer}>
        {isLogin ? (
          <>
            <LoginComponent />
            <p onClick={() => setIsLogin(false)}  className={styles.toggleText}>Don't have an account? <span>Register</span></p>
          </>
        ) : (
          <>
            <RegisterComponent />
            <p onClick={() => setIsLogin(true)} className={styles.toggleText}>Already registered? <span>Login</span></p>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthenticationPage;
