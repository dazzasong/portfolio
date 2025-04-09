import { Stack, Typography } from "@mui/material";

export default function Header() {
  return (
    <Stack direction="row" color="white" bgcolor="black" p={1}>
      <Typography variant="h4">Dazza's Web</Typography>
    </Stack>
  );
}