import { Button, Stack, Typography } from "@mui/material";

export default function Results({ setState, lives, setLives, questionNum, save, setSave }) {
  const isSuccess = lives > 0;

  const result = () => {
    if (lives === 3) return "Big Brain";
    else if (lives === 2) return "Chill Brain";
    else if (lives === 1) return "Awkward Brain";
    else return "Duck Brain";
  };

  const restart = () => {
    setState(1);
    setLives(3);
  };

  const generateSave = () => {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789?';
    let code = '';
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    setSave({code: code, questionNum: questionNum});
  };

  return (
    <Stack alignItems='center' spacing={1}>
      <Typography>{isSuccess ? "Congrats!" : "Oops."} You {isSuccess ? "finished" : "failed"} the test!</Typography>
      { isSuccess &&
        <Typography>{lives === 3 ? "You got all questions correct!" : `You got ${3 - lives} question${lives === 1 ? null : "s"} wrong!`} {lives === 3 ? "Nice!" : null}</Typography>
      }
      <Typography fontWeight='bold'>YOU HAVE EARNED THE RESULT OF: {result()}</Typography>
      <Stack direction='row' spacing={1}>
        <Button variant="outlined" color="warning" onClick={restart}>Try again?</Button>
        <Button variant="contained" color="inherit" onClick={() => setState(0)}>Main Menu</Button>
      </Stack>
      { !isSuccess && !save &&
        <Button onClick={() => generateSave()}>Get save code?</Button>
      }
      { !isSuccess && save &&
        <Typography>Loser's code: {save.code}</Typography>
      }
    </Stack>
  );
}