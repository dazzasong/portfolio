import { Stack, Typography } from "@mui/material";
// each level has a goal of num meatballs to collect and a timer
function LevelButton({ levelNum }) {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      bgcolor="gold"
      border={1}
      width={60}
      height={60}
    >
      <Typography fontSize={24}>{levelNum}</Typography>
    </Stack>
  );
}

export default function LevelSelection() {
  return (
    <Stack direction="row" spacing={2}>
      <LevelButton levelNum={1} />
      <LevelButton levelNum={2} />
      <LevelButton levelNum={3} />
    </Stack>
  );
}