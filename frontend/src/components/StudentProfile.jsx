
import React, { useEffect, useState } from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import "../resources/css/StudentProfile.css";
import StudentDashboardService from "../services/StudentDashboardService";

function StudentProfile({ onProfileLoaded }) {
  const regdNo = 224206;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await StudentDashboardService.getStudentProfilebyregdNo(regdNo);
        if (data) {
          setUserData(data);
          onProfileLoaded(data.regdNo, data.semester);
        } else {
          setError("Failed to load student profile.");
        }
      } catch (err) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [onProfileLoaded]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!userData) return <Typography>No data available</Typography>;

  return (
    <Card className="profile-card">
      {/* Profile Container */}
      <div className="profile-container">
        {/* Left Section - Profile Image */}
        <div className="profile-image-container">
          <img
            src={
              imageError
                ? "default-profile.png"
                : `http://localhost:8080/student/studentImage/${userData.regdNo}`
            }
            onError={() => setImageError(true)}
            loading="lazy"
            alt={`${userData.firstName} ${userData.lastName}`}
            className="profile-image"
          />
        </div>

        {/* Right Section - Profile Details */}
        <CardContent className="profile-content">
          <Typography className="profile-id">#{userData.regdNo}</Typography>
          <Typography className="profile-name">
            {userData.firstName} {userData.lastName}
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
              {/* <Typography className="info-value">{userData.semester}</Typography> */}
            </div>
          </Sheet>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button className="edit-button">Edit Profile</Button>
          </Box>
        </CardContent>
      </div>
    </Card>
  );
}

export default StudentProfile;
