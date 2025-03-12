import { Box, Card, CardContent, CardHeader, CardMedia, Link, Typography } from "@mui/material";

export default function PortFolioCard() {
  
  return (
    <Box width={360}>
      <Card>
        <CardHeader title="Darren Song" subheader="Age 14" />
        <CardMedia component="img" image="face.png" height={300} />
        <CardContent>
          <Typography fontWeight="bold">-- INFO --</Typography>
          <Typography>Darren Song. Male, 14. Lives in Australia. Hobbies are gaming, music and cooking.</Typography>
          <Typography fontWeight="bold">-- SOCIAL --</Typography>
          <Typography>
            <Link href="https://www.facebook.com/profile.php?id=100082634944093">Facebook</Link>
          </Typography>
          <Typography>
            <Link href="https://x.com/dazzasong">Twitter</Link>
          </Typography>
          <Typography>
            <Link href="https://www.instagram.com/dazzasong/">Instagram</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}