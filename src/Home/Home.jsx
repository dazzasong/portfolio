import { useEffect } from "react";
import { Box } from "@mui/material";
import Header from "./Header";
import MainContent from "./MainContent/MainContent";

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