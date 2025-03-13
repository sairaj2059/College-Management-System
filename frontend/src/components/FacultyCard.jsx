import React from "react";
import { Card, CardContent, Typography, Avatar, Button, Stack, Box } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import ChatIcon from "@mui/icons-material/Chat";

const FacultyCard = ({ name, subject, image }) => {
  return (
    <Card 
      sx={{ 
        width: 220, 
        textAlign: "center", 
        p: 2, 
        boxShadow: 3,
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        }
      }}
    >
      <Box sx={{ position: "relative", mb: 2 }}>
        <Avatar 
          src={image || "https://via.placeholder.com/80"}  // Placeholder if image is missing
          sx={{ 
            width: 80, 
            height: 80, 
            margin: "0 auto",
            border: "3px solid #fff",
            boxShadow: 2,
          }} 
        />
      </Box>
      <CardContent sx={{ p: 1 }}>
        <Typography 
          variant="h6" 
          fontWeight="bold"
          sx={{ 
            mb: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          {name}
        </Typography>
        <Typography 
          variant="body2" 
          color="textSecondary"
          sx={{ 
            mb: 2,
            minHeight: "40px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: "1.2"
          }}
        >
          {subject}
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="center">
          <Button 
            variant="outlined" 
            size="small" 
            startIcon={<EmailIcon />}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white"
              }
            }}
          >
            Email
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            startIcon={<ChatIcon />}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white"
              }
            }}
          >
            Chat
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FacultyCard;
