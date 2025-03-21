import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  DialogContentText,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { BellRing, Plus, Trash2, Calendar } from "lucide-react";
import axios from "axios";
import UserService from "../services/UserService";
import { useSelector } from "react-redux";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NoticeCard = ({ notice, onDelete }) => {
  const theme = useTheme();
  const { role } = useSelector((state) => state.auth || {});
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState(null);

  const getRandomColor = (id) => {
    const colors = [
      "primary",
      "secondary",
      "error",
      "warning",
      "info",
      "success",
    ];
    if (!id) return colors[0];

    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const handleDeleteClick = (id) => {
    setSelectedNoticeId(id);
    setDeleteDialogOpen(true);
  };

  return (
    <Card
      sx={{
        transition: "all 0.3s",
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <BellRing
            size={24}
            color={theme.palette[getRandomColor(notice.id)].main}
          />
          <Typography variant="h6" sx={{ ml: 1.5, flex: 1 }}>
            {notice.noticeTitle}
          </Typography>

          {role !== "STUDENT" && (
            <Tooltip title="Delete Notice">
              <IconButton
                size="small"
                color="error"
                onClick={() => handleDeleteClick(notice.id)}
              >
                <Trash2 size={18} />
              </IconButton>
            </Tooltip>
          )}

          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
            slots={{ transition: Transition }}
          >
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this notice?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => onDelete(selectedNoticeId)}
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {notice.noticeContent}
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "text.secondary",
          }}
        >
          <Calendar size={16} />
          <Typography variant="caption" sx={{ ml: 1 }}>
            Added on:{" "}
            {new Date(notice.issueDate).toLocaleDateString("en-GB", {
              dateStyle: "full",
            })}
          </Typography>
          <Box sx={{ ml: 4, display: "flex", flexDirection: "column",width:'50%' }}>
            <Typography variant="caption">
              - {notice.issuedBy.firstName} {notice.issuedBy.lastName}
            </Typography>
            <Typography variant="caption"sx={{ ml: 1 }}>{notice.issuedBy.title}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const NoticeBoard = () => {
  const [open, setOpen] = useState(false);
  const [Notices, setNotices] = useState([]);
  const [error, setError] = useState(null);
  const [newNotice, setNewNotice] = useState({ title: "", content: "" });
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { role } = useSelector((state) => state.auth || {});
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchNotices = async () => {
      if (!token) return;

      try {
        const response = await axios.get(
          `${UserService.BASE_URL}/admin/getNotices`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setNotices(response.data);
      } catch (err) {
        setError("Failed to fetch notices");
        console.log(err);
      }
    };

    fetchNotices();
  }, [token]);

  const handleDeleteNotice = async (id) => {
    try {
      await axios.delete(`${UserService.BASE_URL}/admin/deleteNotice/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setNotices(Notices.filter((notice) => notice.id !== id));
    } catch {
      alert("Failed to delete notice. Please try again.");
    }
  };

  const handleAddNotice = async () => {
    if (!newNotice.title.trim() || !newNotice.content.trim()) return;

    const newEntry = {
      issuedBy: {
        firstName: "Sunil",
        lastName: "Williams",
        title: "AHOD",
        department: "Computer Science",
      },
      noticeTitle: newNotice.title,
      noticeContent: newNotice.content,
    };

    try {
      const response = await axios.post(
        `${UserService.BASE_URL}/admin/addNotice`,
        newEntry,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const savedNotice = response.data;
      setNotices((prevNotices) => [savedNotice, ...prevNotices]);
      setNewNotice({ title: "", content: "" });
      setOpen(false);
    } catch (err) {
      console.error("Error adding notice:", err);
    }
  };

  return (
    <Box
      sx={{
        height: "auto",
        bgcolor: "background.default",
        p: { xs: 2, sm: 3, md: 4 },
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
          gap: 2,
          mb: 3,
          backgroundColor: "white",
          borderRadius: 2,
          p: 2,
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          Notice Board
        </Typography>
        {role !== "STUDENT" && (
          <Button
            variant="contained"
            startIcon={<Plus />}
            onClick={() => setOpen(true)}
          >
            Add Notice
          </Button>
        )}
      </Box>

      {/* Notices List */}
      <Box
        sx={{
          flex: 1,
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(auto-fit, minmax(280px, 1fr))",
            md: "repeat(auto-fit, minmax(300px, 1fr))",
          },
        }}
      >
        {error ? (
          <Typography color="error" variant="body1">
            {error}
          </Typography>
        ) : (
          Notices.map((notice) => (
            <NoticeCard
              key={notice.id}
              notice={notice}
              onDelete={handleDeleteNotice}
            />
          ))
        )}
      </Box>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Add New Notice</DialogTitle>
        <DialogContent sx={{ mt: 2, overflow: "visible" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Title"
              fullWidth
              variant="outlined"
              value={newNotice.title}
              onChange={(e) =>
                setNewNotice({ ...newNotice, title: e.target.value })
              }
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={newNotice.content}
              onChange={(e) =>
                setNewNotice({ ...newNotice, content: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddNotice}>
            Add Notice
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NoticeBoard;
