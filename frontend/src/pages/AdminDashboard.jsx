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
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import teacherIcon from "../resources/images/teacher.png";
import { useNavigate } from "react-router-dom";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
  

const StrengthCard = ({ Strength, label, icon, gradient, imgSrc,route }) => {
  const navigate = useNavigate();
  return (
    <Card
    variant="soft"
    onClick={() => navigate(route)}
    sx={{
      width: 300,
      height: 180,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      p: 4,
      borderRadius: "16px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      background: gradient,
      position: "relative",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        transform: "scale(1.01)",
        boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)",
      },
    }}
  >
    <Avatar
      sx={{
        mb: 1,
        bgcolor: "rgba(255, 255, 255, 0.2)",
        width: 60,
        height: 60,
        boxShadow: "md",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={label}
          style={{
            width: "70%",
            height: "70%",
            objectFit: "contain",
          }}
        />
      ) : (
        icon
      )}
    </Avatar>

    <Box
      sx={{
        position: "absolute",
        top: 8,
        right: 8,
        background: "rgba(255, 255, 255, 0.3)",
        borderRadius: "50%",
        padding: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <OpenInNewIcon sx={{ fontSize: 18, color: "#2196F3" }} />
    </Box>

    <Typography
      level="h4"
      fontWeight="bold"
      sx={{
        color: "#ffffff",
        fontSize: "1.8rem",
        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.2)",
      }}
    >
      {Strength}
    </Typography>
    <Typography
      level="body2"
      sx={{
        color: "#ffffff",
        fontSize: "1rem",
        opacity: 0.9,
      }}
    >
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
        p: 0.8,
        background: "transparent",
        minHeight: "100vh",
        maxWidth:'100%',
        display: "flex",
        flexDirection: "column",
        gap: 3,
        alignItems: "center",
        overflow: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "26%",
          background: "linear-gradient(135deg, #0D47A1, #42A5F5)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          p: 4,
          borderRadius: "16px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography
          variant="h1"
          fontWeight="bold"
          gutterBottom
          sx={{
            fontSize: "3rem",
            textAlign: "center",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            textShadow: "2px 2px 6px rgba(0, 0, 0, 0.3)",
            color: "whitesmoke",
          }}
        >
          Welcome Back, Administrator
        </Typography>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{
            textAlign: "center",
            opacity: 0.9,
            fontSize: "1.3rem",
            maxWidth: "80%",
            color: "white",
          }}
        >
          Here's what's happening in your institution today.
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ justifyContent: "center", mb: 2 }}>
        <Grid xs="auto">
          <StrengthCard
            Strength={totalStudents}
            label="Total Students"
            icon={<GroupsIcon fontSize="large" />}
            gradient="linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)"
            route="/admin/studentsList"
          />
        </Grid>
        <Grid xs="auto">
          <StrengthCard
            Strength={totalTeachers}
            label="Total Teachers"
            imgSrc={teacherIcon}
            gradient="linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)"
            route="/admin/addTeacher"
          />
        </Grid>
        <Grid xs="auto">
          <StrengthCard
            Strength={4}
            label="Total Courses"
            icon={<AutoStoriesIcon fontSize="large" />}
            gradient="linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)"
             route="/students"
          />
        </Grid>
        <Grid xs="auto">
          <StrengthCard
            Strength={2}
            label="Departments"
            icon={<SchoolIcon fontSize="large" />}
            gradient="linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)"
            route="/students"
          />
        </Grid>
      </Grid>

      <Box
        sx={{
          width: "100%",
          height:'100%',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom:'100px'
        }}
      >
        <NoticeBoardComponent />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
