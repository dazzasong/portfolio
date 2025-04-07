import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, CardMedia, Link, Stack, Typography } from "@mui/material";

export default function PortFolioCard() {
  const socials = [
    {name: "Facebook", link: "https://www.facebook.com/profile.php?id=100082634944093", icon: <Facebook color="primary" />},
    {name: "Twitter", link: "https://x.com/dazzasong", icon: <Twitter color="info" />},
    {name: "Instagram", link: "https://www.instagram.com/dazzasong", icon: <Instagram color="secondary" />}
  ];
  
  return (
    <Box width={300}>
      <Card>
        <CardHeader title="Darren Song" subheader="Age 14" />
        <CardMedia component="img" image="me.png" height={300} />
        <CardContent>
          <Stack spacing={1}>
            <Box>
              <Typography fontWeight="bold">-- INFO --</Typography>
              <Typography>Male, 14. Lives in Australia. Enjoys gaming, coding and listening to music. (sorry for the missing image above, working on it)</Typography>
            </Box>
            <Box>
              <Typography fontWeight="bold">-- SOCIAL --</Typography>
                {socials.map((obj) => (
                  <Stack direction="row" spacing={1}>
                    <Link href={obj.link} target="_blank" rel="noopener">{obj.name}</Link>
                    {obj.icon}
                  </Stack>
                ))}
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}