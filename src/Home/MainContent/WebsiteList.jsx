import { Card, CardActionArea, CardMedia, Stack, Typography } from "@mui/material";

function WebsiteCard({ img, to }) {
  return (
    <Card>
      <CardActionArea href={to}>
        <CardMedia component="img" image={img} height={200} />
      </CardActionArea>
    </Card>
  )
}

export default function WebsiteList() {
  const websites = [
    {img: "icons/snake2.0.png", to: "snake2"},
    {img: "icons/chess.png", to: "https://singleplayerchess.netlify.app/"},
    {img: "icons/pizza-help.png", to: "pizzahelp"},
    {img: "icons/the-button.png", to: "thebutton"}
  ];

  return (
    <Stack alignItems="center" spacing={4}>
    <Typography variant="h5" fontWeight="bold"><u>Games</u> ({websites.length})</Typography>
    <Stack direction="row" spacing={2}>
      {websites.map((web) => <WebsiteCard img={web.img} to={web.to} />)}
    </Stack>
  </Stack>
  );
}