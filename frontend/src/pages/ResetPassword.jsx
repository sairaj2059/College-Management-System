import MultilineTextFields from "../components/MultilineTextFields";
import "../resources/css/Login.css";

const ResetPassword = () => {
  return (
    <div className="SignInBox">
      <div className="background"></div>
      <div className="login_wrapper">
        <div
          className="BrandingSignInPageWrapper "
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MultilineTextFields />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
