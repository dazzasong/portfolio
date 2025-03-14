import { Box, Link, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import PortFolioCard from "./PortfolioCard";
import Note from "./Note";

function App() {
  const languages = ["Python", "C#", "Javascript", "Luau"];
  const websites = [
    {name: "Chess", link: ""},
    {name: "Snake 2.0", link: ""},
    {name: "Game to release on Steam", link: ""}
  ];

  return (
    <Stack direction="row">
      <Box>
        <Typography variant="h4" fontWeight="bold">Welcome to my portfolio!</Typography>
        <Typography>I have experience in the following languages:</Typography>
        <List dense>
          {languages.map((l) => (
            <ListItem>
              <ListItemText>{l}</ListItemText>
            </ListItem>
          ))}
        </List>
        <Typography>These are the websites/games I have made so far and some I'm still working on:</Typography>
        <List>
          {websites.map((web) => (
            <ListItem>
              <ListItemText><Link href={web.link}>{web.name}</Link></ListItemText>
            </ListItem>
          ))}
        </List>
        <Typography>I have also made a bunch of calculation tools for my father to use for his <Link href="https://www.kingsbottle.com.au">business</Link>, although I will not show them because they are for staff and customer use only.</Typography>
        <Typography>I have created a notepad below, feel free to use it! (Not saved for next time)</Typography>
        <Note />
      </Box>
      <PortFolioCard />
    </Stack>
  );
}

export default App;
