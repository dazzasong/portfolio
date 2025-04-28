import { Box, Typography } from "@mui/material";

export default function Intro() {
  return (
    <Box>
      <Typography variant="h6" fontStyle='italic'>Who am I?</Typography>
      <Typography>My name is Darren (aka Dazza). I am a year 9 student.</Typography>
      <Typography variant="h6" fontStyle='italic'>What do I want to do?</Typography>
      <Typography>I'm working towards making a website full of (actually fun) unblocked games that you can play at school.</Typography>
      <Typography variant="h6" fontStyle='italic'>Why?</Typography>
      <Typography>I was bored.</Typography>
      <Typography variant="h6" fontStyle='italic'>What do I use?</Typography>
      <Typography>The languages I use are Python, Javascript, and C#. The games below were made using Javascript.</Typography>
      <Box mt={2}>
        <audio controls>
          <source src="intro.mp3" type="audio/mpeg" />
        </audio>
      </Box>
      <Typography>Read-aloud provided by Jackson Bruyn.</Typography>
    </Box>
  );
}