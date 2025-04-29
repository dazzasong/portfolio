import { Stack } from "@mui/material";

export default function Lives({ lives }) {
  return (
    <Stack direction='row' spacing={1}>
      {Array.from({ length: lives }, (_, i) => (
        <img src="brainskills-assets/imgs/heart.png" alt="heart" width={32} key={i} />
      ))}
    </Stack>
  );
}