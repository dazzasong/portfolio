import { useState } from "react";
import { Button, Stack } from "@mui/material";
import { Flag, LocalFireDepartment, Refresh } from "@mui/icons-material";
import Game from "./Game/Game";

const gameStartSfx = new Audio("chess-assets/sounds/game-start.mp3");
const gameEndSfx = new Audio("chess-assets/sounds/game-end.mp3");

function Chess() {
  const [mode, setMode] = useState(0); // 0 = Initial, 1 = InGame, 2 = EndGame

  let buttonText;
  let buttonColor;
  let startButtonIcon;
  let endButtonIcon;

  if (mode === 0) {
    buttonText = "New game";
    buttonColor = "green";
    startButtonIcon = <LocalFireDepartment />;
  } else if (mode === 1) {
    buttonText = "Surrender";
    buttonColor = "red";
    endButtonIcon = <Flag />;
    gameStartSfx.play();
  } else {
    buttonText = "Rematch";
    buttonColor = "orange";
    endButtonIcon = <Refresh />;
    gameEndSfx.play();
  }

  const handleClick = () => {
    if (mode === 0) setMode(1);
    else if (mode === 1) setMode(2);
    else setMode(1);
  };

  return (
    <Stack alignItems='center'>
      <Button
        onClick={handleClick}
        variant="contained"
        startIcon={startButtonIcon}
        endIcon={endButtonIcon}
        sx={{
          width: 200,
          height: 75,
          m: 4,
          fontSize: 20,
          fontWeight: 'bold',
          fontFamily: 'Tilt Neon',
          backgroundColor: buttonColor,
          textTransform: 'none',
        }}
      >
        {buttonText}
      </Button>
      <Game mode={mode} setMode={setMode} />
      click on the squares - don't drag!
    </Stack>
  );
}

export default Chess;