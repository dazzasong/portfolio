import { Stack } from "@mui/material";

export default function TheButton() {
  const press = () => {
    const randomInt = Math.floor(Math.random() * 24);
    switch (randomInt) {
      case 0:
        window.close()
        break;
      default:
        return;
    }
  }

  return (
    <Stack justifyContent="center" alignItems="center" height="100vh">
      <img src="the-button-assets/imgs/button.png" alt="red button" width={150} onClick={press} />
    </Stack>
  )
}