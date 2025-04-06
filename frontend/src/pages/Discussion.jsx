import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";
import { useEffect, useRef, useState } from "react";
import { attachments } from "../resources/DataList";
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
import GroupsIcon from "@mui/icons-material/Groups";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import FileDownloadRounded from "@mui/icons-material/FileDownloadRounded";
import PreviewRounded from "@mui/icons-material/VisibilityOutlined";
import SockJS from "sockjs-client";
import ForumIcon from "@mui/icons-material/Forum";

import { Stomp } from "@stomp/stompjs";

import Avatar from "@mui/joy/Avatar";
import AvatarGroup from "@mui/joy/AvatarGroup";
import {
  Collapse,
  FormControl,
  FormLabel,
  Modal,
  TextField,
} from "@mui/material";

import DiscussionService from "../services/DiscussionService";
import Button from "@mui/joy/Button";
import UserService from "../services/UserService";
import Input from "@mui/joy/Input";
import Autocomplete from "@mui/material/Autocomplete";
import Slide from "@mui/material/Slide";
import ClassService from "../services/ClassService";
import { useSelector } from "react-redux";
import AttachmentPreview from "../components/AttachmentPreview";

function JoinRoom({ closeFunction }) {
  const [groupIdData, setGroupIdData] = useState("");
  const regdNo = useSelector((state) => state.auth.username);
  const [error, setError] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await DiscussionService.joinGroupByGroupId(
        groupIdData,
        regdNo
      );
      if (response == null) {
        setError(true);
      } else {
        closeFunction();
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Box
      className="join-room-container"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Card sx={{ m: "10%", width: "30%", height: "30%", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography level="title-lg">Join Room</Typography>
          <IconButton
            sx={{ ":hover": { backgroundColor: "red" } }}
            onClick={closeFunction}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Stack>
          <FormControl sx={{ gap: 1.5 }}>
            <FormLabel>Group Id</FormLabel>
            <Input
              color={error ? "danger" : "neutral"}
              placeholder="Enter Group Id"
              value={groupIdData}
              onChange={(event) => {
                setGroupIdData(event.target.value);
              }}
              sx={{ backgroundColor: "#f6f8fa", p: 1.5 }}
            />
          </FormControl>
        </Stack>

        <Typography
          display={error ? "block" : "none"}
          alignSelf={"center"}
          color="danger"
        >
          Group not found!
        </Typography>

        <Button
          onClick={async () => {
            await handleSubmit();
          }}
          sx={{
            width: 150,
            alignSelf: "center",
            mt: 5,
          }}
        >
          Join Room
        </Button>
      </Card>
    </Box>
  );
}

function CreateRoom({ closeFunction, groupData, disableGroupInfo }) {
  const [classes, setClasses] = useState([]);
  const [indRegdNo, setIndRegdNo] = useState("");
  const teacherId = useSelector((state) => state.auth.username);
  const [createRoomData, setCreateRoomData] = useState({
    groupName: "",
    groupId: "",
  });

  const [addMemberData, setAddMemberData] = useState({
    batches: [],
    regdNoList: [],
  });
  const handleCreateRoom = async () => {
    const createRoom = {
      roomData: createRoomData,
      memberData: addMemberData,
      teacherId: teacherId,
    };
    try {
      const response = await DiscussionService.createRoom(createRoom);
      console.log(response);
      closeFunction();
    } catch (error) {
      console.log(error);
    }
  };
  const handleRegdNoInput = (event) => {
    setIndRegdNo(event.target.value);
  };

  const handleAddRegdNoInput = () => {
    if (indRegdNo.trim() !== "") {
      setAddMemberData((prevData) => ({
        ...prevData,
        regdNoList: [...prevData.regdNoList, indRegdNo.trim()],
      }));
      setIndRegdNo("");
    }
  };

  const getClasses = async () => {
    try {
      const result = await ClassService.getClasses();
      setClasses(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClasses();
  }, []);

  const handleInput = (event) => {
    if (disableGroupInfo) return;
    const { name, value } = event.target;
    setCreateRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (groupData) {
      setCreateRoomData({
        groupId: groupData.groupId,
        groupName: groupData.groupName,
      });
    }
  }, [groupData]);

  return (
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
            onClick={closeFunction}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Stack direction={"column"} spacing={2}>
          <FormControl sx={{ gap: 1.5 }}>
            <FormLabel>
              <Typography level="body-sm">Group Name</Typography>
            </FormLabel>
            <Input
              placeholder="Enter Group Name"
              name="groupName"
              value={createRoomData.groupName}
              disabled={disableGroupInfo}
              onChange={handleInput}
              sx={{ backgroundColor: "#f6f8fa", p: 1.5 }}
            />
          </FormControl>

          <FormControl sx={{ gap: 1.5 }}>
            <FormLabel>
              <Typography level="body-sm">Group ID</Typography>
            </FormLabel>
            <Input
              placeholder="Enter GroupId"
              name="groupId"
              value={createRoomData.groupId}
              disabled={disableGroupInfo}
              onChange={handleInput}
              sx={{ backgroundColor: "#f6f8fa", p: 1.5 }}
            />
          </FormControl>
          <FormControl sx={{ gap: 1.5 }}>
            <Autocomplete
              multiple
              options={classes}
              onChange={(event, newValue) => {
                setAddMemberData((prevData) => ({
                  ...prevData,
                  batches: newValue,
                }));
              }}
              renderInput={(params) => (
                <TextField
                  sx={{ backgroundColor: "#f6f8fa" }}
                  {...params}
                  label="Add Class"
                />
              )}
            />
          </FormControl>
          <FormControl sx={{ gap: 1.5 }}>
            <FormLabel>
              <Typography level="body-sm">Add Students by Regd No</Typography>
            </FormLabel>
            <Input
              sx={{ backgroundColor: "#f6f8fa", p: 1.5 }}
              value={indRegdNo}
              onChange={handleRegdNoInput}
              placeholder="Enter Regd No"
              endDecorator={
                <Button
                  onClick={handleAddRegdNoInput}
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
        <Typography>Added Regd No:</Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
          {addMemberData.regdNoList.map((regdNo) => (
            <Typography color="neutral" level="body-sm" variant="solid">
              {regdNo}
            </Typography>
          ))}
        </Box>

        <Stack display={"flex"} flexDirection={"row-reverse"} gap={1.5}>
          <Button onClick={handleCreateRoom}>Create Room</Button>
          <Button color="neutral" onClick={closeFunction}>
            Cancel
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
// function Discussion() {
//   const [toggleSmallWindow, setToggleSmallWindow] = useState(false);
//   const [toggleInfoWindow, setToggleInfoWindow] = useState(false);
//   const [toggleMemberIcon, setToggleMemberIcon] = useState(false);
//   const [toggleAttachmentIcon, setToggleAttachmentIcon] = useState(false);
//   const [sidebarData, setSidebarData] = useState([]);
//   const [groupId, setgroupId] = useState("");
//   const [stompClient, setStompClient] = useState(null);
//   const [input, setInput] = useState("");
//   const userId = useSelector((state)=> state.auth.username);
//   // const [userId, setUserId] = useState("teacher123"); //need to get from redux
//   const [messages, setMessages] = useState([]);
//   const [participants, setParticipants] = useState([]);
//   const [addMemberWindow, setAddMemberWindow] = useState(false);
//   const [selectedGroup, setSelectedGroup] = useState({
//     groupName: "",
//     groupId: "",
//   });

//   const currentUser = localStorage.getItem("username");
//   const role = localStorage.getItem("role");
//   // const groupId = "67a9d177de4a6b84a7c86873";
//   const messagesEndRef = useRef(null);
//   const fileInputRef = useRef(null);

//   const handleAttachmentIcon = () => {
//     setToggleAttachmentIcon((prevBool) => !prevBool);
//   };

//   const handleInfoWindow = () => {
//     setToggleInfoWindow((prevBool) => !prevBool);
//   };
//   const handleMemberIcon = () => {
//     setToggleMemberIcon((prevBool) => !prevBool);
//   };

//   const handleSmallWindow = () => {
//     setToggleSmallWindow((prevBool) => !prevBool);
//   };

//   const handleAddMember = () => {
//     setAddMemberWindow((prevBool) => !prevBool);
//   };
//   useEffect(() => {
//     if (!groupId) return;

//     const token = localStorage.getItem("token");
//     const sock = new SockJS(`${UserService.BASE_URL}/chat?token=${token}`);
//     const client = Stomp.over(sock);
//     let subscription;

//     client.connect({}, () => {
//       setStompClient(client);
//       subscription = client.subscribe(`/topic/group/${groupId}`, (message) => {
//         const newMessage = JSON.parse(message.body);
//         setMessages((prev) => [...prev, newMessage]);
//         setSidebarData((prevSidebar) =>
//           prevSidebar.map((chat) =>
//             chat.groupId === groupId
//               ? { ...chat, lastMessage: newMessage.message }
//               : chat
//           )
//         );
//       });
//     });

//     return () => {
//       if (subscription) {
//         subscription.unsubscribe();
//       }
//       if (client) {
//         client.disconnect();
//       }
//     };
//   }, [groupId]);

//   useEffect(() => {
//     async function fetchParticipants() {
//       const result = await DiscussionService.getParticipants(groupId);
//       setParticipants(result);
//     }
//     fetchParticipants();
//   }, [selectedGroup]);

//   const fetchGroupListByStudent = async () => {
//     const response = await DiscussionService.getGroupListByStudent(userId);
//     setSidebarData(response);
//   };

//   const fetchGroupListByTeacher = async () => {
//     const response = await DiscussionService.getGroupListByTeacher(userId);
//     setSidebarData(response);
//   };

//   useEffect(() => {

//       if (role === "STUDENT") {
//         fetchGroupListByStudent();
//       } else if (role === "TEACHER") {
//         fetchGroupListByTeacher();
//       }
//   }, [groupId, userId]);

//   const sendMessage = async () => {
//     if (stompClient) {
//       const message = {
//         sender: currentUser,
//         message: input,
//         groupId: groupId,
//       };

//       stompClient.send(
//         `/app/sendMessage/${groupId}`,
//         {},
//         JSON.stringify(message),
//         {}
//       );
//       setInput("");

//       setSidebarData((prevSidebar) =>
//         prevSidebar.map((chat) =>
//           chat.roomId === groupId
//             ? { ...chat, lastMessage: message.message }
//             : chat
//         )
//       );
//     }
//   };
//   useEffect(() => {
//     if (sidebarData != null) {
//       setSelectedGroup(sidebarData.find((chat) => chat.groupId === groupId));
//     }
//     console.log(selectedGroup);
//   }, [groupId, sidebarData]);

//   useEffect(() => {
//     async function fetchData() {
//       let response;
//       if (role === "TEACHER") {
//         response = await DiscussionService.getMessagesByTeacher(
//           groupId,
//           userId
//         );
//       } else {
//         response = await DiscussionService.getMessagesByStudent(
//           groupId,
//           userId
//         );
//       }
//       setMessages(response);
//     }
//     if (groupId) {
//       fetchData();
//     }
//   }, [groupId]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
//   }, [messages, toggleSmallWindow]);

//   return (
//     <Box
//       sx={{
//         height: "100%",
//         width: "100%",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Stack direction="row" gap={2} sx={{ width: "100%", height: "100%" }}>
//         {/* Sidebar */}
//         <Card
//           sx={{
//             width: "20vw",
//             height: "100%",
//             pl: "1rem",
//             borderRight: "1px solid",
//             borderColor: "divider",
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <Box
//             sx={{
//               mt: 2,
//               mr: 2,
//               pb: 2,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <Typography level="h2" color="primary">
//               Messages
//             </Typography>

//             {UserService.isTeacher() ? (
//               <IconButton onClick={handleSmallWindow}>
//                 <AddIcon />
//               </IconButton>
//             ) : (
//               <Button onClick={handleSmallWindow}>Join Room</Button>
//             )}
//           </Box>

//           <Input
//             startDecorator={<SearchIcon />}
//             placeholder="Search..."
//             size="sm"
//             sx={{ width: 300, backgroundColor: "background.level1", p: 1 }}
//           />
//           <Box
//             sx={{
//               overflow: "auto",
//               overflowX: "hidden",
//               flex: 1,
//               mt: "2rem",
//               mr: "1rem",
//             }}
//           >
//             <Stack spacing={2}>
//               {sidebarData != null && sidebarData.length > 0 ? (
//                 sidebarData.map((chat, index) => (
//                   <Card
//                     key={chat.groupId}
//                     onClick={() => {
//                       setgroupId(chat.groupId);
//                     }}
//                     sx={{
//                       border: "none",
//                       display: "flex",
//                       pl: 1,
//                       cursor: "pointer",
//                       "&:hover": { bgcolor: "background.level1" },
//                     }}
//                   >
//                     <CardContent>
//                       <Stack direction={"row"} spacing={2}>
//                         <Avatar />
//                         <Stack>
//                           <Typography fontWeight="bold">
//                             {chat.groupName}
//                           </Typography>
//                           <Typography
//                             level="body-sm"
//                             noWrap
//                             overflow={"hidden"}
//                             width={200}
//                           >
//                             {chat.lastMessage}
//                           </Typography>
//                         </Stack>
//                       </Stack>
//                     </CardContent>
//                   </Card>
//                 ))
//               ) : (
//                 <>
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       top: "50%",
//                       left: "50%",
//                       transform: "translate(-50%, -50%)",
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                     }}
//                   >
//                     <GroupsIcon sx={{ height: 80, width: 80 }} />
//                     <Typography level="body-sm">No Groups to show</Typography>
//                   </Box>
//                 </>
//               )}
//             </Stack>
//           </Box>
//         </Card>
//         <Modal open={toggleSmallWindow} onClose={handleSmallWindow}>
//           {UserService.isTeacher() ? (
//             <CreateRoom closeFunction={handleSmallWindow} />
//           ) : (
//             <JoinRoom closeFunction={handleSmallWindow} />
//           )}
//         </Modal>
//         <Card
//           className="message-container"
//           sx={{
//             flex: 1,
//             display: "flex",
//             flexDirection: "column",
//             height: "100%",
//             width: "auto",
//           }}
//         >
//           <Box
//             sx={{
//               p: 3,
//               backgroundColor: "background.level1",
//               alignItems: "center",
//               justifyContent: "space-between",
//               display: "flex",
//             }}
//           >
//             <Stack direction={"row"} spacing={2} alignItems={"center"}>
//               <Avatar />
//               <Stack direction={"column"}>
//                 <Typography fontWeight="bold">
//                   {selectedGroup ? selectedGroup.groupName : ""}
//                 </Typography>
//                 <Typography level="body-sm">
//                   {selectedGroup ? selectedGroup.groupId : ""}
//                 </Typography>
//               </Stack>
//             </Stack>

//             <IconButton
//               onClick={handleInfoWindow}
//               variant="plain"
//               color="neutral"
//               disabled={selectedGroup == null}
//             >
//               <InfoIcon />
//             </IconButton>
//           </Box>

//           <Box
//             sx={{
//               flex: 1,
//               overflow: "auto",
//               paddingInline: 3,
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//             }}
//           >
//             {messages != null && messages.length > 0 ? (
//               messages.map((msg) => (
//                 <Box
//                   key={msg.id}
//                   sx={{
//                     alignSelf:
//                       msg.sender === currentUser ? "flex-end" : "flex-start",
//                     display: "flex",
//                     alignItems: "flex-end",
//                     flexDirection:
//                       msg.sender === currentUser ? "row-reverse" : "row",
//                   }}
//                 >
//                   <Stack
//                     direction={
//                       msg.sender === currentUser ? "row-reverse" : "row"
//                     }
//                     alignItems={"flex-end"}
//                   >
//                     <Avatar
//                       size="sm"
//                       variant="solid"
//                       sx={{
//                         bgcolor:
//                           msg.sender === currentUser
//                             ? "primary.500"
//                             : "neutral.500",
//                       }}
//                     >
//                       {msg.avatar}
//                     </Avatar>
//                     <Box sx={{ maxWidth: "80%", m: 1.5 }}>
//                       <Typography
//                         level="body-xs"
//                         sx={{ mb: 0.5, color: "text.secondary" }}
//                       >
//                         {msg.sender}
//                       </Typography>
//                       <Card
//                         variant={msg.sender === currentUser ? "solid" : "soft"}
//                         color={
//                           msg.sender === currentUser ? "primary" : "neutral"
//                         }
//                         sx={{
//                           p: 1,
//                           "--Card-radius":
//                             msg.sender === currentUser
//                               ? "16px 16px 0 16px"
//                               : "16px 16px 16px 0",
//                           boxShadow: "sm",
//                         }}
//                       >
//                         <Typography color="white" sx={{ px: 1, py: 0.5 }}>
//                           {msg.message}
//                         </Typography>
//                       </Card>
//                     </Box>
//                   </Stack>
//                 </Box>
//               ))
//             ) : (
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: "50%",
//                   left: "60%",
//                   transform: "translate(-50%, -50%)",
//                   display: "flex",
//                   flexDirection: "column",
//                   alignItems: "center",
//                 }}
//               >
//                 <ForumIcon sx={{ height: 80, width: 80 }} />
//                 <Typography level="body-sm">No Messages to show</Typography>
//               </Box>
//             )}
//             <div ref={messagesEndRef} />
//           </Box>

//           <Box
//             sx={{
//               p: 2,
//               borderTop: "1px solid",
//               borderColor: "divider",
//               display: "flex",
//               alignItems: "flex-end",
//               gap: 1,
//             }}
//           >
//             <Textarea
//               placeholder="Type a message..."
//               value={input}
//               onKeyDown={(event) => {
//                 if (event.key === "Enter" && !event.shiftKey) {
//                   event.preventDefault();
//                   sendMessage();
//                 }
//               }}
//               onChange={(e) => {
//                 setInput(e.target.value);
//               }}
//               minRows={1}
//               maxRows={4}
//               sx={{ flex: 1 }}
//             />
//             <input type="file" ref={fileInputRef} style={{ display: "none" }} />
//             <IconButton
//               size="lg"
//               variant="plain"
//               onClick={() => fileInputRef.current?.click()}
//               sx={{ "&:hover": { bgcolor: "background.level1" } }}
//             >
//               <AttachFileIcon />
//             </IconButton>
//             <IconButton size="lg" variant="plain">
//               <MicIcon />
//             </IconButton>
//             <IconButton
//               onClick={sendMessage}
//               size="lg"
//               variant="solid"
//               color="primary"
//             >
//               <SendIcon />
//             </IconButton>
//           </Box>
//         </Card>
//         {/* )} */}
//         <Slide
//           direction="left"
//           in={toggleInfoWindow}
//           mountOnEnter
//           unmountOnExit
//         >
//           <Box sx={{ width: "20vw", p: 5, overflow:'scroll' }}>
//             <Stack direction={"column"}>
//               <Stack alignItems={"center"} spacing={2}>
//                 <Avatar size="md" />
//                 <Typography>
//                   {selectedGroup ? selectedGroup.groupName : ""}
//                 </Typography>
//                 <Typography>
//                   {selectedGroup ? selectedGroup.groupId : ""}
//                 </Typography>
//               </Stack>
//               <Box
//                 sx={{ marginTop: 10 }}
//                 display={"flex"}
//                 gap={2}
//                 flexDirection={"column"}
//               >
//                 <Box
//                   display={"flex"}
//                   justifyContent="space-between"
//                   alignItems={"center"}
//                 >
//                   <Typography>Members</Typography>
//                   <IconButton onClick={handleMemberIcon}>
//                     <KeyboardArrowDownRoundedIcon
//                       style={{
//                         transform: toggleMemberIcon
//                           ? "rotate(180deg)"
//                           : "rotate(0deg)",
//                         transition: "transform 0.3s",
//                       }}
//                     />
//                   </IconButton>
//                 </Box>
//                 <Box>
//                   <Box display={"flex"} alignItems={"center"} gap={1}>
//                     {UserService.isTeacher() ? (
//                       <>
//                         <IconButton onClick={handleAddMember}>
//                           <AddRoundedIcon />
//                         </IconButton>
//                         <Typography>Add Members</Typography>

//                         <Modal open={addMemberWindow} onClose={handleAddMember}>
//                           <CreateRoom
//                             closeFunction={handleAddMember}
//                             groupData={selectedGroup}
//                             disableGroupInfo={true}
//                           />
//                         </Modal>
//                       </>
//                     ) : (
//                       <></>
//                     )}
//                   </Box>
//                   <Collapse
//                     in={toggleMemberIcon}
//                     timeout={"auto"}
//                     unmountOnExit
//                   >
//                     <Stack spacing={2} marginTop={2}>
//                       {participants && participants.length > 0 ? (
//                         participants.map((participant) => (
//                           <Stack
//                             key={participant.id}
//                             direction="row"
//                             alignItems="center"
//                             spacing={2}
//                           >
//                             <Avatar
//                               src={participant.avatar}
//                               alt={participant.name}
//                             />
//                             <Typography>{participant.name}</Typography>
//                           </Stack>
//                         ))
//                       ) : (
//                         <Typography>No members are in the group.</Typography>
//                       )}
//                     </Stack>
//                   </Collapse>
//                 </Box>
//               </Box>
//               <Box
//                 sx={{ marginTop: 5 }}
//                 display={"flex"}
//                 justifyContent={"space-between"}
//                 alignItems={"center"}
//               >
//                 <Typography>Attachments</Typography>
//                 <IconButton onClick={handleAttachmentIcon}>
//                   <KeyboardArrowDownRoundedIcon
//                     style={{
//                       transform: toggleAttachmentIcon
//                         ? "rotate(180deg)"
//                         : "rotate(0deg)",
//                       transition: "transform 0.3s",
//                     }}
//                   />
//                 </IconButton>
//               </Box>
//               <Collapse
//                 in={toggleAttachmentIcon}
//                 timeout={"auto"}
//                 unmountOnExit
//               >
//                 <Stack direction={"column"} spacing={2} marginTop={2}>
//                   {attachments.map((file) => (
//                     <Box
//                       display={"flex"}
//                       justifyContent="space-between"
//                       alignItems={"center"}
//                     >
//                       <Typography>{file.name}</Typography>
//                       <Box>
//                         <IconButton>
//                           <PreviewRounded />
//                         </IconButton>
//                         <IconButton download={file.url}>
//                           <FileDownloadRounded />
//                         </IconButton>
//                       </Box>
//                     </Box>
//                   ))}
//                 </Stack>
//               </Collapse>
//             </Stack>
//           </Box>
//         </Slide>
//       </Stack>
//       {/* </CardContent>
//       </Card> */}
//     </Box>
//   );
// }

// export default Discussion;

function Discussion() {
  const [toggleSmallWindow, setToggleSmallWindow] = useState(false);
  const [toggleInfoWindow, setToggleInfoWindow] = useState(false);
  const [toggleMemberIcon, setToggleMemberIcon] = useState(false);
  const [toggleAttachmentIcon, setToggleAttachmentIcon] = useState(false);
  const [sidebarData, setSidebarData] = useState([]);
  const [groupId, setGroupId] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [addMemberWindow, setAddMemberWindow] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({
    groupName: "",
    groupId: "",
  });

  // Attachment-related states for previewing before sending
  const [attachment, setAttachment] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [attachmentType, setAttachmentType] = useState("");

  const currentUser = localStorage.getItem("username");
  const role = localStorage.getItem("role");
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

  const handleAddMember = () => {
    setAddMemberWindow((prevBool) => !prevBool);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Get only the Base64 string from the data URL.
        const base64String = reader.result.split(",")[1];
        setAttachment(base64String);
        setAttachmentName(file.name);
        setAttachmentType(file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAttachment = () => {
    setAttachment("");
    setAttachmentName("");
    setAttachmentType("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Render preview based on attachment type
  const renderAttachmentPreview = () => {
    const previewUrl = `data:${attachmentType};base64,${attachment}`;
    if (attachmentType.startsWith("image")) {
      return (
        <img
          src={previewUrl}
          alt={attachmentName}
          style={{ maxWidth: "200px", borderRadius: "8px" }}
        />
      );
    } else if (attachmentType.startsWith("video")) {
      return (
        <video controls style={{ maxWidth: "200px", borderRadius: "8px" }}>
          <source src={previewUrl} type={attachmentType} />
          Your browser does not support the video tag.
        </video>
      );
    } else if (attachmentType.startsWith("audio")) {
      return (
        <audio controls style={{ width: "200px" }}>
          <source src={previewUrl} type={attachmentType} />
          Your browser does not support the audio element.
        </audio>
      );
    } else {
      // For other file types, just display file name and an icon
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FileDownloadRounded />
          <Typography sx={{ ml: 1 }}>{attachmentName}</Typography>
        </Box>
      );
    }
  };

  useEffect(() => {
    if (!groupId) return;

    const token = localStorage.getItem("token");
    const sock = new SockJS(`${UserService.BASE_URL}/chat?token=${token}`);
    const client = Stomp.over(sock);
    let subscription;

    client.connect({}, () => {
      setStompClient(client);
      subscription = client.subscribe(`/topic/group/${groupId}`, (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prev) => [...prev, newMessage]);
        setSidebarData((prevSidebar) =>
          prevSidebar.map((chat) =>
            chat.groupId === groupId
              ? { ...chat, lastMessage: newMessage.message }
              : chat
          )
        );
      });
    });

    return () => {
      if (subscription) subscription.unsubscribe();
      if (client) client.disconnect();
    };
  }, [groupId]);

  useEffect(() => {
    async function fetchParticipants() {
      const result = await DiscussionService.getParticipants(groupId);
      setParticipants(result);
    }
    fetchParticipants();
  }, [selectedGroup]);

  const fetchGroupListByStudent = async () => {
    const response = await DiscussionService.getGroupListByStudent(currentUser);
    setSidebarData(response);
  };

  const fetchGroupListByTeacher = async () => {
    const response = await DiscussionService.getGroupListByTeacher(currentUser);
    setSidebarData(response);
  };

  useEffect(() => {
    if (role === "STUDENT") {
      fetchGroupListByStudent();
    } else if (role === "TEACHER") {
      fetchGroupListByTeacher();
    }
  }, [groupId, currentUser, role]);


  const sendMessage = async () => {
    if (stompClient) {
      const messageObj = {
        sender: currentUser,
        message: input,
        groupId: groupId,
        attachment: attachment,
        attachmentName: attachmentName,
        attachmentType: attachmentType,
      };
      try {
        stompClient.send(
          `/app/sendMessage/${groupId}`,
          {},
          JSON.stringify(messageObj)
        );
      } catch (err) {
        console.error("STOMP send error:", err);
      }
      setInput("");
      removeAttachment();
      setSidebarData((prevSidebar) =>
        prevSidebar.map((chat) =>
          chat.roomId === groupId
            ? { ...chat, lastMessage: messageObj.message }
            : chat
        )
      );
    }
  };

  useEffect(() => {
    if (sidebarData != null) {
      setSelectedGroup(sidebarData.find((chat) => chat.groupId === groupId));
    }
  }, [groupId, sidebarData]);

  useEffect(() => {
    async function fetchData() {
      let response;
      if (role === "TEACHER") {
        response = await DiscussionService.getMessagesByTeacher(
          groupId,
          currentUser
        );
      } else {
        response = await DiscussionService.getMessagesByStudent(
          groupId,
          currentUser
        );
      }
      setMessages(response);
    }
    if (groupId) fetchData();
  }, [groupId, currentUser, role]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages, toggleSmallWindow]);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack direction="row" gap={2} sx={{ width: "100%", height: "100%" }}>
        {/* Sidebar */}
        <Card
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
              {sidebarData && sidebarData.length > 0 ? (
                sidebarData.map((chat) => (
                  <Card
                    key={chat.groupId}
                    onClick={() => {
                      setGroupId(chat.groupId);
                    }}
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
                            {chat.groupName}
                          </Typography>
                          <Typography
                            level="body-sm"
                            noWrap
                            overflow={"hidden"}
                            width={200}
                          >
                            {chat.lastMessage}
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <GroupsIcon sx={{ height: 80, width: 80 }} />
                  <Typography level="body-sm">No Groups to show</Typography>
                </Box>
              )}
            </Stack>
          </Box>
        </Card>

        <Modal open={toggleSmallWindow} onClose={handleSmallWindow}>
          {UserService.isTeacher() ? (
            <CreateRoom closeFunction={handleSmallWindow} />
          ) : (
            <JoinRoom closeFunction={handleSmallWindow} />
          )}
        </Modal>

        <Card
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
                  {selectedGroup ? selectedGroup.groupName : ""}
                </Typography>
                <Typography level="body-sm">
                  {selectedGroup ? selectedGroup.groupId : ""}
                </Typography>
              </Stack>
            </Stack>
            <IconButton
              onClick={handleInfoWindow}
              variant="plain"
              color="neutral"
              disabled={!selectedGroup}
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
            {messages && messages.length > 0 ? (
              messages.map((msg) => (
                <Box
                  key={msg.id || msg.timestamp}
                  sx={{
                    alignSelf:
                      msg.sender === currentUser ? "flex-end" : "flex-start",
                    display: "flex",
                    alignItems: "flex-end",
                    flexDirection:
                      msg.sender === currentUser ? "row-reverse" : "row",
                  }}
                >
                  <Stack
                    direction={
                      msg.sender === currentUser ? "row-reverse" : "row"
                    }
                    alignItems={"flex-end"}
                  >
                    <Avatar
                      size="sm"
                      variant="solid"
                      sx={{
                        bgcolor:
                          msg.sender === currentUser
                            ? "primary.500"
                            : "neutral.500",
                      }}
                    >
                      {msg.avatar || msg.sender[0]}
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
                        color={
                          msg.sender === currentUser ? "primary" : "neutral"
                        }
                        sx={{
                          p: 1,
                          "--Card-radius":
                            msg.sender === currentUser
                              ? "16px 16px 0 16px"
                              : "16px 16px 16px 0",
                          boxShadow: "sm",
                        }}
                      >
                        <Typography color="white" sx={{ px: 1, py: 0.5 }}>
                          {msg.message}
                        </Typography>
                        {msg.attachmentFileId && (
                          <Box mt={1}>
                            <AttachmentPreview
                              attachmentFileId={msg.attachmentFileId}
                              attachmentName={msg.attachmentName}
                            />
                          </Box>
                        )}
                      </Card>
                    </Box>
                  </Stack>
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "60%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ForumIcon sx={{ height: 80, width: 80 }} />
                <Typography level="body-sm">No Messages to show</Typography>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </Box>

          <Box
            sx={{
              p: 2,
              borderTop: "1px solid",
              borderColor: "divider",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {/* Attachment Preview Area */}
            {attachment && (
              <Box
                sx={{
                  mb: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                {renderAttachmentPreview()}
                <Button
                  size="sm"
                  color="danger"
                  onClick={removeAttachment}
                  sx={{ mt: 0.5 }}
                >
                  Remove Attachment
                </Button>
              </Box>
            )}

            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 1 }}>
              <Textarea
                placeholder="Type a message..."
                value={input}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                minRows={1}
                maxRows={4}
                sx={{ flex: 1 }}
              />
              {/* File input for attachments */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
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
              <IconButton
                onClick={sendMessage}
                size="lg"
                variant="solid"
                color="primary"
              >
                <SendIcon />
              </IconButton>
            </Box>
          </Box>
        </Card>

        <Slide direction="left" in={toggleInfoWindow} mountOnEnter unmountOnExit>
          <Box sx={{ width: "20vw", p: 5, overflow: "scroll" }}>
            <Stack direction={"column"}>
              <Stack alignItems={"center"} spacing={2}>
                <Avatar size="md" />
                <Typography>{selectedGroup ? selectedGroup.groupName : ""}</Typography>
                <Typography>{selectedGroup ? selectedGroup.groupId : ""}</Typography>
              </Stack>
              <Box sx={{ marginTop: 10 }} display={"flex"} gap={2} flexDirection={"column"}>
                <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
                  <Typography>Members</Typography>
                  <IconButton onClick={handleMemberIcon}>
                    <KeyboardArrowDownRoundedIcon
                      style={{
                        transform: toggleMemberIcon ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s",
                      }}
                    />
                  </IconButton>
                </Box>
                <Box>
                  <Box display={"flex"} alignItems={"center"} gap={1}>
                    {UserService.isTeacher() && (
                      <>
                        <IconButton onClick={handleAddMember}>
                          <AddIcon />
                        </IconButton>
                        <Typography>Add Members</Typography>
                        <Modal open={addMemberWindow} onClose={handleAddMember}>
                          <CreateRoom closeFunction={handleAddMember} groupData={selectedGroup} disableGroupInfo={true} />
                        </Modal>
                      </>
                    )}
                  </Box>
                  <Collapse in={toggleMemberIcon} timeout={"auto"} unmountOnExit>
                    <Stack spacing={2} marginTop={2}>
                      {participants && participants.length > 0 ? (
                        participants.map((participant) => (
                          <Stack key={participant.id} direction="row" alignItems="center" spacing={2}>
                            <Avatar src={participant.avatar} alt={participant.name} />
                            <Typography>{participant.name}</Typography>
                          </Stack>
                        ))
                      ) : (
                        <Typography>No members are in the group.</Typography>
                      )}
                    </Stack>
                  </Collapse>
                </Box>
              </Box>
              <Box sx={{ marginTop: 5 }} display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography>Attachments</Typography>
                <IconButton onClick={handleAttachmentIcon}>
                  <KeyboardArrowDownRoundedIcon
                    style={{
                      transform: toggleAttachmentIcon ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s",
                    }}
                  />
                </IconButton>
              </Box>
              <Collapse in={toggleAttachmentIcon} timeout={"auto"} unmountOnExit>
                <Stack direction={"column"} spacing={2} marginTop={2}>
                  {messages
                    .filter((msg) => msg.attachmentFileId)
                    .map((msg, index) => (
                      <Box key={index} display={"flex"} justifyContent="space-between" alignItems={"center"}>
                        <Typography>{msg.attachmentName || "Attachment"}</Typography>
                        <Box>
                          <IconButton>
                            <PreviewRounded />
                          </IconButton>
                          <IconButton
                            component="a"
                            href={`http://localhost:8080/api/messages/attachment/${msg.attachmentFileId}`}
                            download
                          >
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
    </Box>
  );
}

export default Discussion;