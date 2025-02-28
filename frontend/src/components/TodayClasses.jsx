import React, { useState } from "react";
import { Card, CardContent, Typography, Stack, IconButton } from "@mui/material";
import { AccessTime, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const classes = [
  { time: "09:00 - 09:45", name: "1Bsc", color: "error" },
  { time: "09:00 - 09:45", name: "2Bsc", color: "error" },
  { time: "11:30 - 12:15", name: "3Bsc", color: "primary" },
  { time: "01:30 - 02:15", name: "1Msc", color: "secondary" },
  { time: "01:30 - 02:15", name: "1Msc", color: "secondary" }
];

const TodayClasses = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4;

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
    <Card sx={{ p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          Today's Classes
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton onClick={handlePrev}>
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <IconButton onClick={handleNext}>
            <ArrowForwardIos fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mt: 2 }} flexWrap="wrap">
        {classes.slice(startIndex, startIndex + visibleCount).map((item, index) => (
          <Card key={index} sx={{ p: 2, backgroundColor: "#f5f5f5", minWidth: 180 }}>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: (theme) => theme.palette[item.color].main,
                color: "#fff",
                p: 1,
                borderRadius: 1,
              }}
            >
              <AccessTime fontSize="small" />
              {item.time}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              {item.name}
            </Typography>
          </Card>
        ))}
      </Stack>
    </Card>
  );
};

export default TodayClasses;
