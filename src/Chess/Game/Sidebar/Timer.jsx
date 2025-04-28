import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

const tenSecondsSfx = new Audio("chess-assets/sounds/tenseconds.mp3");

export default function Timer(props) {
  const [seconds, setSeconds] = useState(600);
  let color = seconds <= 10 ? "red" : "white";

  // Timer
  useEffect(() => {
    if ((props.promotingSquare ? props.turn !== props.timerFor : props.turn === props.timerFor) && props.mode === 1) {
      const chessTimer = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds - 1);
      }, 1000);
      return () => clearInterval(chessTimer);
    }
  // eslint-disable-next-line
  }, [props.turn, props.mode, props.promotingSquare]);

  // Resets timer on new game
  useEffect(() => {
    if (props.mode === 1) setSeconds(600)
  }, [props.mode]);

  // Formats time to minutes:seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (seconds === 10) tenSecondsSfx.play();
    else if (seconds === 0) {
      props.setMode(2);
      props.timerFor === 1 ? props.setWhiteWins(props.whiteWins + 1) : props.setBlackWins(props.blackWins + 1);
      props.setScoreboardAnnouncement(props.timerFor === 1 ? "White wins - Time ran out" : "Black wins - Time ran out")
    }
  // eslint-disable-next-line
  }, [seconds])

  return (
    <Box width={52} p={1} border="solid" borderColor={color} borderRadius={1}>
      <Typography color={color} fontSize={20} fontWeight='bold' fontFamily="Tilt Neon">
        {formatTime(seconds)}
      </Typography>
    </Box>
  );
}