import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { useState, useEffect } from "react";

export default function NotificationBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
    const timer = setTimeout(() => {
      setOpen(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Snackbar open={open} message="Server is down or unreachable" />
    </div>
  );
}
