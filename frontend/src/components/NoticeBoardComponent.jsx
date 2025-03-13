import React from "react";
import { BellRing } from "lucide-react";
import { Paper, Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const notices = [
  {
    id: 1,
    title: "New Syllabus Instructions",
    date: "11 Mar 2024",
    daysLeft: 20,
    bgColor: "#eff6ff",
    textColor: "#2563eb",
  },
  {
    id: 2,
    title: "World Environment Day Program",
    date: "21 Apr 2024",
    daysLeft: 15,
    bgColor: "#f0fdf4",
    textColor: "#16a34a",
  },
  {
    id: 3,
    title: "Exam Notification!",
    date: "13 Mar 2024",
    daysLeft: 12,
    bgColor: "#fef2f2",
    textColor: "#dc2626",
  },
  {
    id: 4,
    title: "Online Classes Prep",
    date: "24 May 2024",
    daysLeft: 2,
    bgColor: "#ecfeff",
    textColor: "#06b6d4",
  },
  {
    id: 5,
    title: "Exam Time Table Release",
    date: "24 May 2024",
    daysLeft: 6,
    bgColor: "#fefce8",
    textColor: "#ca8a04",
  },
];

const NoticeBoardComponent = () => {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        p: 1.5,
        maxWidth: 360,
        borderRadius: 2,
        boxShadow: 1,
        backgroundColor: "#fff",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
        }}
      >
        <Typography
          variant="h6"
          color="text.primary"
          sx={{ fontSize: 16, fontWeight: 600 }}
        >
          Notice Board
        </Typography>
        <Button
          variant="text"
          onClick={() => navigate("notice-board")}
          sx={{
            color: "primary.main",
            fontSize: 12,
            fontWeight: 500,
            textTransform: "none",
            "&:hover": { color: "primary.dark" },
          }}
        >
          View All
        </Button>
      </Box>

      {/* Notice List */}
      <Stack spacing={1}>
        {notices.map((notice) => (
          <Paper
            key={notice.id}
            elevation={0}
            sx={{
              p: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: 2,
              transition: "background-color 0.15s",
              "&:hover": { backgroundColor: "grey.100" },
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body2"
                color="text.primary"
                fontWeight={500}
                sx={{ fontSize: 13 }}
              >
                {notice.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {notice.date}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Box
                sx={{
                  backgroundColor: notice.bgColor,
                  px: 1,
                  py: 0.2,
                  borderRadius: 50,
                }}
              >
                <Typography
                  variant="caption"
                  fontWeight={500}
                  sx={{ color: notice.textColor, fontSize: 12 }}
                >
                  {notice.daysLeft}d
                </Typography>
              </Box>
              <Box
                sx={{
                  p: 0.3,
                  backgroundColor: notice.bgColor,
                  borderRadius: 2,
                }}
              >
                <BellRing
                  style={{ width: 14, height: 14, color: notice.textColor }}
                />
              </Box>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Paper>
  );
};

export default NoticeBoardComponent;
