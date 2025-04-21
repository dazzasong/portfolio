import { Box, Stack, Typography } from "@mui/material";
import MainContent from "./MainContent/MainContent";

function Header() {
  return (
    <Stack direction="row" color="white" bgcolor="black" p={1}>
      <Typography variant="h4">Dazza's Web</Typography>
    </Stack>
  );
}

function Home() {
  return (
    <Box bgcolor="gold" minHeight="100svh" sx={{ userSelect: 'none' }}>
      <Header />
      <MainContent />
    </Box>
  );
}

export default Home;