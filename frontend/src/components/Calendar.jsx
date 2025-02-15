import React, { useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

const Calendar = () => {
  const [date, setDate] = useState(new Date());

  return (
    <Card sx={{ width: 400, p: 2, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">Schedules</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateCalendar value={date} onChange={(newDate) => setDate(newDate)} />
        </LocalizationProvider>
      </CardContent>
    </Card>
  );
};

export default Calendar;
