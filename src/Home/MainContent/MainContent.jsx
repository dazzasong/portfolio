import { Box, Divider, Link, Typography } from "@mui/material";
import Info from "./Info/Info"
import WebsiteList from "./WebsiteList/WebsiteList";

export default function MainContent() {
  return (
    <Box m={1}>
      <Info />
      <Divider variant="middle" sx={{ marginY: 4 }} />
      <WebsiteList />
      <Divider variant="middle" sx={{ marginY: 4 }} />
      <Typography fontWeight="bold" fontStyle="italic">More games and stuff to come. Thank you!</Typography>
      <Typography>Have suggestions? --&gt; Email <Link href="mailto:dazzasong@gmail.com">dazzasong@gmail.com</Link></Typography>
    </Box>
  );
}