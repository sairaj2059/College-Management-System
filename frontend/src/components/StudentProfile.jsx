import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import profileImage from "../resources/images/224206.jpg";
import { UserData } from "../resources/DataList";
import "../resources/css/studentprofile.css";
import Button from "@mui/joy/Button";

function StudentProfile() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "2%",
        left: "2%",
        width: "30%",
        overflow: { xs: "auto", sm: "initial" },
      }}
    >
      <Card orientation="horizontal" sx={{ width: "100%" }}>
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
export default StudentProfile;