import { Stack, Typography } from "@mui/material";

function NoPage() {
  return (
    <Stack justifyContent="center" alignItems="center" height="100vh">
      <Typography fontSize={30} color="error">Nahh ain't no way bro entered the wrong link 😭😭</Typography>
      <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbTE5czN2OWgzZWp0am03dGdzZTd5cXJ2cnd5MTIwdW5mOXg1eWJtbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lxxOGaDRk4f7R5TkBd/giphy.gif" />
    </Stack>
  );
}

export default NoPage;