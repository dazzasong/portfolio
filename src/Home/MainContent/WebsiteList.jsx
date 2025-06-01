import { Card, CardActionArea, CardMedia, Stack, Typography } from "@mui/material";
import { motion } from "motion/react";

function WebsiteCard({ img, to, disabled=false }) {
  return (
    <motion.div whileHover={{ scale: 1.1 }}>
      <Card sx={{ opacity: disabled ? 0.4 : 1 }}>
        <CardActionArea href={to} disabled={disabled}>
          <CardMedia component="img" image={`icons/${img}`} height={200} />
        </CardActionArea>
      </Card>
    </motion.div>
  )
}

export default function WebsiteList() {
  const websites = [
    {img: "snake.png", to: "snake2"},
    {img: "chess.png", to: "chess"},
    {img: "brainskills.png", to: "brainskills"},
    {img: "cookieclicker.png", to: "cookieclicker"},
    {img: "bulletsong.png", to: "bulletsong", disabled: true},
    {img: "gunspin.png", to: "gunspin", disabled: true}
  ];

  return (
    <Stack alignItems="center" spacing={4}>
    <Typography variant="h5" fontWeight="bold"><u>Games</u> ({websites.length})</Typography>
    <Typography>Disabled games are still in development</Typography>
    <Stack direction="row" spacing={2}>
      {websites.map(web => <WebsiteCard img={web.img} to={web.to} disabled={web.disabled} />)}
    </Stack>
    <Typography fontWeight='bold'>Make sure to check in regularly for new updates!</Typography>
  </Stack>
  );
}