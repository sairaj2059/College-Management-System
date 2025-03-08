// import React from "react";
// import AspectRatio from "@mui/joy/AspectRatio";
// import Box from "@mui/joy/Box";
// import Card from "@mui/joy/Card";
// import CardContent from "@mui/joy/CardContent";
// import Typography from "@mui/joy/Typography";
// import Sheet from "@mui/joy/Sheet";
// import Button from "@mui/joy/Button";
// import "../resources/css/StudentProfile.css";

// function StudentProfile({ userData, profileImage }) {
//   return (
//     <Card className="profile-card">
//       <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
//         <img 
//           src={profileImage} 
//           loading="lazy" 
//           alt={userData.name}
//           className="profile-image"
//         />
//       </AspectRatio>
//       <CardContent>
//         <Typography className="profile-name">
//           {userData.name}
//         </Typography>
//         <Typography className="profile-id">
//           #{userData.regdNo}
//         </Typography>
//         <Sheet className="info-sheet">
//           <div>
//             <Typography className="info-label">Course</Typography>
//             <Typography className="info-value">{userData.course}</Typography>
//           </div>
//           <div>
//             <Typography className="info-label">Year</Typography>
//             <Typography className="info-value">{userData.year}</Typography>
//           </div>
//           <div>
//             <Typography className="info-label">Semester</Typography>
//             <Typography className="info-value">{userData.semester}</Typography>
//           </div>
//         </Sheet>
//         <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
//           <Button className="edit-button">Edit Profile</Button>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }

// export default StudentProfile;

import React, { useEffect, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import Button from "@mui/joy/Button";
import StudentDashboardService from "../services/StudentDashboardService"; 
import "../resources/css/StudentProfile.css";

function StudentProfile() {
  const regdNo = "224206"; // Hardcoded for now
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await StudentDashboardService.getStudentProfilebyregdNo(regdNo);
        if (data) {
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
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!userData) return <Typography>No data available</Typography>;

  return (
    <Card className="profile-card">
      <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
        <img 
          src={userData.profileImage || "default-profile.png"} 
          loading="lazy" 
          alt={`${userData.firstName} ${userData.lastName}`} 
          className="profile-image"
        />
      </AspectRatio>
      <CardContent>
       
        <Typography className="profile-id">
          #{userData.regdNo}
        </Typography>
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



// import React, { useEffect, useState } from "react";
// import AspectRatio from "@mui/joy/AspectRatio";
// import Box from "@mui/joy/Box";
// import Card from "@mui/joy/Card";
// import CardContent from "@mui/joy/CardContent";
// import Typography from "@mui/joy/Typography";
// import Sheet from "@mui/joy/Sheet";
// import Button from "@mui/joy/Button";
// import StudentDashboardService from "../services/StudentDashboardService"; 
// import "../resources/css/StudentProfile.css";

// function StudentProfile({ regdNo }) {
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchProfile() {
//       try {
//         const data = await StudentDashboardService.getStudentProfilebyregdNo(regdNo);
//         if (data) {
//           setUserData(data);
//         } else {
//           setError("Failed to load student profile.");
//         }
//       } catch (err) {
//         setError("Error fetching data.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchProfile();
//   }, [regdNo]);

//   if (loading) return <Typography>Loading...</Typography>;
//   if (error) return <Typography color="error">{error}</Typography>;
//   if (!userData) return <Typography>No data available</Typography>;

//   return (
//     <Card className="profile-card">
//       <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
//         <img 
//           src={userData.profileImage || "default-profile.png"} 
//           loading="lazy" 
//           alt={userData.name}
//           className="profile-image"
//         />
//       </AspectRatio>
//       <CardContent>
//         <Typography className="profile-name">
//           {userData.name}
//         </Typography>
//         <Typography className="profile-id">
//           #{userData.regdNo}
//         </Typography>
//         <Sheet className="info-sheet">
//           <div>
//             <Typography className="info-label">Course</Typography>
//             <Typography className="info-value">{userData.course}</Typography>
//           </div>
//           <div>
//             <Typography className="info-label">Year</Typography>
//             <Typography className="info-value">{userData.year}</Typography>
//           </div>
//           <div>
//             <Typography className="info-label">Semester</Typography>
//             <Typography className="info-value">{userData.semester}</Typography>
//           </div>
//         </Sheet>
//         <Box sx={{ display: "flex", gap: 1.5, "& > button": { flex: 1 } }}>
//           <Button className="edit-button">Edit Profile</Button>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// }

// export default StudentProfile;
