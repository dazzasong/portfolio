import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box, Card, CardContent, CardHeader, Link, Stack, Typography } from "@mui/material";

export default function PortFolioCard() {
  const socials = [
    {name: "Facebook", link: "https://www.facebook.com/profile.php?id=100082634944093", icon: <Facebook color="primary" />},
    {name: "Twitter", link: "https://x.com/dazzasong", icon: <Twitter color="info" />},
    {name: "Instagram", link: "https://www.instagram.com/dazzasong", icon: <Instagram color="secondary" />}
  ];
  
  return (
    <Box width={240}>
      <Card>
        <CardHeader title="Darren Song" subheader="Age 14" />
        <CardContent>
          <Stack spacing={1}>
            <Box>
              <Typography fontWeight="bold">-- INFO --</Typography>
              <Typography>Lives in Australia. Enjoys gaming, coding and listening to music.</Typography>
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