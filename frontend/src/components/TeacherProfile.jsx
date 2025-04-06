import React, { useEffect, useState } from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import "../resources/css/TeacherProfile.css";
import TeacherDashboardService from "../services/TeacherDashboardservice.js";

function TeacherProfile({ teacherId, onSubjectsLoaded }) {
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await TeacherDashboardService.getTeacherProfilebyteacherId(teacherId);
        if (data) {
          setTeacherData(data);

          // ✅ Extract subject names and pass to parent component
          if (onSubjectsLoaded && data.subjects) {
            const subjectNames = data.subjects.map((subject) => subject.subjectName);
            onSubjectsLoaded(subjectNames);
          }
        } else {
          setError("Failed to load teacher profile.");
        }
      } catch (err) {
        setError("Error fetching data.");
      } finally {
        setLoading(false);
      }
    }

    if (teacherId) {
      fetchProfile();
    }
  }, [teacherId, onSubjectsLoaded]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!teacherData) return <Typography>No data available</Typography>;

  return (
    <Card className="teacher-profile-card">
      <div className="teacher-profile-container">
        <div className="teacher-profile-image-container">
          <img
            src={
              imageError
                ? "default-profile.png"
                : `http://localhost:8080/teacher/teacherImage/${teacherData.teacherId}`
            }
            onError={() => setImageError(true)}
            loading="lazy"
            alt={`${teacherData.firstName} ${teacherData.lastName}`}
            className="teacher-profile-image"
          />
        </div>

        <CardContent className="teacher-profile-content">
          <Typography className="teacher-profile-id">#{teacherData.teacherId}</Typography>
          <Typography className="teacher-profile-name">
            {teacherData.firstName} {teacherData.lastName}
          </Typography>
          <Sheet className="teacher-info-sheet">
            <div>
              <Typography className="teacher-info-label">Class Mentor</Typography>
              <Typography className="teacher-info-value">{teacherData.classmentor || "N/A"}</Typography>
            </div>
            <div>
              <Typography className="teacher-info-label">Subjects</Typography>
              <Typography className="teacher-info-value">
                {teacherData.subjects?.map((subject) => subject.subjectName).join(", ") || "N/A"}
              </Typography>
            </div>
          </Sheet>
          <Box sx={{ display: "flex", gap: 1.5 }}>
            <Button className="teacher-edit-button">Edit Profile</Button>
          </Box>
        </CardContent>
      </div>
    </Card>
  );
}

export default TeacherProfile;

