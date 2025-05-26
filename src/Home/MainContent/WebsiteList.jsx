import { Card, CardActionArea, CardMedia, Stack, Typography } from "@mui/material";

function WebsiteCard({ img, to, disabled=false }) {
  return (
    <Card sx={{ opacity: disabled ? 0.4 : 1 }}>
      <CardActionArea href={to} disabled={disabled}>
        <CardMedia component="img" image={img} height={200} />
      </CardActionArea>
    </Card>
  )
}

export default function WebsiteList() {
  const websites = [
    {img: "icons/snake.png", to: "snake2"},
    {img: "icons/chess.png", to: "chess"},
    {img: "icons/brainskills.png", to: "brainskills"},
    {img: "icons/cookieclicker.png", to: "cookieclicker"},
    {img: "icons/bulletsong.png", to: "bulletsong", disabled: true},
    {img: "icons/gunspin.png", to: "gunspin", disabled: true}
  ];

  return (
    <Stack alignItems="center" spacing={4}>
    <Typography variant="h5" fontWeight="bold"><u>Games</u> ({websites.length})</Typography>
    <Typography>Disabled games are still in development</Typography>
    <Stack direction="row" spacing={2}>
      {websites.map((web) => <WebsiteCard img={web.img} to={web.to} disabled={web.disabled} />)}
    </Stack>
    <Typography fontWeight='bold'>Make sure to check in regularly for new updates!</Typography>
  </Stack>
  );
}