import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import profileImage from "../resources/images/224206.jpg";
import { UserData } from "../resources/DataList";
import Sidebar from "../components/Sidebar";
import { CssVarsProvider } from "@mui/joy/styles";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

function UserCard() {
  return (
    <Box
      sx={{
        width: "35%",
        position: "relative",
        overflow: { xs: "auto", sm: "initial" },
        mt: "2%",
        zIndex: 1,
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
            variant="solid"
            color="primary"
            noWrap
            sx={{ fontWeight: "lg" }}
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
  return (
    <>
      <CssVarsProvider>
        <Box
          sx={{
            display: "flex",
            gap: "2%",
          }}
        >
          <Sidebar />
          <Box
            component="main"
            className="main-container"
            sx={{
              width: "100vw",
            }}
          >
            <UserCard />
            {/* <CalendarContainer/> */}
          </Box>
        </Box>
      </CssVarsProvider>
    </>
  );
}

export default StudentDashboard;
