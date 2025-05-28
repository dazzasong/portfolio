import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function PatchNotes({ children, date='' }) {
  return (
    <Box margin={2}>
      <Typography fontWeight='bold'><u>Patch notes {date}</u></Typography>
      {children}
    </Box>
  );
}

// Update this as more news comes out
export default function News() {
  return (
    <Box>
      <PatchNotes date="27/05/2025">
        <Typography>- Added double click upgrade (Cookie Clicker)</Typography>
        <Typography>- GunSpin in development</Typography>
      </PatchNotes>
      <PatchNotes date="28/05/2025">
        <Typography>- Added animation to cookie (Cookie Clicker)</Typography>
        <Typography>- Fixed bug (Snake 2)</Typography>
        <Typography>- Removed background (chess)</Typography>
      </PatchNotes>
      <Link to='/'>Back to Home</Link>
    </Box>
  );
}