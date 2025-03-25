import { Card,Typography, Stack,Avatar, Button, } from "@mui/material";
const TeacherProfile = () => {
    return (
      <Card sx={{ p: 2, display: "flex", alignItems: "center", backgroundColor: "#1e293b", color: "#fff" }}>
        <Avatar
          //src="https://randomuser.me/api/portraits/women/44.jpg"
          sx={{ width: 64, height: 64, mr: 2 }}
        />
        <Stack>
          <Typography variant="caption" sx={{ backgroundColor: "#3b82f6", p: 0.5, borderRadius: 1 }}>
            #T594651
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            Kokkonda Sri syam Sundar
          </Typography>
          <Typography variant="body2">Classes : IIIBSc • ComputerSciencs</Typography>
        </Stack>
        <Button variant="contained" color="primary" sx={{ ml: "auto" }}>
          Edit Profile
        </Button>
      </Card>
    );
  };
  export default TeacherProfile;
