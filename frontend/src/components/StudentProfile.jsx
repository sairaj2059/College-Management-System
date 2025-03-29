
import React, { useEffect, useState } from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import "../resources/css/StudentProfile.css";
import StudentDashboardService from "../services/StudentDashboardService";
import ImageService from "../services/ImageService";
import { Image } from "antd";
import { useSelector } from "react-redux";

function StudentProfile({ onProfileLoaded }) {

  const regdNo = useSelector((state)=> state.auth.username);
  const [userData, setUserData] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {        
        const data = await StudentDashboardService.getStudentProfilebyregdNo(regdNo);
        if (data) {
          
          onProfileLoaded(data.regdNo, data.semester);
          setUserData(data);
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

  useEffect(()=>{
    async function fetchImage() {
      try {
        const response = await ImageService.getImageByStudent(userData.regdNo);
        console.log(response);
        const imageUrl = URL.createObjectURL(response);
        setImageUrl(imageUrl);
        return imageUrl;
      } catch (error) {
        console.log(error); 
      }
    }
  fetchImage();
  }, [imageUrl]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!userData) return <Typography>No data available</Typography>;

  return (
    
    <Card className="profile-card">
      {/* Profile Container */}
      <div className="profile-container">
        {/* Left Section - Profile Image */}
        <div className="profile-image-container">
            <Image src={imageUrl} width={150} style={{"objectFit":"cover", "borderRadius":"8px"}} />
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
