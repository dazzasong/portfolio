import { Box, Card, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";

export default function PortFolioCard() {
  
  return (
    <Box width={345}>
      <Card>
        <CardHeader title="Darren Song" subheader="Age 14" />
        <CardMedia component="img" image="face.jpg" height={300} />
        <CardContent>
          <Typography fontWeight="bold">-- INFO --</Typography>
          <Typography>Darren Song. Male, 14. Lives in Australia. Engages in gaming and listens to music.</Typography>
        </CardContent>
      </Card>
    </Box>
  );
}