import { Box, Card, CardActionArea, CardMedia } from "@mui/material";

export default function Website({ img, link }) {
  return (
    <Box width={200}>
      <Card>
        <CardActionArea onClick={() => window.open({link})}>
          <CardMedia component="img" image={img} height={200} />
        </CardActionArea>
      </Card>
    </Box>
  )
}