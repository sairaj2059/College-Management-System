// import React from "react";
// import AspectRatio from "@mui/joy/AspectRatio";
// import Box from "@mui/joy/Box";
// import Card from "@mui/joy/Card";
// import CardContent from "@mui/joy/CardContent";
// import Typography from "@mui/joy/Typography";
// import Sheet from "@mui/joy/Sheet";
// import profileImage from "../resources/images/224206.jpg";
// import { UserData } from "../resources/DataList";
// import Sidebar from "../components/Sidebar";
// import { CssVarsProvider } from "@mui/joy/styles";
// import sssihlLogo from "../resources/images/Llogo.png";
// import "../resources/css/studentdashboard.css";

//import StudentProfile from "../components/StudentProfile";

// import IconButton from "@mui/joy/IconButton";
// import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
// import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
// import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
// import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
// import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
// import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
// import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
// import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
// import CalendarMonthRounded from "@mui/icons-material/CalendarMonthRounded";
// import CalendarTodayRounded from "@mui/icons-material/CalendarTodayRounded";

// import List from "@mui/joy/List";
// import ListItem from "@mui/joy/ListItem";
// import ListItemButton from "@mui/joy/ListItemButton";
// import ListItemContent from "@mui/joy/ListItemContent";
// import Avatar from "@mui/joy/Avatar";
// import Input from "@mui/joy/Input";
// import Button from "@mui/joy/Button";

// function UserCard() {
//   return (
//     <Box
//       sx={{
//         width: "35%",
//         position: "relative",
//         overflow: { xs: "auto", sm: "initial" },
//         mt: "2%",
//       }}
//     >
//       <Box
//         sx={{
//           position: "absolute",
//           display: "block",
//           width: "1px",
//           bgcolor: "warning.300",
//           left: "500px",
//         }}
//       />
//       <Card
//         orientation="horizontal"
//         sx={{
//           width: "100%",
//           flexWrap: "wrap",
//           [`& > *`]: {
//             "--stack-point": "500px",
//             minWidth:
//               "clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)",
//           },
//         }}
//       >
//         <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
//           <img src={profileImage} loading="lazy" alt="Jai sairam" />
//         </AspectRatio>
//         <CardContent>
//           <Typography sx={{ fontSize: "xl", fontWeight: "lg" }}>
//             {UserData.name}
//           </Typography>
//           <Typography
//             level="body-sm"
//             textColor="text.tertiary"
//             variant="solid"
//             color="primary"
//             noWrap
//             sx={{ fontWeight: "lg" }}
//           >
//             #{UserData.regdNo}
//           </Typography>
//           <Sheet
//             sx={{
//               bgcolor: "background.level1",
//               borderRadius: "sm",
//               p: 1.5,
//               my: 1.5,
//               display: "flex",
//               gap: 2,
//               "& > div": { flex: 1 },
//             }}
//           >
//             <div>
//               <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
//                 Course
//               </Typography>
//               <Typography sx={{ fontWeight: "lg" }}>
//                 {UserData.course}
//               </Typography>
//             </div>
//             <div>
//               <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
//                 Year
//               </Typography>
//               <Typography sx={{ fontWeight: "lg" }}>{UserData.year}</Typography>
//             </div>
//             <div>
//               <Typography level="body-xs" sx={{ fontWeight: "lg" }}>
//                 Semester
//               </Typography>
//               <Typography sx={{ fontWeight: "lg" }}>
//                 {UserData.semester}
//               </Typography>
//             </div>
//           </Sheet>
//           <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
//             <Button variant="solid" color="primary">
//               Edit Profile
//             </Button>
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }

// // function CalendarContainer() {
// //   return (
// //       <LocalizationProvider dateAdapter={AdapterDayjs}>
// //       <DateCalendar />
// //     </LocalizationProvider>
// //   );
// // }

// function StudentDashboard() {
//   return (
//     <>
//       <CssVarsProvider>
//         <Box
//           sx={{
//             display: "flex",
//             gap: "2%",
//           }}
//         >
//           <Box
//             className="sidebar-container"
//             sx={{
//               // backgroundColor:'#004071',
//               borderRight: "1px solid",
//               borderColor: "divider",
//               width: "20vw",
//               height: "100vh",
//               display: "flex",
//               flexDirection: "column",
//             }}
//           >
//             <Box
//               className="sidebar-header"
//               sx={{
//                 p: "5%",
//                 display: "flex",
//                 gap: 1,
//                 alignItems: "center",
//                 justifyContent: "flex-start",
//               }}
//             >
//               <IconButton variant="soft" color="black" size="sm">
//                 <Avatar src={sssihlLogo} />
//               </IconButton>
//               <Typography level="title-lg">Nandigiri Campus</Typography>
//               <IconButton>
//                 <MenuRoundedIcon sx={{ fontSize: 25 }} />
//               </IconButton>
//             </Box>

//             <Input
//               sx={{ marginInline: "8%", mt: "3%", paddingInline: "3%" }}
//               size="sm"
//               startDecorator={<SearchRoundedIcon />}
//               placeholder="Search"
//             />
//             <List sx={{ mt: "2%", alignSelf: "center", width: "90%" }}>
//               <ListItem sx={{ m: "3%", p: "3%" }}>
//                 <ListItemButton sx={{ borderRadius: 7 }}>
//                   <HomeRoundedIcon />
//                   <ListItemContent>
//                     <Typography level="title-sm">Home</Typography>
//                   </ListItemContent>
//                 </ListItemButton>
//               </ListItem>

//               <ListItem sx={{ m: "3%", p: "3%" }}>
//                 <ListItemButton sx={{ borderRadius: 7 }}>
//                   <ChatRoundedIcon />
//                   <ListItemContent>
//                     <Typography level="title-sm">Discussions</Typography>
//                   </ListItemContent>
//                 </ListItemButton>
//               </ListItem>
//               <ListItem sx={{ m: "3%", p: "3%" }}>
//                 <ListItemButton sx={{ borderRadius: 7 }}>
//                   <AssignmentRoundedIcon />
//                   <ListItemContent>
//                     <Typography level="title-sm">Assignment</Typography>
//                   </ListItemContent>
//                 </ListItemButton>
//               </ListItem>
//               <ListItem sx={{ m: "3%", p: "3%" }}>
//                 <ListItemButton sx={{ borderRadius: 7 }}>
//                   <PersonRoundedIcon />
//                   <ListItemContent>
//                     <Typography level="title-sm">Profile</Typography>
//                   </ListItemContent>
//                 </ListItemButton>
//               </ListItem>
//             </List>

//             <List
//               sx={{
//                 mt: "10%",
//                 alignSelf: "center",
//                 width: "90%",
//                 justifyContent: "flex-end",
//                 mb: 2,
//               }}
//             >
//               <ListItem sx={{ m: "3%", p: "3%" }}>
//                 <ListItemButton sx={{ borderRadius: 7 }}>
//                   <LogoutRoundedIcon />
//                   Logout
//                 </ListItemButton>
//               </ListItem>
//               <ListItem sx={{ m: "3%", p: "3%" }}>
//                 <ListItemButton sx={{ borderRadius: 7 }}>
//                   <SettingsRoundedIcon />
//                   Settings
//                 </ListItemButton>
//               </ListItem>
//             </List>
//           </Box>
//           {/* <Sidebar /> */}
//           <Box
//             component="main"
//             className="main-container"
//             sx={{
//               width: "100vw",
//               display: "flex",
//               flexDirection: "column",
//               gap: "2%",
//             }}
//           >
//             <UserCard />
//             <Box
//               className="features-container"
//               sx={{ display: "flex", gap: 1.25 }}
//             >
//               <Button
//                 sx={{
//                   backgroundColor: "#ecebeb",
//                   color: "black",
//                   borderBottom: "2px solid #fbe855",
//                   padding:'1%',
//                   width:'10vw',
//                   ":hover":{
//                     backgroundColor:'#e2e1e1'
//                   }
//                 }}
//                 startDecorator={<AssignmentRoundedIcon />}
//               >
//                 Exam Results
//               </Button>
//               <Button
//                 sx={{
//                   backgroundColor: "#ecebeb",
//                   color: "black",
//                   borderBottom: "2px solid #4a4afd",
//                   padding:'1%',
//                   width:'10vw',
//                   ":hover":{
//                     backgroundColor:'#e2e1e1'
//                   }
//                 }}
//                 startDecorator={<CalendarTodayRounded />}
//               >
//                 Attendance
//               </Button>
//               <Button
//                 sx={{
//                   backgroundColor: "#ecebeb",
//                   color: "black",
//                   borderBottom: "2px solid #fe4f4f",
//                   padding:'1%',
//                   width:'10vw',
//                   ":hover":{
//                     backgroundColor:'#e2e1e1'
//                   }
//                 }}
//                 startDecorator={<CalendarMonthRounded />}
//               >
//                 Calendar
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </CssVarsProvider>
//     </>
//   );
// }

// export default StudentDashboard;
import React from "react";
import { Box, Stack } from "@mui/material";
import SAttendance from "../components/SAttendance";
import StudentProfile from "../components/StudentProfile";
import PerformanceChart from "../components/PerformanceChart";
import Calendar from "../components/Calendar";
import Faculty from "../components/Faculty";

function StudentDashboard() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        p: 3,
        width: "100%",
      }}
      
    >
      {/* Top Stack - Profile, Attendance, Calendar */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{ width: "100%", justifyContent: "center", flexWrap: "wrap" }}
      >
        <Box sx={{ width: { xs: "100%", md: "30%" } }}>
          <StudentProfile />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "30%" }, display: "flex", justifyContent: "center" }}>
          <SAttendance />
        </Box>
        <Box sx={{ width: { xs: "100%", md: "30%" } }}>
          <Calendar />
        </Box>
      </Stack>

      {/* Bottom Stack - Performance Chart & Exam Result */}
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={3}
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Performance Chart */}
        <Box sx={{ width: { xs: "100%", md: "65%" } }}>
          <PerformanceChart />
        </Box>

        {/* Exam Result Card */}
        <Box sx={{ width: { xs: "100%", md: "30%" }, display: "flex", justifyContent: "center" }}>
          {/* <ExamResultCard /> */}
        </Box>
      </Stack>
      <Box sx={{ width: "100%", mt: 3 }}>
        <Faculty />
      </Box>
    </Box>
  );
}

export default StudentDashboard;