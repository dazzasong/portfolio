import { Box, Card, CardContent, CardHeader, CardMedia, Link, Stack, Typography } from "@mui/material";

export default function PortFolioCard() {
  const socials = [
    {social: "Facebook", link: "https://www.facebook.com/profile.php?id=100082634944093"},
    {social: "Twitter", link: "https://x.com/dazzasong"},
    {social: "Instagram", link: "https://www.instagram.com/dazzasong"}
  ];
  
  return (
    <Box width={360}>
      <Card>
        <CardHeader title="Dazza" subheader="Age 14" />
        <CardMedia component="img" image="face.png" height={300} />
        <CardContent>
          <Stack spacing={1}>
            <Box>
              <Typography fontWeight="bold">-- INFO --</Typography>
              <Typography>Real name is Darren Song. Male, 14. Lives in Australia. Hobbies are gaming, music and cooking.</Typography>
            </Box>
            <Box>
              <Typography fontWeight="bold">-- SOCIAL --</Typography>
              {socials.map((obj) => (
                <Typography>
                  <Link href={obj.link}>{obj.social}</Link>
                </Typography>
              ))}
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}