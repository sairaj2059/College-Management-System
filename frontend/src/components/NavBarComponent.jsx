import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { DropdownComponent } from "./DropdownComponent";
import { Avatar, Box, Typography } from "@mui/material";
import home from "../resources/images/home.png";
import examIcon from "../resources/images/exam.png";
import SchoolSharpIcon from "@mui/icons-material/SchoolSharp";
import Divider from "@mui/material/Divider";
import { MessageOutlined } from "@ant-design/icons";
import Tooltip from '@mui/material/Tooltip';
import { useDispatch,useSelector } from "react-redux";
import { setTab } from "../redux/slices/navSlice";


export default function NavBarComponent() {
  //const [value, setValue] = React.useState(0);
  const dispatch = useDispatch();
  const value = useSelector((state) => state.tabs.tabValue);
  const Username = "kokonda Shree Shyam sundar";
  const EmailId = "keshav@123";

  const handleChange = (event, newValue) => {
    console.log(newValue);  
    dispatch(setTab(newValue));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "10%",
          height: "100%",
          // backgroundColor: "red",
          margin: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "5px",
        }}
      >
        <SchoolSharpIcon fontSize="large" />
      </Box>

      <Box>

        <Tabs value={value} onChange={handleChange} aria-label="navigation">

          <Tooltip title="Home">
          <Tab
            icon={
              <img src={home} alt="home" style={{ width: 24, height: 24 }} />
            }
            aria-label="home"
          /></Tooltip>

          <Tooltip title="Exam">
          <Tab
            icon={
              <img
                src={examIcon}
                alt="exam"
                style={{ width: 25, height: 25, fontWeight: "500" }}
              />
            }
            aria-label="exam"
          />
          </Tooltip>

          <Tooltip title="Messages">
          <Tab
            icon={
              <MessageOutlined style={{ fontSize: "24px", color: "rgb(40, 40, 40)" }} />
            }
            aria-label="mesaages"
          />
          </Tooltip>

        </Tabs>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "20%",
          height: "100%",
          justifyContent: "space-around",
          backgroundColor: "transparent",
          paddingRight: { xs: "3px", sm: "7px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            // justifyContent: "space-evenly",
            width: "80%",
            gap: { xs: "4px", sm: "6px", md: "10px", lg: "14px" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Divider orientation="vertical" flexItem sx={{ height: "5vh" }} />
          </Box>
          <Box>
            <Avatar src="/broken-image.jpg" sx={{ width: 47, height: 47 }} />
          </Box>
          <Box
            sx={{
              fontFamily: "sans-serif",
              marginTop: { xs: "2px", sm: "4px", md: "6px", lg: "8px" },
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "10px", sm: "12px", md: "14px" },
                fontWeight: 500,
              }}
            >
              {Username}
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "8px", sm: "10px", md: "12px" },
                color: "text.secondary",
                fontWeight: 400,
              }}
            >
              {EmailId}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "10%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DropdownComponent />
        </Box>
      </Box>
    </Box>
  );
}
