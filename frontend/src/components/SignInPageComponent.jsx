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
  FormHelperText,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import login_logo from "../resources/images/Llogo.webp";
import { Typography } from "@mui/material";
//import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import { useState } from "react";

const providers = [{ id: "credentials", name: "Password and Username" }]; //name creates two fields in the ui

function CustomPasswordField({
  error,
  setError,
  setPassword,
  password,
  isFocusedP,
  setIsFocusedP,
  setIsFocusedU,
  showPassword,
  setShowPassword
}) {
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleError = () => {
    if (error) setError(false);
  };

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
        onClick={() => {
          setIsFocusedP(true);
          setIsFocusedU(false);
        }}
        onKeyDown={() => {
          setIsFocusedP(true);
          setIsFocusedU(false);
        }}
        value={password}
        autoFocus={isFocusedP}
        onChange={(e) => {
          setPassword(e.target.value);
          handleError();
        }}
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

const CustomUserName = ({
  error,
  setError,
  username,
  setUsername,
  isFocusedU,
  setIsFocusedU,
  setIsFocusedP,
}) => {
  const handleError = () => {
    if (error) setError(false);
  };

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
        onClick={() => {
          setIsFocusedU(true);
          setIsFocusedP(false);
        }}
        onKeyDown={() => {
          setIsFocusedU(true);
          setIsFocusedP(false);
        }}
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          handleError();
        }}
        autoFocus={isFocusedU}
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
        fontSize: "clamp(1.8rem, 2.5vw, 3.5rem)",
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
          fontWeight: "500",
          fontSize: "clamp(0.7rem,1vw,2.5rem)",
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
        height: "24%",
        //maxWidth: "100",
        //maxHeight: "120",
        //aspectRatio:'1/1',
        width: "auto",
      }}
    />
  ),
};

export default function SignInPageComponent({ serverError, setServerError }) {
  const Theme = useTheme();
  const Noop = () => null;
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [isFocusedP, setIsFocusedP] = useState(false);//for handling focus between two fields
  const [isFocusedU, setIsFocusedU] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const SignIn = async (provider, formData) => {
    const { username, password } = Object.fromEntries(formData);

    try {
      const userData = await UserService.login(username, password);

      console.log(userData);

      if (userData.success) {
        localStorage.setItem("token", userData.token);
        localStorage.setItem("role", userData.role);
        localStorage.setItem("username", username);

        if (userData.role === "ADMIN") {
          navigate("/admin");
        } else if (userData.role === "TEACHER") {
          navigate("/teacher");
        } else if (userData.role === "STUDENT") {
          navigate("/student");
        } else {
          alert("Invalid Login Credentials");
        }
      } else {
        console.log("error password");
        setError(true);
      }
    } catch (error) {
      console.error("Login failed", error);
      setServerError(true);
      console.log("sairam");
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
            emailField: () => (
              <CustomUserName
                error={error}
                setError={setError}
                username={username}
                setUsername={setUsername}
                isFocusedU={isFocusedU}
                setIsFocusedU={setIsFocusedU}
                setIsFocusedP={setIsFocusedP}
              />
            ),
            passwordField: () => (
              <CustomPasswordField
                error={error}
                setError={setError}
                password={password}
                setPassword={setPassword}
                isFocusedP={isFocusedP}
                setIsFocusedP={setIsFocusedP}
                setIsFocusedU={setIsFocusedU}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            ),
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
