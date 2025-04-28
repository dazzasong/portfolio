import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import Intro from "./Intro";
import PortFolioCard from "./PortfolioCard";
import WebsiteList from "./WebsiteList";

export default function MainContent() {
  return (
    <Box mt={1} mx={1}>
      <Stack direction='row' justifyContent='space-between'>
        <Intro />
        <PortFolioCard />
      </Stack>
      <Divider variant="middle" sx={{ marginY: 4 }} />
      <WebsiteList />
      <Divider variant="middle" sx={{ marginY: 4 }} />
      <Typography fontWeight="bold" fontStyle="italic">More games and stuff to come. Thank you!</Typography>
      <Typography>Have suggestions? --&gt; Email <Link href="mailto:dazzasong@gmail.com">dazzasong@gmail.com</Link></Typography>
    </Box>
  );
}