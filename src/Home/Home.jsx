import { useEffect } from "react";
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
  useEffect(() => {
    document.body.style.backgroundColor = "gold";
  }, []);

  return (
    <Box sx={{ userSelect: "none" }}>
      <Header />
      <MainContent />
    </Box>
  );
}

export default Home;