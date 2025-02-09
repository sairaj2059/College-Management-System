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
  FormHelperText ,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import login_logo from "../resources/images/Llogo.png";
import { Typography } from "@mui/material";
import axios from "axios";
//import { useDispatch } from "react-redux";
import { URL } from "../resources/Constants";
import { data, useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import ProtectedRoute from "./ProtectedRoute";
import { useState,useEffect } from "react";

const providers = [{ id: "credentials", name: "Password and Username" }]; //name creates two fields in the ui

function CustomPasswordField({error,setError}) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleError = () =>{
    if(error == true)
      setError(false)
  }

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined" error={error}>
      <InputLabel size="small" htmlFor="outlined-adornment-password">
        Password
      </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
        name="password"
        size="small"
        required
        onClick={handleError}
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
      {error && <FormHelperText>Incorrect username or password</FormHelperText>}
    </FormControl>
  );
}

const CustomUserName = ({error,setError}) => {

  const handleError = () =>{
    if(error == true )
      setError(false)
  }

  return (
    <FormControl sx={{ my: 2 }} fullWidth variant="outlined" error={error}>
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
        onClick={handleError}
        autoFocus = {!error}
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
      //variant="h4"
      sx={{
        marginBottom: 2,
        marginTop: 2,
        fontFamily: "LoginFont, sans-serif",
        fontSize: 'clamp(1.8rem, 2.5vw, 3.5rem)',
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
        sx={{
          color: "black",
          textDecoration: "none",
          "&:hover": {
            color: "blue",
          },
          fontWeight:'500',
          fontSize:'clamp(0.7rem,1vw,2.5rem)',
        }}
      >
        Forgot password?
      </Link>
    </Box>
  );
}

const BRANDING = {
  logo: (
    <img
      src={login_logo}
      alt="sssihl logo"
      style={{
        height: "14vh",
        maxWidth: "100%",
        maxHeight: "120px",
        width: "auto",
      }}
    />
  ),
};

export default function SignInPageComponent() {
  const Theme = useTheme();
  const Noop = () => null;
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const SignIn = async (provider, formData) => {
    const username = formData.get("username");
    const password = formData.get("password");

    try {
      const userData = await UserService.login(username, password);

      console.log(userData);

      if (userData.success) {
        localStorage.setItem('token', userData.token);
        localStorage.setItem('role', userData.role);

        if (userData.role === "ADMIN") {
          navigate("/admin");
        }else if (userData.role === "TEACHER") {
          navigate("/teacher");
        }else if(userData.role === "STUDENT"){
          navigate("/student");
        }else{
          alert("Invalid Login Credentials");
        }
      }
      else {
        setError(true);
      }

    } catch (error) {
      console.error("Login failed", error);
      //alert("Something went wrong!");
      setError(true);
    }
  };

  return (
    <AppProvider branding={BRANDING} theme={Theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          minWidth: "300px",
          width: "30vw",
          maxWidth: "500px",
        }}
      >
        <SignInPage
          signIn={SignIn}

          slots={{
            emailField: () => <CustomUserName error={error} setError={setError}/>,
            passwordField: () => <CustomPasswordField error={error} setError={setError}/>,
            subtitle: Noop,
            rememberMe: Noop,
            title: CustomWelcomeText,
            forgotPasswordLink: ForgotPasswordLink,
          }}
          providers={providers}
        />
        
      </Box>
    </AppProvider>
  );
}
