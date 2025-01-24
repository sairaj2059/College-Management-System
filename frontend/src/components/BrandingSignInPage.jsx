import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Logo_image from "../resources/images/Llogo.png";
import { Typography } from "@mui/material";
import axios from'axios';
//import { useDispatch } from "react-redux";


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
        marginTop:2,
        fontFamily: "LoginFont, sans-serif",
      }}
    >
      Login
    </Typography>
  );
}

// function ForgotPasswordLink() {
//   return (
//       <Typography sx={{color:'black',textDecoration: 'none'}}>Forgot password?</Typography>
//   );
// }

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
      src={Logo_image}
      alt="sssihl logo"
      style={{ height: "90px", maxWidth: "100%" }}
    />
  ),
};

const SignIn = async (provider, formData) => {//call api here
  const username = formData.get("username");
  const password = formData.get("password");

  console.log(`Username: ${username}`);
  console.log(`Password: ${password}`);

  try{
    const response = await axios.post('',{
      username,
      password,
    });
    console.log("Sign-in successful:", response.data);
    
  }
  catch(error){
    if(error.response){
      console.log("sign in failed:",error.response.request.status)
    }
    else{
      console.log("Error during sign-in:", error.message);
    }
  }

  
};

export default function BrandingSignInPage() {
  const Theme = useTheme();
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
          forgotPasswordLink: "null",
          signUpLink: "null",
          subtitle: "null",
          rememberMe: "null",
          title: CustomWelcomeText,
        }}
        providers={providers}
      />
    </AppProvider>
    // preview-end
  );
}
