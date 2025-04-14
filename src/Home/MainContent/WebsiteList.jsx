import { Card, CardActionArea, CardMedia, Stack, Typography } from "@mui/material";

function WebsiteCard({ img, to, disabled=false }) {
  return (
    <Card sx={{ opacity: disabled ? 0.6 : 1 }}>
      <CardActionArea href={to} disabled={disabled}>
        <CardMedia component="img" image={img} height={200} />
      </CardActionArea>
    </Card>
  )
}

export default function WebsiteList() {
  const websites = [
    {img: "icons/snake2.0.png", to: "snake2"},
    {img: "icons/chess.png", to: "chess"},
    {img: "icons/pizza-help.png", to: "pizzahelp", disabled: true},
    {img: "icons/the-button.png", to: "thebutton", disabled: true}
  ];

  return (
    <Stack alignItems="center" spacing={4}>
    <Typography variant="h5" fontWeight="bold"><u>Games</u> ({websites.length})</Typography>
    <Stack direction="row" spacing={2}>
      {websites.map((web) => <WebsiteCard img={web.img} to={web.to} disabled={web.disabled} />)}
    </Stack>
    <Typography>Disabled games are still in development</Typography>
  </Stack>
  );
}