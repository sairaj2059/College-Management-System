import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Link,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Logo_image from '../resources/images/Llogo.png';
import { Typography } from "@mui/material";


const providers = [{ id: "credentials", name: "Password and Username" }];//name creates two fields in the ui

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
                <VisibilityOff fontSize="inherit" />
              ) : (
                <Visibility fontSize="inherit" />
              )}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
    </FormControl>
  );
}

const CustomUserName = () =>{
  return(
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
    />
  </FormControl>);
}

function CustomWelcomeText() {
  return (
    <Typography variant="h4" sx={{ marginBottom: 3, fontFamily: 'LoginFont, sans-serif' }}>
      Log In 
    </Typography>
  );
}

function ForgotPasswordLink() {
  return (
    <Link href="/" variant="body2">
      Forgot password?
    </Link>
  );
}

function SignUpLink() {
  return (
    <Link href="/" variant="body2">
      Create an account
    </Link>
  );
}

const BRANDING = {
  logo: (
    <img
      src={Logo_image}
      alt="sssihl logo"
      style={{ height: '90px', maxWidth: '100%' }}
    />
  ),
};

const signIn = async (provider,formData) => {
  const username = formData.get("username");
  const password = formData.get("password");

  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);

  const promise = new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Sign in with ${provider.id}`);
      resolve();
    }, 500);
  });
  return promise;
};

export default function BrandingSignInPage() {
  const theme = useTheme();
  return (
    // preview-start
    <AppProvider branding={BRANDING} theme={theme}>
      <SignInPage
        signIn={signIn}
        slotProps={{
          submitButton: {
            onClick: () => console.log("submitted"),
          },
        }}
        slots={{
          emailField: CustomUserName,
          passwordField: CustomPasswordField,
          forgotPasswordLink: ForgotPasswordLink,
          signUpLink: SignUpLink,
          subtitle: 'null',
          title:CustomWelcomeText,
        }}
        providers={providers}
      />
      
    </AppProvider>
    // preview-end
  );
}
