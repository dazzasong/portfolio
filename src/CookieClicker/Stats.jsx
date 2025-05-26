import { Stack, Typography } from "@mui/material";

export default function Stats({ cookies, cps, shortenNum }) {
  return (
    <Stack justifyContent='center' alignItems='center'>
      <Typography fontSize={30} position='fixed' top={0}>Cookies: {shortenNum(cookies.toFixed())}</Typography>
      <Typography fontSize={30} position='fixed' bottom={0}>{shortenNum(cps.toFixed(1))} cookies per second</Typography>
    </Stack>
  );
}