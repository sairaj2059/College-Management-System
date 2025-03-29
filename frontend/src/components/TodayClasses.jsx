import React, { useState } from "react";
import { Card, Typography, Stack, IconButton, createTheme, ThemeProvider } from "@mui/material";
import { AccessTime, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#64b5f6",
    },
    background: {
      paper: "#fff",
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
    error: {
      main: "#d32f2f",
    },
    warning: {
      main: "#ed6c02",
    },
    info: {
      main: "#0288d1",
    },
    success: {
      main: "#2e7d32",
    },
  },
});

const classes = [
  { time: "09:00 - 09:45", name: "1Bsc", color: "error" },
  { time: "09:00 - 09:45", name: "2Bsc", color: "warning" },
  { time: "11:30 - 12:15", name: "3Bsc", color: "primary" },
  { time: "01:30 - 02:15", name: "1Msc", color: "info" },
  { time: "01:30 - 02:15", name: "1Msc", color: "success" }
];

const TodayClasses = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const handleNext = () => {
    if (startIndex + visibleCount < classes.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ p: 2, bgcolor: theme.palette.background.paper,height:"20%" }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" color={theme.palette.primary.main}>
            Today's Classes
          </Typography>
          <Stack direction="row" spacing={1}>
            <IconButton onClick={handlePrev} color="primary" disabled={startIndex === 0}>
              <ArrowBackIos fontSize="small" />
            </IconButton>
            <IconButton onClick={handleNext} color="primary" disabled={startIndex + visibleCount >= classes.length}>
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }} flexWrap="wrap">
          {classes.slice(startIndex, startIndex + visibleCount).map((item, index) => (
            <Card key={index} sx={{ p: 2, bgcolor: theme.palette.secondary.light, minWidth: 180 }}>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: theme.palette[item.color].main,
                  color: theme.palette.text.primary,
                  p: 1,
                  borderRadius: 1,
                }}
              >
                <AccessTime fontSize="small" />
                {item.time}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }} color={theme.palette.text.secondary}>
                {item.name}
              </Typography>
            </Card>
          ))}
        </Stack>
      </Card>
    </ThemeProvider>
  );
};

export default TodayClasses;

