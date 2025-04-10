import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

function TheButton() {
  const [src, setSrc] = useState("the-button-assets/imgs/button.png");
  const [text, setText] = useState();
  const [numBananas, setNumBananas] = useState(0);

  const press = () => {
    setText();
    const randomInt = Math.floor(Math.random() * 4);
    switch (randomInt) {
      case 0:
        setText("Hey! That hurt!");
        break;
      case 1:
        if (src === "the-button-assets/imgs/button.png") setSrc("the-button-assets/imgs/button2.png");
        else setSrc("the-button-assets/imgs/button.png")
        break;
      case 2:
        alert("We have detected a virus on your device. Please install Microsoft Virus Defender.");
        break;
      case 3:
        setNumBananas((prevNumBananas) => prevNumBananas + 1);
        break;
      default:
        return;
    }
  }

  return (
    <Box>
      <Typography position="absolute">Banana counter: {numBananas}</Typography>
      <Stack
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography fontSize={24}>{text}</Typography>
        <Box sx={{ cursor: "pointer" }}>
          <img
            src={src}
            alt="red button"
            width={150}
            onClick={press}
          />
        </Box>
      </Stack>
    </Box>
  )
}

export default TheButton;