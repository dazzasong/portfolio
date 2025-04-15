import { useEffect } from "react";
import { Stack, Typography } from "@mui/material";

export default function MoveHistory({ whiteMoves, blackMoves }) {
  function MoveBox({ move, color }) {
    return (
      <Typography color={color} fontFamily="Tilt Neon">
        {move}
      </Typography>
    );
  }

  // Everytime either whiteMoves or blackMoves update we automatically scroll to the bottom
  useEffect(() => {
    const scrollDiv = document.getElementById("moveContainer");
    scrollDiv.scrollTop = scrollDiv.scrollHeight;
  }, [whiteMoves, blackMoves]);
  return (
    <Stack
      direction="row"
      bgcolor="grey"
      width={120}
      height={340}
      px={1}
      border="solid white"
      overflow="auto"
      id="moveContainer"
      sx={{
        scrollbarWidth: "none"
      }}
    >
      <Stack width={60}>
        {whiteMoves.map((move, index) => <MoveBox move={move} color="white" key={index} />)}
      </Stack>
      <Stack width={60}>
        {blackMoves.map((move, index) => <MoveBox move={move} color="black" key={index} />)}
      </Stack>
    </Stack>
  );
}