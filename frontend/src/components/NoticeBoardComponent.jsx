import React from "react";
import { BellRing } from "lucide-react";
import { Paper, Box, Typography, Button, Stack, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserService from "../services/UserService";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const NoticeBoardComponent = () => {
  const navigate = useNavigate();
  const [Notices, setNotices] = useState([]);
  const [Error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const theme = useTheme();

  const getRandomColor = (id) => {
    const colors = [
      "primary",
      "secondary",
      "error",
      "warning",
      "info",
      "success",
    ];
    if (!id) return colors[0];

    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  useEffect(() => {
    const fetchNotices = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          `${UserService.BASE_URL}/admin/getNotices`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setNotices(response.data);
      } catch (err) {
        setError("Failed to fetch notices");
        console.log(err);
      }
    };

    fetchNotices();
  }, [token]);

  return (
    <Paper
      sx={{
        p: 1.5,
        maxWidth: 600,
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
      {Error ? (
        <Typography color="error" variant="body1">
          {Error}
        </Typography>
      ) : (
        <Stack spacing={1}>
          {Notices.map((notice) => (
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
                  {notice.noticeTitle}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(notice.issueDate).toLocaleDateString("en-GB", {
                    dateStyle: "full",
                  })}
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
                ></Box>
                <Box
                  sx={{
                    p: 0.3,
                    backgroundColor: notice.bgColor,
                    borderRadius: 2,
                  }}
                >
                  <BellRing
                    style={{
                      width: 14,
                      height: 14,
                      color: theme.palette[getRandomColor(notice.id)].main,
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          ))}
        </Stack>
      )}
    </Paper>
  );
};

export default NoticeBoardComponent;
