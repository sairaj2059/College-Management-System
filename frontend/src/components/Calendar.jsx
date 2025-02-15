import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Card sx={{ width: 400, p: 2, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">Schedules</Typography>
        <DatePicker 
          selected={date} 
          onChange={(newDate) => setDate(newDate)} 
          dateFormat="dd/MM/yyyy"
          className="custom-datepicker"
        />
      </CardContent>
    </Card>
  );
};

export default Calendar;
