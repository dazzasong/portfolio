import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

export default function Timer({ setState }) {
  const [seconds, setSeconds] = useState(600); // 10 minutes

  useEffect(() => {
    if (seconds <= 0) return;

    const timerId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [seconds]);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  if (seconds <= 0) setState(2);

  return (
    <Typography>{formatTime(seconds)}</Typography>
  );
}