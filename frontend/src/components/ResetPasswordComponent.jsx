import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography, InputAdornment } from "@mui/material";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined";
import "../resources/css/multiline.css";

const Root = styled("div")(({ theme }) => ({
  width: "60%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(1),
  },
}));

export default function ResetPasswordComponent() {
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
        minHeight: "250px",
        boxShadow: "5px 5px 8px rgba(0, 0, 0, 0.5)",
        padding: "2rem 1.8rem 1.9rem 1.8rem",
        gap: "1rem",
      }}
      noValidate
      autoComplete="off"
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
            variant="h9"
            sx={{
              color: "rgb(62, 62, 62)",
              fontSize: "clamp(0.75rem, 1.2vw, 1.5rem)",
            }}
          >
            Enter your email or username
          </Typography>
        </div>

        <div>
          <TextField
            id="Rst_email"
            label="Email id"
            placeholder="Email id"
            size="small"
            type="email"
            required
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
          <Divider>OR CONTINUE WITH</Divider>
        </Root>
        <div>
          <TextField
            id="Rst_username"
            label="Username"
            placeholder="Username"
            size="small"
            type="text"
            required
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
        variant="contained"
        size="medium"
        sx={{ width: "22vw", borderRadius: "16px", marginBottom: "0.8em" }}
      >
        Submit
      </Button>
    </Box>
  );
}
