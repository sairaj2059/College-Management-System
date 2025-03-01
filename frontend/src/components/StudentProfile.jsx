import React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import "../resources/css/studentprofile.css";

function StudentProfile({ userData, profileImage }) {
  return (
    <Card className="profile-card">
      <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
        <img 
          src={profileImage} 
          loading="lazy" 
          alt={userData.name}
          className="profile-image"
        />
      </AspectRatio>
      <CardContent>
        <Typography className="profile-name">
          {userData.name}
        </Typography>
        <Typography className="profile-id">
          #{userData.regdNo}
        </Typography>
        <Sheet className="info-sheet">
          <div>
            <Typography className="info-label">Course</Typography>
            <Typography className="info-value">{userData.course}</Typography>
          </div>
          <div>
            <Typography className="info-label">Year</Typography>
            <Typography className="info-value">{userData.year}</Typography>
          </div>
          <div>
            <Typography className="info-label">Semester</Typography>
            <Typography className="info-value">{userData.semester}</Typography>
          </div>
        </Sheet>
        <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
          <Button className="edit-button">Edit Profile</Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default StudentProfile;