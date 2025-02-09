import React, { useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import profileImage from "../resources/images/224206.jpg";
import { UserData } from "../resources/DataList";
import Sidebar from "../components/Sidebar";
import { CssVarsProvider } from "@mui/joy/styles";
import sssihlLogo from "../resources/images/Llogo.png";
import "../resources/css/studentdashboard.css";

import IconButton from "@mui/joy/IconButton";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
import CalendarTodayRounded from "@mui/icons-material/CalendarTodayRounded";

import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import ListItemContent from "@mui/joy/ListItemContent";
import Avatar from "@mui/joy/Avatar";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { BarChart, legendClasses } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";

const otherProps = {
  width: 400,
  height: 200,
  sx: {
    [`.${legendClasses.root}`]: {
      transform: "translate(20px, 0)",
    },
  },
};

const data = [
  { team: "Amber Ants", rank: 3, points: 31 },
  { team: "Eagle Warriors", rank: 1, points: 50 },
  { team: "Elephant Trunk", rank: 4, points: 18 },
  { team: "Jaguars", rank: 2, points: 37 },
  { team: "Smooth Pandas", rank: 5, points: 6 },
];
function UserCard() {
  return (
    <Box
      sx={{
        width: "30vw",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
        mt: "2%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          display: "block",
          width: "1px",
          bgcolor: "warning.300",
          left: "500px",
        }}
      />
      <Card
        orientation="horizontal"
        sx={{
          width: "100%",
          flexWrap: "wrap",
          [`& > *`]: {
            "--stack-point": "500px",
            minWidth:
              "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
          },
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <img src={profileImage} loading="lazy" alt="Jai sairam" />
        </AspectRatio>
        <CardContent>
          <Typography sx={{ fontSize: "xl", fontWeight: "lg" }}>
            {UserData.name}
          </Typography>
          <Typography
            level="body-sm"
            textColor="text.tertiary"
            noWrap
            sx={{ fontWeight: "lg", display: "inline-block" }}
          >
            #{UserData.regdNo}
          </Typography>
          <Sheet
            sx={{
              bgcolor: "background.level1",
              borderRadius: "sm",
              p: 1.5,
              my: 1.5,
              display: "flex",
              gap: 2,
              "& > div": { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                Course
              </Typography>
              <Typography sx={{ fontWeight: "lg" }}>
                {UserData.course}
              </Typography>
            </div>
            <div>
              <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                Year
              </Typography>
              <Typography sx={{ fontWeight: "lg" }}>{UserData.year}</Typography>
            </div>
            <div>
              <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
                Semester
              </Typography>
              <Typography sx={{ fontWeight: "lg" }}>
                {UserData.semester}
              </Typography>
            </div>
          </Sheet>
          <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
            <Button variant="solid" color="primary">
              Edit Profile
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

// function CalendarContainer() {
//   return (
//       <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <DateCalendar />
//     </LocalizationProvider>
//   );
// }

function StudentDashboard() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <CssVarsProvider>
        <Box
          sx={{
            display: "flex",
            gap: "2%",
          }}
        >
          <Box
            className="sidebar-container"
            sx={{
              // backgroundColor:'#004071',
              borderRight: "1px solid",
              borderColor: "divider",
              width: isExpanded ? "25vw" : "5vw",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <Box
              className="sidebar-header"
              sx={{
                m: "5%",
                display: "flex",
                gap: 1,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {isExpanded && (
                <IconButton variant="soft" color="black" size="sm">
                  <Avatar src={sssihlLogo} />
                </IconButton>
              )}
              {isExpanded && (
                <Typography level="title-lg">Nandigiri Campus</Typography>
              )}
              <IconButton onClick={toggleSidebar} sx={{ marginLeft: "auto" }}>
                <MenuRoundedIcon sx={{ fontSize: 25 }} />
              </IconButton>
            </Box>

            <Input
              sx={{ marginInline: "8%", mt: "3%", paddingInline: "3%" }}
              size="sm"
              startDecorator={<SearchRoundedIcon />}
              placeholder="Search"
            />
            <List sx={{ mt: "2%", alignSelf: "center", width: "90%" }}>
              <ListItem sx={{ m: "3%", p: "3%" }}>
                <ListItemButton sx={{ borderRadius: 7 }}>
                  <HomeRoundedIcon expanded={isExpanded} />
                  <ListItemContent>
                    <Typography level="title-sm">Home</Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>

              <ListItem sx={{ m: "3%", p: "3%" }}>
                <ListItemButton sx={{ borderRadius: 7 }}>
                  <ChatRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Discussions</Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ m: "3%", p: "3%" }}>
                <ListItemButton sx={{ borderRadius: 7 }}>
                  <AssignmentRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Assignment</Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ m: "3%", p: "3%" }}>
                <ListItemButton sx={{ borderRadius: 7 }}>
                  <PersonRoundedIcon />
                  <ListItemContent>
                    <Typography level="title-sm">Profile</Typography>
                  </ListItemContent>
                </ListItemButton>
              </ListItem>
            </List>

            <List
              sx={{
                mt: "10%",
                alignSelf: "center",
                width: "90%",
                justifyContent: "flex-end",
                mb: 2,
              }}
            >
              <ListItem sx={{ m: "3%", p: "3%" }}>
                <ListItemButton sx={{ borderRadius: 7 }}>
                  <LogoutRoundedIcon />
                  Logout
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ m: "3%", p: "3%" }}>
                <ListItemButton sx={{ borderRadius: 7 }}>
                  <SettingsRoundedIcon />
                  Settings
                </ListItemButton>
              </ListItem>
            </List>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginInline: "3%",
                paddingInline: "2%",
              }}
            >
              <Avatar variant="outlined" size="md" src={UserData.image} />
              <Box sx={{ m: "3%", p: "3%" }}>
                <Typography level="title-sm">{UserData.name}</Typography>
                <Typography level="body-xs">{UserData.course}</Typography>
              </Box>
              <IconButton size="sm" variant="plain" color="neutral">
                <LogoutRoundedIcon />
              </IconButton>
            </Box>
          </Box>
          <Box
            component="main"
            className="main-container"
            sx={{
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              gap: "2%",
            }}
          >
            <UserCard />
            <Box
              className="features-container"
              sx={{ display: "flex", gap: 1.25 }}
            >
              <Button
                sx={{
                  backgroundColor: "#ecebeb",
                  color: "black",
                  borderBottom: "2px solid #fbe855",
                  padding: "1%",
                  width: "10vw",
                  ":hover": {
                    backgroundColor: "#e2e1e1",
                  },
                }}
                startDecorator={<AssignmentRoundedIcon />}
              >
                Exam Results
              </Button>
              <Button
                sx={{
                  backgroundColor: "#ecebeb",
                  color: "black",
                  borderBottom: "2px solid #4a4afd",
                  padding: "1%",
                  width: "10vw",
                  ":hover": {
                    backgroundColor: "#e2e1e1",
                  },
                }}
                startDecorator={<CalendarTodayRounded />}
              >
                Attendance
              </Button>
              <Button
                sx={{
                  backgroundColor: "#ecebeb",
                  color: "black",
                  borderBottom: "2px solid #fe4f4f",
                  padding: "1%",
                  width: "10vw",
                  ":hover": {
                    backgroundColor: "#e2e1e1",
                  },
                }}
                startDecorator={<CalendarMonthRounded />}
              >
                Calendar
              </Button>
            </Box>
            <Box>
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: 10, label: "series A" },
                      { id: 1, value: 15, label: "series B" },
                      { id: 2, value: 20, label: "series C" },
                    ],
                  },
                ]}
                width={400}
                height={200}
              />
            </Box>
          </Box>
        </Box>
      </CssVarsProvider>
    </>
  );
}

export default StudentDashboard;
