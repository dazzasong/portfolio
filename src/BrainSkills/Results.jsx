import { Button, Stack, Typography } from "@mui/material";

export default function Results({ setState, lives }) {
  const isSuccess = lives > 0;

  const result = () => {
    if (lives === 3) return "Big Brain";
    else if (lives === 2) return "Chill Brain";
    else if (lives === 1) return "Awkward Brain (D-)";
    else return "Duck Brain (F-)";
  };

  return (
    <Stack alignItems='center'>
      <Typography>{isSuccess ? "Congrats!" : "Oops."} You {isSuccess ? "finished" : "failed"} the test!</Typography>
      { isSuccess &&
        <Typography>{lives === 3 ? "You got all questions correct!" : `You got ${3 - lives} question${lives === 1 ? null : "s"} wrong!`} {lives === 3 ? "Nice!" : null}</Typography>
      }
      <Typography fontWeight='bold'>YOU HAVE EARNED THE RESULT OF: {result()}</Typography>
      <Stack direction='row' spacing={1}>
        <Button variant="outlined" color="warning" onClick={() => setState(1)}>Try again?</Button>
        <Button variant="contained" color="inherit" onClick={() => setState(0)}>Main Menu</Button>
      </Stack>
    </Stack>
  );
}