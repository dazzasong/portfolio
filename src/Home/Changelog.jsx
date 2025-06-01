import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function PatchNotes({ children, date='' }) {
  return (
    <Box marginY={2}>
      <Typography fontWeight='bold'><u>Patch notes {date}</u></Typography>
      {children}
    </Box>
  );
}

// Update this as more news comes out
export default function Changelog() {
  return (
    <Box m={2}>
      <PatchNotes date="27/05/2025">
        <Typography>- New double click upgrade (Cookie Clicker)</Typography>
      </PatchNotes>
      <PatchNotes date="28/05/2025">
        <Typography>- Added minor cookie animation (Cookie Clicker)</Typography>
        <Typography>- Fixed bug that causes game over when turning quickly (Snake 2)</Typography>
        <Typography>- Changed background colour (Chess)</Typography>
      </PatchNotes>
      <PatchNotes date="31/05/2025">
        <Typography>- New Chess logo</Typography>
      </PatchNotes>
      <PatchNotes date="1/06/2025">
        <Typography>- New website icon</Typography>
      </PatchNotes>
      <Link to='/'>Back to Home</Link>
    </Box>
  );
}