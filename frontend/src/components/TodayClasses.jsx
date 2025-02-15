import React from "react";
import { Card, CardContent, Typography, Stack, Chip, IconButton } from "@mui/material";
import { AccessTime, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const classes = [
  { time: "09:00 - 09:45", name: "1Bsc", color: "error" },
  { time: "09:00 - 09:45", name: "2Bsc", color: "error" },
  { time: "11:30 - 12:15", name: "3Bsc", color: "primary" },
  { time: "01:30 - 02:15", name: "1Msc", color: "secondary" },
];

const TodayClasses = () => {
  return (
    <Card sx={{ p: 2 }}>
      {/* Header with Navigation Arrows */}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" fontWeight="bold">
          Today's Class
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton>
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <IconButton>
            <ArrowForwardIos fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      {/* Class List */}
      <Stack direction="row" spacing={2} sx={{ mt: 2 }} flexWrap="wrap">
        {classes.map((item, index) => (
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
              {item.name} {/* Fixed Incorrect Property */}
            </Typography>
          </Card>
        ))}
      </Stack>
    </Card>
  );
};

export default TodayClasses;
