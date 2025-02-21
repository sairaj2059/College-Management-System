import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { useEffect, useRef, useState } from "react";
import {
  attachments,
  courses,
  tempDiscussionSidebar,
  tempMessages,
} from "../resources/DataList";
import Textarea from "@mui/joy/Textarea";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import IconButton from "@mui/joy/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FileDownloadRounded from "@mui/icons-material/FileDownloadRounded";
import PreviewRounded from "@mui/icons-material/VisibilityOutlined";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

import Avatar from "@mui/joy/Avatar";
import AvatarGroup from "@mui/joy/AvatarGroup";
import { Collapse, FormControl, FormLabel } from "@mui/material";

import DiscussionService from "../services/DiscussionService";
import Button from "@mui/joy/Button";
import UserService from "../services/UserService";
import Input from "@mui/joy/Input";
import Autocomplete from "@mui/joy/Autocomplete";
import Slide from "@mui/material/Slide";

function Discussion() {
  const [toggleSmallWindow, setToggleSmallWindow] = useState(false);
  const [toggleInfoWindow, setToggleInfoWindow] = useState(false);
  const [toggleMemberIcon, setToggleMemberIcon] = useState(false);
  const [toggleAttachmentIcon, setToggleAttachmentIcon] = useState(false);
  const [groupId, setgroupId] = useState("cs_discussion_01");
  const [stompClient, setStompClient] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "msg01",
      sender: "Prof. Sita Sharma",
      message:
        "Welcome to the Computer Science discussion group. Let's start with the basics of algorithms.",
      timestamp: "2025-02-11T09:00:00Z",
      avatar: "SS",
    },
    {
      id: "msg02",
      sender: "raj1",
      message: "Professor, could you explain the concept of time complexity?",
      timestamp: "2025-02-11T09:05:00Z",
      avatar: "RG",
    },
  ]);

  const currentUser = localStorage.getItem("username");
  // const groupId = "67a9d177de4a6b84a7c86873";
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleAttachmentIcon = () => {
    setToggleAttachmentIcon((prevBool) => !prevBool);
  };

  const handleInfoWindow = () => {
    setToggleInfoWindow((prevBool) => !prevBool);
  };
  const handleMemberIcon = () => {
    setToggleMemberIcon((prevBool) => !prevBool);
  };

  const handleSmallWindow = () => {
    setToggleSmallWindow((prevBool) => !prevBool);
  };

  useEffect(() => {
    const connectWebSocket = () => {
      const token = localStorage.getItem("token");
      const sock = new SockJS(`${UserService.BASE_URL}/chat?token=${token}`);
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);
        client.subscribe(`/topic/group/${groupId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          console.log(newMessage);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };

    connectWebSocket();
  }, [groupId]);

  useEffect(() => {
    async function fetchData() {
      const response = await DiscussionService.getMessages(groupId);
      setMessages(response);
    }
    fetchData();
  }, [groupId]);
  const sendMessage = async()=>{
    if (stompClient) {
      console.log(input);
      
      const message = {
        sender: currentUser,
        message : input,
        groupId : groupId
      }

      stompClient.send(`/app/sendMessage/${groupId}`, {}, JSON.stringify(message), {});
      console.log(JSON.stringify(message));
      setInput("");
    }
  }
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, toggleSmallWindow]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "background.surface",
      }}
    >
      <Stack direction="row" sx={{ width: "100%", height: "100%" }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: "20vw",
            height: "100%",
            pl: "1rem",
            borderRight: "1px solid",
            borderColor: "divider",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              mt: 2,
              mr: 2,
              pb: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography level="h2" color="primary">
              Messages
            </Typography>

            {UserService.isTeacher() ? (
              <IconButton onClick={handleSmallWindow}>
                <AddIcon />
              </IconButton>
            ) : (
              <Button onClick={handleSmallWindow}>Join Room</Button>
            )}
          </Box>

          <Input
            startDecorator={<SearchIcon />}
            placeholder="Search..."
            size="sm"
            sx={{ width: 300, backgroundColor: "background.level1", p: 1 }}
          />
          <Box
            sx={{
              overflow: "auto",
              overflowX: "hidden",
              flex: 1,
              mt: "2rem",
              mr: "1rem",
            }}
          >
            <Stack spacing={2}>
              {tempDiscussionSidebar.map((chat, index) => (
                <Card
                  key={index}
                  sx={{
                    border: "none",
                    display: "flex",
                    pl: 1,
                    cursor: "pointer",
                    "&:hover": { bgcolor: "background.level1" },
                  }}
                >
                  <CardContent>
                    <Stack direction={"row"} spacing={2}>
                      <Avatar />
                      <Stack>
                        <Typography fontWeight="bold">
                          {chat.subject}
                        </Typography>
                        <Typography
                          level="body-sm"
                          noWrap
                          overflow={"hidden"}
                          width={200}
                        >
                          {chat.messsage}
                        </Typography>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>

        {toggleSmallWindow ? (
          UserService.isTeacher() ? (
            <Box
              className="create-room-container"
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
              }}
            >
              <Card sx={{ height: "auto", width: "50vh", gap: 2, p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography level="title-lg">Create Room</Typography>
                  <IconButton
                    sx={{ ":hover": { backgroundColor: "red" } }}
                    onClick={handleSmallWindow}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Stack direction={"column"} spacing={2}>
                  <FormControl sx={{ gap: 1.5 }}>
                    <FormLabel>
                      <Typography level="body-sm">Group Name</Typography>
                    </FormLabel>
                    <Input sx={{ backgroundColor: "#f6f8fa", p: 1.5 }} />
                  </FormControl>

                  <FormControl sx={{ gap: 1.5 }}>
                    <FormLabel>
                      <Typography level="body-sm">Group ID</Typography>
                    </FormLabel>
                    <Input sx={{ backgroundColor: "#f6f8fa", p: 1.5 }} />
                  </FormControl>
                  <FormControl sx={{ gap: 1.5 }}>
                    <FormLabel>
                      <Typography level="body-sm">Add Batch</Typography>
                    </FormLabel>
                    <Autocomplete
                      multiple
                      placeholder="Add Class"
                      options={courses}
                      sx={{ backgroundColor: "#f6f8fa", p: 1.5 }}
                    />
                  </FormControl>
                  <FormControl sx={{ gap: 1.5 }}>
                    <FormLabel>
                      <Typography level="body-sm">
                        Add Students by Regd No
                      </Typography>
                    </FormLabel>
                    <Input
                      sx={{ backgroundColor: "#f6f8fa", p: 1.5 }}
                      endDecorator={
                        <Button
                          sx={{
                            marginRight: 1,
                            backgroundColor: "#e0e0e0",
                            color: "black",
                            ":hover": { background: "white" },
                          }}
                        >
                          Add
                        </Button>
                      }
                    />
                  </FormControl>
                </Stack>
                <Typography>Added students:</Typography>
                <AvatarGroup>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  <Avatar
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                  <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                  <Avatar>+3</Avatar>
                </AvatarGroup>

                <Stack display={"flex"} flexDirection={"row-reverse"} gap={1.5}>
                  <Button>Create Room</Button>
                  <Button color="neutral">Cancel</Button>
                </Stack>
              </Card>
            </Box>
          ) : (
            <Box
              className="join-room-container"
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <Card sx={{ m: "10%", width: "30vw", height: "30vh", gap: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography level="title-lg">Join Room</Typography>
                  <IconButton
                    sx={{ ":hover": { backgroundColor: "red" } }}
                    onClick={handleSmallWindow}
                  >
                    <CloseIcon />
                  </IconButton>
                </Box>

                <Stack
                  direction={"row"}
                  spacing={2}
                  alignSelf={"center"}
                  justifySelf={"center"}
                >
                  <FormControl>
                    <FormLabel>Group ID</FormLabel>
                    <Input sx={{ width: 300 }} />
                  </FormControl>
                </Stack>

                <Button
                  onClick={handleSmallWindow}
                  sx={{
                    width: 200,
                    alignSelf: "center",
                    justifySelf: "center",
                  }}
                >
                  Join Room
                </Button>
              </Card>
            </Box>
          )
        ) : (
          <Box
            className="message-container"
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "auto",
            }}
          >
            <Box
              sx={{
                p: 3,
                backgroundColor: "background.level1",
                alignItems: "center",
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <Stack direction={"row"} spacing={2} alignItems={"center"}>
                <Avatar />
                <Stack direction={"column"}>
                  <Typography fontWeight="bold">
                    High Performance Computing
                  </Typography>
                  <Typography level="body-sm">UCSH-603</Typography>
                </Stack>
              </Stack>

              <IconButton
                onClick={handleInfoWindow}
                variant="plain"
                color="neutral"
              >
                <InfoIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                flex: 1,
                overflow: "auto",
                paddingInline: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {messages.map((msg) => (
                <Box
                  key={msg.id}
                  sx={{
                    alignSelf: msg.sender === currentUser ? "flex-end" : "flex-start",
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection: msg.sender === currentUser ? "row-reverse" : "row",
                  }}
                >
                  <Stack
                    direction={msg.sender === currentUser ? "row-reverse" : "row"}
                    alignItems={"flex-end"}
                  >
                    <Avatar
                      size="sm"
                      variant="solid"
                      sx={{
                        bgcolor:
                          msg.sender === currentUser ? "primary.500" : "neutral.500",
                      }}
                    >
                      {msg.avatar}
                    </Avatar>
                    <Box sx={{ maxWidth: "80%", m: 1.5 }}>
                      <Typography
                        level="body-xs"
                        sx={{ mb: 0.5, color: "text.secondary" }}
                      >
                        {msg.sender}
                      </Typography>
                      <Card
                        variant={msg.sender === currentUser ? "solid" : "soft"}
                        color={msg.sender === currentUser ? "primary" : "neutral"}
                        sx={{
                          p: 1,
                          "--Card-radius":
                            msg.sender === currentUser
                              ? "16px 16px 0 16px"
                              : "16px 16px 16px 0",
                          boxShadow: "sm",
                        }}
                      >
                        <Typography sx={{ px: 1, py: 0.5 }}>
                          {msg.message}
                        </Typography>
                      </Card>
                    </Box>
                  </Stack>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            <Box
              sx={{
                p: 2,
                borderTop: "1px solid",
                borderColor: "divider",
                display: "flex",
                alignItems: "flex-end",
                gap: 1,
              }}
            >
              <Textarea
                placeholder="Type a message..."
                value={input}
                onChange={(e)=>{setInput(e.target.value)}}
                minRows={1}
                maxRows={4}
                sx={{ flex: 1 }}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
              />
              <IconButton
                size="lg"
                variant="plain"
                onClick={() => fileInputRef.current?.click()}
                sx={{ "&:hover": { bgcolor: "background.level1" } }}
              >
                <AttachFileIcon />
              </IconButton>
              <IconButton size="lg" variant="plain">
                <MicIcon />
              </IconButton>
              <IconButton onClick={sendMessage} size="lg" variant="solid" color="primary">
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        )}
        <Slide
          direction="left"
          in={toggleInfoWindow}
          mountOnEnter
          unmountOnExit
        >
          <Box sx={{ width: "15vw", p: 5 }}>
            <Stack direction={"column"}>
              <Stack alignItems={"center"} spacing={2}>
                <Avatar size="md" />
                <Typography>High Performance Computing</Typography>
                <Typography>UCSH-603</Typography>
              </Stack>
              <Box
                sx={{ marginTop: 10 }}
                display={"flex"}
                gap={2}
                flexDirection={"column"}
              >
                <Box
                  display={"flex"}
                  justifyContent="space-between"
                  alignItems={"center"}
                >
                  <Typography>Members</Typography>
                  <IconButton onClick={handleMemberIcon}>
                    <KeyboardArrowDownRoundedIcon
                      style={{
                        transform: toggleMemberIcon
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                        transition: "transform 0.3s",
                      }}
                    />
                  </IconButton>
                </Box>
                <Box>
                  <Box display={"flex"} alignItems={"center"} gap={1}>
                    <IconButton>
                      <AddRoundedIcon />
                    </IconButton>
                    <Typography>Add Members</Typography>
                  </Box>
                  <Collapse
                    in={toggleMemberIcon}
                    timeout={"auto"}
                    unmountOnExit
                  >
                    <Stack spacing={2} marginTop={2}>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={2}
                      >
                        <Avatar />
                        <Typography>Raj Guragain</Typography>
                      </Stack>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={2}
                      >
                        <Avatar />
                        <Typography>Raj Guragain</Typography>
                      </Stack>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={2}
                      >
                        <Avatar />
                        <Typography>Raj Guragain</Typography>
                      </Stack>
                      <Stack
                        direction={"row"}
                        alignItems={"center"}
                        spacing={2}
                      >
                        <Avatar />
                        <Typography>Raj Guragain</Typography>
                      </Stack>
                    </Stack>
                  </Collapse>
                </Box>
              </Box>
              <Box
                sx={{ marginTop: 5 }}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography>Attachments</Typography>
                <IconButton onClick={handleAttachmentIcon}>
                  <KeyboardArrowDownRoundedIcon
                    style={{
                      transform: toggleAttachmentIcon
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }}
                  />
                </IconButton>
              </Box>
              <Collapse
                in={toggleAttachmentIcon}
                timeout={"auto"}
                unmountOnExit
              >
                <Stack direction={"column"} spacing={2} marginTop={2}>
                  {attachments.map((file) => (
                    <Box
                      display={"flex"}
                      justifyContent="space-between"
                      alignItems={"center"}
                    >
                      <Typography>{file.name}</Typography>
                      <Box>
                        <IconButton>
                          <PreviewRounded />
                        </IconButton>
                        <IconButton download={file.url}>
                          <FileDownloadRounded />
                        </IconButton>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Collapse>
            </Stack>
          </Box>
        </Slide>
      </Stack>
      {/* </CardContent>
      </Card> */}
    </Box>
  );
}

export default Discussion;
