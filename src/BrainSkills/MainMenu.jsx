import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";

export default function MainMenu({ setHasStarted, playSound }) {
  const [attemptsToLeave, setAttemptsToLeave] = useState(0);

  const handleClick = (btn) => {
    if (btn === 0) {
      setHasStarted(true);
      playSound('click.mp3');
    } else {
      setAttemptsToLeave((attemptsToLeave) => attemptsToLeave + 1);
      playSound('nope.mp3');
    }
  };

  return (
    <Stack alignItems='center' spacing={2}>
      <Typography fontSize={30}>Brain Skills 101</Typography>
      <Button variant="contained" color="success" onClick={() => handleClick(0)}>Start</Button>
      { attemptsToLeave < 8 &&
        <Button variant="contained" color="error" onClick={() => handleClick(1)}>Please get me out of here</Button>
      }
    </Stack>
  );
}