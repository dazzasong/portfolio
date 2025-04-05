import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import Header from "./Header";
import PortFolioCard from "./PortfolioCard";
import WebsiteCard from "./WebsiteCard";

function App() {
  const websites = [
    {img: "icons/snake2.0-icon.png", link: "https://snaketwo.netlify.app/"},
    {img: "icons/chess-icon.png", link: "https://singleplayerchess.netlify.app/"}
  ];

  return (
    <Box sx={{ userSelect: "none" }}>
      <Header />
      <Stack direction="row" justifyContent="space-between" m={1}>
        <Box>
          <Typography variant="h6" fontStyle="italic">Who am I?</Typography>
          <Typography>My name is Darren (aka Dazza). I am a year 9 student.</Typography>
          <Typography variant="h6" fontStyle="italic">What do I want to do?</Typography>
          <Typography>I'm working towards making a website full of (actually fun) unblocked games that you can play at school.</Typography>
          <Typography variant="h6" fontStyle="italic">Why?</Typography>
          <Typography>I was bored.</Typography>
          <Typography variant="h6" fontStyle="italic">What do I use?</Typography>
          <Typography>The languages I use are Python, Javascript, and C#. The games below were made using Javascript.</Typography>
          <Divider variant="middle" sx={{ marginY: 4 }} />
          <Stack alignItems="center" spacing={4}>
            <Typography variant="h5" fontWeight="bold"><u>Games</u> ({websites.length})</Typography>
            <Stack direction="row" spacing={2}>
              {websites.map((web) => <WebsiteCard img={web.img} link={web.link} />)}
            </Stack>
          </Stack>
          <Divider variant="middle" sx={{ marginY: 4 }} />
          <Typography fontWeight="bold" fontStyle="italic">More games and stuff to come. Thank you!</Typography>
          <Typography>Have suggestions? --&gt; Email <Link href="mailto:dazzasong@gmail.com">dazzasong@gmail.com</Link></Typography>
        </Box>
        <PortFolioCard />
      </Stack>
    </Box>
  );
}

export default App;
