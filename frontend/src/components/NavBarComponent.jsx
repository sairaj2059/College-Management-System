import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { DropdownComponent } from "./DropdownComponent";
import { Avatar, Box, Typography } from "@mui/material";
//import home from "../resources/images/home.png";
//import examIcon from "../resources/images/exam.png";

import logo from "../resources/images/SSSIHL-Logo_White.png";
import DescriptionIcon from '@mui/icons-material/Description';
import Divider from "@mui/material/Divider";
import { MessageOutlined } from "@ant-design/icons";
import Tooltip from "@mui/material/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../redux/slices/navSlice";
// import { Link } from "react-router-dom";
// import { InfoRounded } from "@mui/icons-material";
// import listIcon from "../resources/images/listIcon.png";

import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

import ListIcon from "@mui/icons-material/List";
import Card from "@mui/joy/Card";

import ImageServive from "../services/ImageService";
import { useEffect } from "react";
import { useState } from "react";
export default function NavBarComponent() {
  //const [value, setValue] = React.useState(0);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const value = useSelector((state) => state.tabs.tabValue);
  const Username = "kokonda Shree Shyam sundar";
  const EmailId = "keshav@123";
  const role = localStorage.getItem("role");

  const fetchImage = async () => {
    const response = await ImageServive.getImageByStudent("224210");
    const imageUrl = URL.createObjectURL(response);
    return imageUrl;
  };

  // useEffect(()=>{
  //   async function getImage(){
  //     const image = await fetchImage();
  //     setImage(image);
  //   }
  //   getImage();
  // }, [])

  const handleChange = (event, newValue) => {
    dispatch(setTab(newValue));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: "80%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          width: "15%",
          height: "100%",
          margin: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "5px",
          gap: 2,
        }}
      >
        <Avatar src={logo} />
        <Typography
          variant="h2"
          fontSize={20}
          fontWeight={550}
          sx={{ color: "white" }}
        >
          Nandigiri Campus
        </Typography>
      </Box>

      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="navigation">
          <Tooltip title="Home">
            <Tab
              sx={{
                borderRadius: value === 0 ? "15px" : "",
                backgroundColor: value === 0 ? "#294c6d" : "",
              }}
              icon={
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* <img src={home} alt="home" style={{ width: 24, height: 24, background:'white' }} /> */}
                  <HomeIcon sx={{ color: "white" }} />
                  {value === 0 && (
                    <Typography
                      variant="caption"
                      sx={{ ml: 1, color: "white" }}
                    >
                      Home
                    </Typography>
                  )}
                </Box>
              }
              aria-label="home"
            />
          </Tooltip>

          {role === "TEACHER" || role === "STUDENT" ? (
            <Tooltip title="Exam">
              <Tab
                sx={{
                  borderRadius: value === 1 ? "15px" : "",
                  backgroundColor: value === 1 ? "#294c6d" : "",
                }}
                icon={
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* // <img
                  //   src={examIcon}
                  //   alt="exam"
                  //   style={{ width: 25, height: 25, fontWeight: "500" }}
                  // /> */}
                    <AssignmentIcon sx={{ color: "white" }} />
                    {value === 1 && (
                      <Typography
                        variant="caption"
                        sx={{ ml: 1, color: "white" }}
                      >
                        Exam
                      </Typography>
                    )}
                  </Box>
                }
                aria-label="exam"
              />
            </Tooltip>
          ) : (
            <Tooltip title="Student List">
              <Tab
                sx={{
                  borderRadius: value === 1 ? "15px" : "",
                  backgroundColor: value === 1 ? "#294c6d" : "",
                }}
                icon={
                  // <img
                  //   src={listIcon}
                  //   alt="listIcon"
                  //   style={{ width: 25, height: 25, fontWeight: "500" }}
                  // />
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormatListBulletedIcon  sx={{ color: "white" }}/>
                    {value === 1 && (
                      <Typography
                        variant="caption"
                        sx={{ ml: 1, color: "white" }}
                      >
                        Student List
                      </Typography>
                    )}
                  </Box>
                }
                aria-label="studentlist"
              />
            </Tooltip>
          )}

          <Tooltip title="Messages">
            <Tab
              sx={{
                borderRadius: value === 2 ? "15px" : "",
                backgroundColor: value === 2 ? "#294c6d" : "",
              }}
              icon={
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MessageOutlined
                    style={{ fontSize: "24px", color: "white" }}
                  />
                  {value === 2 && (
                    <Typography
                      variant="caption"
                      sx={{ ml: 1, color: "white" }}
                    >
                      Messages
                    </Typography>
                  )}
                </Box>
              }
              aria-label="mesaages"
            />
          </Tooltip>
          <Tooltip title="Exam Results">
  <Tab
    sx={{
      borderRadius: value === 3 ? "15px" : "",
      backgroundColor: value === 3 ? "#294c6d" : "",
    }}
    icon={
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DescriptionIcon style={{ fontSize: "24px", color: "white" }} />
        {value === 3 && (
          <Typography
            variant="caption"
            sx={{ ml: 1, color: "white" }}
          >
            Exam Results
          </Typography>
        )}
      </Box>
    }
    aria-label="examresults"
  />
</Tooltip>

        </Tabs>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "21%",
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
            width: "80%",
            gap: { xs: "4px", sm: "6px", md: "10px", lg: "14px" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Divider orientation="vertical" flexItem sx={{ height: "5vh" }} />
          </Box>

          <Box>
            <Avatar
              src={image}
              sx={{ width: 47, height: 47 }}
            />
          </Box>

          <Box
            sx={{
              fontFamily: "sans-serif",
              marginTop: { xs: "2px", sm: "4px", md: "6px", lg: "8px" },
              display: "flex",
              flexDirection: "column",
              minWidth: "0",
              overflow: "hidden",
            }}
          >
            <Tooltip title={String(Username)} arrow>
              <Box>
                <Typography
                  sx={{
                    fontSize: { xs: "10px", sm: "12px", md: "14px" },
                    color: "white",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {Username}
                </Typography>

                <Typography
                  sx={{
                    fontSize: { xs: "8px", sm: "10px", md: "12px" },
                    color: "white",
                    fontWeight: 400,
                  }}
                >
                  {EmailId}
                </Typography>
              </Box>
            </Tooltip>
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
