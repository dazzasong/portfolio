import { Box, Stack, Typography } from "@mui/material";
import PortFolioCard from "./PortfolioCard";
import Website from "./Website";

function App() {
  const websites = [
    {img: "Chess", link: ""},
    {img: "snake2.0.png", link: "https://snaketwo.netlify.app/"},
    {img: "Game to release on Steam", link: ""}
  ];

  return (
    <Stack direction="row" justifyContent="space-between">
      <Box>
        <Typography variant="h4" fontWeight="bold">Hi.</Typography>
        <Typography>I use Python, Javascript, and C#.</Typography>
        <Typography>Here are the websites/games I have created:</Typography>
        <Stack direction="row">
          {websites.map((web) => <Website img={web.img} link={web.link} />)}
        </Stack>
      </Box>
      <PortFolioCard />
    </Stack>
  );
}

export default App;
