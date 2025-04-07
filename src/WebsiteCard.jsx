import { Box, Card, CardActionArea, CardMedia } from "@mui/material";

export default function WebsiteCard({ img, to }) {
  return (
    <Box width={200}>
      <Card>
        <CardActionArea href={to}>
          <CardMedia component="img" image={img} height={200} />
        </CardActionArea>
      </Card>
    </Box>
  )
}