import { Box, Card, CardContent, CardMedia, Link, List, ListItem, Stack, Typography } from "@mui/material";
import PortFolioCard from "./PortfolioCard";

function App() {
  return (
    <Stack direction="row">
      <Box>
        <Typography>Welcome to my portfolio.</Typography>
        <Typography>I started coding when I was a child, around 10 years old.</Typography>
        <Typography>I have learnt and used Python, C#, Javascript, and Luau. Some languages I'm more experienced in than others.</Typography>
        <Typography>These are the websites/games I have made so far and some I'm still working on:</Typography>
        <List>
          <ListItem><Link href="">Chess</Link></ListItem>
          <ListItem><Link href="">Snake 2.0</Link></ListItem>
          <ListItem>2D RPG game in Unity to release on Steam (IN DEVELOPMENT)</ListItem>
        </List>
        <Typography>I have also made a bunch of calculation tools for my father to use for his business, although I will not show them because they are for staff and customer use only.</Typography>
      </Box>
      <PortFolioCard />
    </Stack>
  );
}

export default App;
