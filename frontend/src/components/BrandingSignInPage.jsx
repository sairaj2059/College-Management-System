import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import {
  Link,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Box,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import login_logo from "../resources/images/login_logo.png";
import { Typography } from "@mui/material";
import axios from "axios";
//import { useDispatch } from "react-redux";
import { URL } from "../resources/Constants";
import { useNavigate } from "react-router-dom";

const providers = [{ id: "credentials", name: "Password and Username" }]; //name creates two fields in the ui

function CustomPasswordField() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        name="password"
        size="small"
        required
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              size="small"
            >
              {showPassword ? (
                <Visibility fontSize="inherit" />
              ) : (
                <VisibilityOff fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        startAdornment={
          <InputAdornment position="start">
            <LockIcon sx={{ fontSize: 20 }}></LockIcon>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

const CustomUserName = () => {
  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined">
      <InputLabel size="small" htmlFor="outlined-adornment-username">
        Username
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-username"
        type="text"
        name="username"
        size="small"
        label="Username"
        autoComplete="off"
        required
        startAdornment={
          <InputAdornment position="start">
            <PersonIcon sx={{ fontSize: 20 }} />
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

function CustomWelcomeText() {
  return (
    <Typography
      variant="h4"
      sx={{
        marginBottom: 2,
        marginTop: 2,
        fontFamily: "LoginFont, sans-serif",
      }}
    >
      Login
    </Typography>
  );
}

function ForgotPasswordLink() {
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
      <Link
        href="/reset"
        variant="body2"
        sx={{
          color: "black",
          textDecoration: "none",
          "&:hover": {
            color: "blue",
          },
        }}
      >
        Forgot password?
      </Link>
    </Box>
  );
}

// function SignUpLink() {
//   return (
//     <Link href="/" variant="body2">
//       Create an account
//     </Link>
//   );
// }

const BRANDING = {
  logo: (
    <img
      src={login_logo}
      alt="sssihl logo"
      style={{ height: "90px", maxWidth: "100%" }}
    />
  ),
};

export default function BrandingSignInPage() {
  const Theme = useTheme();
  const Noop = () => null; //rendering no component
  const navigate = useNavigate();

  const SignIn = async (provider, formData) => {
    //call api here
    const username = formData.get("username");
    const password = formData.get("password");

    console.log(`Username: ${username}`);
    console.log(`Password: ${password}`);

    try {
      const response = await axios.post(URL + "/login", {
        username,
        password,
      });
      console.log(response);
      if (response.data.success) {
        console.log("Sairam");
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response) {
        console.log("sign in failed:", error.response.request.status);
      } else {
        console.log("Error during sign-in:", error.message);
      }
    }
  };

  return (
    // preview-start
    <AppProvider branding={BRANDING} theme={Theme}>
      <SignInPage
        signIn={SignIn}
        slotProps={{
          submitButton: {
            onClick: () => console.log("submitted"),
          },
        }}
        slots={{
          emailField: CustomUserName,
          passwordField: CustomPasswordField,
          subtitle: Noop,
          rememberMe: Noop,
          title: CustomWelcomeText,
          forgotPasswordLink: ForgotPasswordLink,
        }}
        providers={providers}
      />
    </AppProvider>
    // preview-end
  );
}
