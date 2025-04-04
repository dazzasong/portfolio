import { Box, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import PortFolioCard from "./PortfolioCard";
import Note from "./Note";
import Website from "./Website";

function App() {
  const languages = ["Python", "C#", "Javascript"];
  const websites = [
    {img: "Chess", link: ""},
    {img: "snake2.0.png", link: "https://snaketwo.netlify.app/"},
    {img: "Game to release on Steam", link: ""}
  ];

  return (
    <Stack direction="row" justifyContent="space-between">
      <Box>
        <Typography variant="h4" fontWeight="bold">Hi.</Typography>
        <Typography>I use:</Typography>
        <List dense>
          {languages.map((l) => (
            <ListItem>
              <ListItemText>{l}</ListItemText>
            </ListItem>
          ))}
        </List>
        <Typography>These are the websites/games I have made so far and some I'm still working on:</Typography>
        <Stack direction="row">
          {websites.map((web) => <Website img={web.img} link={web.link} />)}
        </Stack>
        <Typography>I have created a notepad below, feel free to use it! (Not saved for next time)</Typography>
        <Note />
      </Box>
      <PortFolioCard />
    </Stack>
  );
}

export default App;
