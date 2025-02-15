import React from "react";
import { Card, CardContent, Typography, Stack, Button, Paper } from "@mui/material";

const lessons = [
  { class: "1Bs.cs", title: "Linked Lists", color: "success" },
  { class: "2Bs.cs", title: "Goodness of Fit", color: "warning" },
  { class: "3Bsc", title: "Solid Principles", color: "info" },
  { class: "1Msc", title: "Network Essitenls", color: "error" },
];

const LessonPlan = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Syllabus / Lesson Plan</Typography>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {lessons.map((lesson, index) => (
            <Paper key={index} sx={{ p: 2, bgcolor: `${lesson.color}.light` }}>
              <Typography variant="subtitle1">{lesson.class}</Typography>
              <Typography variant="body2">{lesson.title}</Typography>
              <Button variant="outlined" size="small" sx={{ mt: 1 }}>
                Reschedule
              </Button>
            </Paper>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LessonPlan;
