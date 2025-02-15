import React from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";

const events = [
  { title: "Vacation Meeting", date: "07 July 2024", time: "09:10 AM - 10:50 PM" },
  { title: "Parents, Teacher Meet", date: "15 July 2024", time: "09:10 AM - 10:50 PM" },
  { title: "Staff Meeting", date: "10 July 2024", time: "09:10 AM - 10:50 PM" },
];

const UpcomingEvents = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Upcoming Events</Typography>
        <List>
          {events.map((event, index) => (
            <ListItem key={index}>
              <ListItemText primary={event.title} secondary={`${event.date} | ${event.time}`} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
