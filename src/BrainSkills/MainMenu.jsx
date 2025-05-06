import { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

export default function MainMenu({ setState, setLives, setQuestionNum, save, playSound }) {
  const [loadMode, setLoadMode] = useState(false);
  const [saveCode, setSaveCode] = useState();
  const [isError, setIsError] = useState(false);

  const [attemptsToLeave, setAttemptsToLeave] = useState(0);

  // Reset lives
  // eslint-disable-next-line
  useEffect(() => setLives(3), []);

  const handleClick = (btn) => {
    if (btn === 0) setState(1);
    else if (btn === 1) setLoadMode(true);
    else if (btn === 2) {
      setAttemptsToLeave((attemptsToLeave) => attemptsToLeave + 1);
      playSound('nope.mp3');
    } else {
      if (save?.code === saveCode) {
        setState(1);
        setQuestionNum(save.questionNum);
      } else setIsError(true);
    }

    playSound('click.mp3');
  };

  return (
    <Box>
      { !loadMode &&
        <Stack alignItems='center' spacing={2}>
          <Typography fontSize={30}>Brain Skills 101</Typography>
          <Button variant="contained" color="success" onClick={() => handleClick(0)}>Start</Button>
          <Button variant="contained" color="warning" onClick={() => handleClick(1)}>Load Save</Button>
          { attemptsToLeave < 8 &&
            <Button variant="contained" color="error" onClick={() => handleClick(2)}>Please get me out of here</Button>
          }
        </Stack>
      }
      { loadMode &&
        <Box>
          <Typography fontSize={30}>Load save</Typography>
          <Stack direction='row' alignItems='center' spacing={2}>
            <TextField
              variant="standard"
              placeholder="Save code"
              helperText={isError ? 'Save not found' : null}
              error={isError}
              onChange={(e) => setSaveCode(e.target.value)}
            />
            <Button variant="contained" onClick={() => handleClick(3)}>Enter</Button>
          </Stack>
        </Box>
      }
    </Box>
  );
}