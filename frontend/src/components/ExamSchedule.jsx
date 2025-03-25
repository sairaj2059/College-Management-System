import React from "react";
import { Paper, Typography, Box, Stack } from "@mui/material";
import { CalendarMonth, AccessTime } from "@mui/icons-material";

const exams = [
  {
    id: 1,
    title: "1st Quarterly",
    subject: "Mathematics",
    date: "06 May 2024",
    time: "01:30 - 02:15 PM",
    room: "15",
    daysRemaining: 19,
  },
  {
    id: 2,
    title: "2nd Quarterly",
    subject: "Physics",
    date: "07 May 2024",
    time: "01:30 - 02:15 PM",
    room: "15",
    daysRemaining: 20,
  },
];

const ExamSchedule = () => {
  return (
    <Box sx={{ width: "100%", p: 1 }}>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
      >
        Exams
      </Typography>

      <Stack spacing={1.5}>
        {exams.map((exam) => (
          <Paper
            key={exam.id}
            elevation={2}
            sx={{
              p: 1.5,
              borderRadius: 2,
              border: "1px solid #ddd",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              minHeight: "90px", // Reduced height
            }}
          >
            {/* Exam Title & Badge */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {exam.title}
              </Typography>
              <Box
                sx={{
                  backgroundColor: "error.light",
                  color: "error.dark",
                  fontSize: 11,
                  fontWeight: 600,
                  px: 1.2,
                  py: 0.2,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                ⏳ {exam.daysRemaining} Days More
              </Box>
            </Box>

            {/* Subject & Details */}
            <Typography variant="body2" fontWeight={500} sx={{ mt: 0.3 }}>
              {exam.subject}
            </Typography>

            {/* Date & Time */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.3 }}>
              <CalendarMonth fontSize="small" sx={{ color: "text.secondary" }} />
              <Typography variant="caption" color="text.secondary">
                {exam.date}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.3 }}>
              <AccessTime fontSize="small" sx={{ color: "text.secondary" }} />
              <Typography variant="caption" color="text.secondary">
                {exam.time}
              </Typography>
            </Box>

            {/* Room No. */}
            <Typography
              variant="caption"
              color="primary"
              fontWeight={500}
              sx={{ mt: 0.3, cursor: "pointer" }}
            >
              Room No : {exam.room}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};  
export default ExamSchedule;