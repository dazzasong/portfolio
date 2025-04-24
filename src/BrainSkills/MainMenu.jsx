import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";

export default function MainMenu({ setHasStarted, playSound }) {
  const [attemptsToLeave, setAttemptsToLeave] = useState(0);

  const handleClick = () => {
    setAttemptsToLeave((attemptsToLeave) => attemptsToLeave + 1);
    playSound('nope.mp3');
  };

  return (
    <Stack alignItems='center' spacing={2}>
      <Typography fontSize={30}>Brain Skills 101</Typography>
      <Button variant="contained" color="success" onClick={() => setHasStarted(true)}>Start</Button>
      { attemptsToLeave < 8 &&
        <Button variant="contained" color="error" onClick={handleClick}>Please get me out of here</Button>
      }
    </Stack>
  );
}