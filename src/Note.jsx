import { Box, TextField } from "@mui/material";

export default function Note() {
  return (
    <Box width={240} bgcolor="yellow">
      <TextField fullWidth multiline rows={8} />
    </Box>
  );
}