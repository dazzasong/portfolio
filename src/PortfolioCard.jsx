import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, CardMedia, Link, Stack, Typography } from "@mui/material";

export default function PortFolioCard() {
  const socials = [
    {name: "Facebook", link: "https://www.facebook.com/profile.php?id=100082634944093", icon: <Facebook />},
    {name: "Twitter", link: "https://x.com/dazzasong", icon: <Twitter htmlColor="black" />},
    {name: "Instagram", link: "https://www.instagram.com/dazzasong", icon: <Instagram color="secondary" />}
  ];
  
  return (
    <Box width={360}>
      <Card>
        <CardHeader title="Darren Song" subheader="Age 14" />
        <CardMedia component="img" image="me.png" height={300} />
        <CardContent>
          <Stack spacing={1}>
            <Box>
              <Typography fontWeight="bold">-- INFO --</Typography>
              <Typography>Aka Dazza. Male, 14. Lives in Australia. Hobbies are gaming and creating.</Typography>
            </Box>
            <Box>
              <Typography fontWeight="bold">-- SOCIAL --</Typography>
              {socials.map((obj) => (
                <Typography>
                  <Link href={obj.link} target="_blank" rel="noopener">{obj.name} {obj.icon}</Link>
                </Typography>
              ))}
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}