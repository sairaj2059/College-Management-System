import React, { useState } from 'react';
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
  useTheme,
  useMediaQuery,
  Fab,
  Zoom,
  Tooltip,
  alpha
} from '@mui/material';
import { BellRing, Plus, Trash2, Calendar } from 'lucide-react';

const notices = [
  {
    id: 1,
    title: "Exam Schedule",
    description: "Final exams will commence from April 15th. Check the timetable on the university portal.",
    date: "22/02/24"
  },
  {
    id: 2,
    title: "Holiday Announcement",
    description: "The university will remain closed on March 25th for the national holiday.",
    date: "22/02/24"
  },
  {
    id: 3,
    title: "Library Timings",
    description: "Library will now be open from 8 AM to 10 PM on weekdays.",
    date: "22/02/24"
  },
  {
    id: 4,
    title: "Guest Lecture",
    description: "A guest lecture on emerging technologies will be held in the main auditorium.",
    date: "23/02/24"
  },
  {
    id: 5,
    title: "Sports Day",
    description: "The annual Sports Day will be organized on campus with various events.",
    date: "24/02/24"
  },
  {
    id: 6,
    title: "Seminar on AI",
    description: "Join the seminar on Artificial Intelligence in the science block.",
    date: "24/02/24"
  },
  {
    id: 7,
    title: "Workshop on Robotics",
    description: "A hands-on workshop on robotics will be conducted in lab 3.",
    date: "25/02/24"
  },
  {
    id: 8,
    title: "Career Fair",
    description: "Attend the career fair to explore internship and job opportunities.",
    date: "25/02/24"
  },
  {
    id: 9,
    title: "Alumni Meetup",
    description: "Reconnect with alumni at the evening meetup in the campus center.",
    date: "26/02/24"
  },
  {
    id: 10,
    title: "Cultural Fest",
    description: "Celebrate diverse cultures at the annual cultural fest next week.",
    date: "26/02/24"
  },
  {
    id: 11,
    title: "New Course Launch",
    description: "A new course on data science will be introduced this semester.",
    date: "27/02/24"
  },
  {
    id: 12,
    title: "Lab Renovation",
    description: "Science labs will be temporarily closed for renovation starting Monday.",
    date: "27/02/24"
  },
  {
    id: 13,
    title: "Research Grant",
    description: "Faculty members can apply for new research grants; details are on the portal.",
    date: "28/02/24"
  },
  {
    id: 14,
    title: "Student Council Elections",
    description: "Elections for the student council will take place next month.",
    date: "28/02/24"
  },
  {
    id: 15,
    title: "Internship Opportunities",
    description: "Various companies are offering internships; check out the opportunities.",
    date: "01/03/24"
  },
  {
    id: 16,
    title: "COVID-19 Guidelines",
    description: "Updated COVID-19 guidelines have been posted on the university website.",
    date: "01/03/24"
  },
  {
    id: 17,
    title: "Scholarship Announcement",
    description: "New scholarship programs are available for eligible students.",
    date: "02/03/24"
  },
  {
    id: 18,
    title: "Fee Payment Reminder",
    description: "Reminder: Fee payments are due by the end of this week.",
    date: "02/03/24"
  },
  {
    id: 19,
    title: "Hostel Notice",
    description: "Hostel maintenance work will be carried out over the weekend.",
    date: "03/03/24"
  },
  {
    id: 20,
    title: "Maintenance Update",
    description: "Campus facilities maintenance updates will be provided soon.",
    date: "03/03/24"
  }
];

const NoticeBoard = () => {
  const [open, setOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));//mui hook

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getRandomColor = (id) => {
    const colors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];
    return colors[id % colors.length];
  };

  const addNotice = () => {
    console.log("adding");
  }

  return (
    <Box sx={{ 
      height: '100vh',
      bgcolor: 'background.default',
      p: { xs: 2, sm: 3, md: 4 },
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
   
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between', 
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: 2,
        mb: 3,
        backgroundColor: 'white',
        borderRadius: 2,
        p: 2,
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold',
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
            background: 'linear-gradient(45deg,rgb(7, 112, 198), #21CBF3)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Notice Board
        </Typography>

        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button
            variant="contained"
            startIcon={<Plus />}
            onClick={handleClickOpen}
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'white',
              borderRadius: '20px',
              px: 3,
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)',
                transform: 'translateY(-2px)',
                boxShadow: '0 5px 15px rgba(33, 150, 243, 0.3)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Add Notice
          </Button>
        </Box>

        <Box sx={{ 
          position: 'fixed', 
          right: 16, 
          bottom: 16, 
          display: { xs: 'block', sm: 'none' } 
        }}>
          <Zoom in={true}>
            <Fab
              color="primary"
              onClick={handleClickOpen}
              sx={{
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 5px 15px rgba(33, 150, 243, 0.3)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <Plus />
            </Fab>
          </Zoom>
        </Box>
      </Box>

      <Box sx={{ 
        overflow: 'auto',
        flex: 1,
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(auto-fill, minmax(300px, 1fr))',
        },
        p: 1,
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          background: alpha(theme.palette.primary.main, 0.1),
          borderRadius: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: alpha(theme.palette.primary.main, 0.2),
          borderRadius: '10px',
          '&:hover': {
            background: alpha(theme.palette.primary.main, 0.3),
          }
        }
      }}>
        {notices.map((notice) => (
          <Card
            key={notice.id}
            elevation={selectedNotice === notice.id ? 8 : 1}
            sx={{
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
              },
              position: 'relative',
              overflow: 'visible',
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)'
            }}
            onClick={() => setSelectedNotice(notice.id)}
          >
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <BellRing 
                  size={24}
                  color={theme.palette[getRandomColor(notice.id)].main}
                  style={{
                    filter: `drop-shadow(0 2px 4px ${alpha(theme.palette[getRandomColor(notice.id)].main, 0.3)})`
                  }}
                />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    ml: 1.5,
                    flex: 1,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: theme.palette.text.primary
                  }}
                >
                  {notice.title}
                </Typography>
                <Tooltip title="Delete Notice" placement="top">
                  <IconButton 
                    size="small"
                    color="error"
                    sx={{ 
                      '&:hover': { 
                        bgcolor: alpha(theme.palette.error.main, 0.1),
                        transform: 'scale(1.1)'
                      },
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Trash2 size={18} />
                  </IconButton>
                </Tooltip>
              </Box>
              
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{ 
                  mb: 2,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  minHeight: '4.5em',
                  lineHeight: 1.6
                }}
              >
                {notice.description}
              </Typography>

              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                color: theme.palette.text.secondary,
                mt: 'auto'
              }}>
                <Calendar size={16} />
                <Typography 
                  variant="caption" 
                  sx={{ 
                    ml: 1,
                    fontSize: '0.75rem',
                    fontWeight: 500
                  }}
                >
                  Added on: {notice.date}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="add-notice-dialog"
        maxWidth="sm"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              borderRadius: { xs: 0, sm: 2 },
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
            }
          }
        }}
      >
        <DialogTitle sx={{ 
          borderBottom: '1px solid',
          borderColor: 'divider',
          pb: 2
        }}>
          Add New Notice
        </DialogTitle>
        <DialogContent sx={{ mt: 4,overflow: 'visible' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Title"
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main
                  }
                }
              }}
            />
            <TextField
              label="Description"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main
                  }
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button 
            onClick={handleClose} 
            color="inherit"
            sx={{
              borderRadius: 2,
              px: 3,
              '&:hover': {
                backgroundColor: alpha(theme.palette.text.primary, 0.04)
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={addNotice} 
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'white',
              borderRadius: 2,
              px: 3,
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)',
              }
            }}
          >
            Add Notice
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NoticeBoard;
