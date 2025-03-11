import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography, InputAdornment } from "@mui/material";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import "../resources/css/multiline.css";
import Alert from "@mui/material/Alert";
import { useState } from "react";

const Root = styled("div")(({ theme }) => ({
  width: "60%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(1),
  },
}));

export default function ResetPasswordComponent() {
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const email = event.target.elements.email.value;
    const username = event.target.elements.username.value;

    if ((email && username) || (!email && !username)) {
      setErrorMessage("Please enter either your email or username, not both.");
    } else {
      alert(`Email: ${email}, Username: ${username}`);
      setErrorMessage("");
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "22vw" },
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        width: "26vw",
        height: "40vh",
        borderRadius: "2%",
        minWidth: "150px",
        minHeight: "50vh",
        boxShadow: "5px 5px 8px rgba(0, 0, 0, 0.5)",
        padding:'2%'
      }}
      autoComplete="off"
      onSubmit={onSubmitHandler}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: "2",
        }}
      >
        <div
          style={{
            fontFamily: "Roboto,sansSerif",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "1em",
            marginBottom: "0.5em",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bolder",
              fontSize: "clamp(1.5rem, 2.2vw, 2.6rem)",
            }}
          >
            Reset Password
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "rgb(62, 62, 62)",
              fontSize: "clamp(0.65rem, 1.1vw, 1.2rem)",
            }}
          >
            {errorMessage ? (
              <Alert
                severity="error"
                sx={{
                  width: "100%",
                  maxWidth: "250px",
                  fontSize: "0.8rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "10px",
                  height: "75%",
                }}
              >
                {errorMessage}
              </Alert>
            ):"Enter your email or username"}
          </Typography>
        </div>

        <div>
          <TextField
            name="email"
            label="Email id"
            placeholder="Email id"
            size="small"
            type="email"
            slotProps={{
              inputLabel: {
                required: false,
              },
              input: {
                style: {
                  borderRadius: "16px",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineOutlinedIcon sx={{ fontSize: 20 }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>
        <Root>
          <Divider />
          <Typography
            variant="body2"
            sx={{
              whiteSpace: "nowrap",
              color: "red",
              fontSize: { xs: "10px", sm: "12px", md: "14px" },
            }}
          >
            OR CONTINUE WITH
          </Typography>
          <Divider />
        </Root>
        <div>
          <TextField
            name="username"
            label="Username"
            placeholder="Username"
            size="small"
            type="text"
            slotProps={{
              inputLabel: {
                required: false,
              },
              input: {
                style: {
                  borderRadius: "16px",
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineOutlinedIcon sx={{ fontSize: 20 }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </div>
      </Box>
      <Button
        type="submit"
        variant="contained"
        size="medium"
        sx={{ width: "22vw", borderRadius: "16px", marginBottom: "0.8em" }}
      >
        Submit
      </Button>
    </Box>
  );
}
