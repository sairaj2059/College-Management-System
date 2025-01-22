import React from "react";
import "../resources/css/Login.css";
import BrandingSignInPage from "../components/BrandingSignInPage";
import AlignItemsList from "../components/AlignItemsList";

const Login = () => {
  return (
    <div className="SignInBox">
      <div className="background"></div>
      <div className="login_wrapper">
        <div className="BrandingSignInPageWrapper">
          <BrandingSignInPage />
        </div>
        <div className="Announcements">
          <AlignItemsList />
        </div>
      </div>
    </div>
  );
};

export default Login;
