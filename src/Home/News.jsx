import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

// Update this as more news comes out
export default function News() {
  return (
    <Stack spacing={1} m={1}>
      <Typography>
        Currently working on upgrading all games to Unity C#. This will make games more flexible, faster, and efficient.
      </Typography>
      <Typography><b>Bullet Song</b> and <b>GunSpin</b> will release in later months to come.</Typography>
      <Link to='/'>Back to Home</Link>
    </Stack>
  );
}