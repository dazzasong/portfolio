import { Stack, Typography } from "@mui/material";

export default function LevelButton({ levelNum }) {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography>{levelNum}</Typography>
    </Stack>
  );
}