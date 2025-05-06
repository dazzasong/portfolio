import { Stack, Typography } from "@mui/material";

export default function Stats({ cookies, cps }) {
  return (
    <Stack justifyContent='center' alignItems='center'>
      <Typography fontSize={30} position='fixed' top={0}>Cookies: {cookies.toFixed()}</Typography>
      <Typography fontSize={30} position='fixed' bottom={0}>{cps} cookies per second</Typography>
    </Stack>
  );
}