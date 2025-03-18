import React from "react";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import Grid from "@mui/joy/Grid";
import Avatar from "@mui/joy/Avatar";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import NoticeBoardComponent from "../components/NoticeBoardComponent";
import "../resources/css/AdminDashboard.css";

const StrengthCard = ({ Strength, label, icon }) => {
  return (
    <Card
      variant="soft"
      sx={{
        width: "250px", 
        height: "170px", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        p: 4,
        borderRadius: "12px",
        boxShadow: "md",
        background: "linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)",
      }}
    >
      <Avatar
        sx={{
          mb: 1,
          bgcolor: "secondary.main",
          width: 48,
          height: 48,
          boxShadow: "md",
        }}
      >
        {icon}
      </Avatar>
      <Typography level="h4" fontWeight="bold" sx={{ color: "#3d3d3d", fontSize: "1.5rem" }}>
        {Strength}
      </Typography>
      <Typography level="body2" sx={{ color: "#5a5a5a" }}>
        {label}
      </Typography>
    </Card>
  );
};

const AdminDashboard = () => {
  const totalStudents = 150;
  const totalTeachers = 120;

  return (
    <Box
      className="DashboardContainer"
      sx={{
        p: 3,
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
      }}
    >
      <Grid container spacing={2} sx={{ mb: 3, justifyContent: "center" }}>
        <Grid xs="auto">
          <StrengthCard
            Strength={totalStudents}
            label="Total Students"
            icon={<GroupsIcon fontSize="large" />}
          />
        </Grid>
        <Grid xs="auto">
          <StrengthCard
            Strength={totalTeachers}
            label="Total Teachers"
            icon={<SchoolIcon fontSize="large" />}
          />
        </Grid>
      </Grid>

   
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <NoticeBoardComponent />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
