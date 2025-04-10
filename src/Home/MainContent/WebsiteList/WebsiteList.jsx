import { Stack, Typography } from "@mui/material";
import WebsiteCard from "./WebsiteCard";

export default function WebsiteList() {
  const websites = [
    {img: "icons/snake2.0.png", to: "/snake2"},
    {img: "icons/chess.png", to: "https://singleplayerchess.netlify.app/"},
    {img: "icons/pizza-help.png", to: "/pizza-help"},
    {img: "icons/the-button.png", to: "/thebutton"}
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