import { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import Game from "./Game";
import Settings from "./Settings";

function Snake2() {
  const [gameState, setGameState] = useState(0);

  // Settings states
  const [settingsWindowOpen, setSettingsWindowOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isGridEnabled, setIsGridEnabled] = useState(false);
  const [borderColor, setBorderColor] = useState("#ffffff");

  const handleGameState = () => {
    if (gameState === 1) setGameState(2);
    else setGameState(1);
  };

  function playSound(path, muted=false) {
    if (muted) return;
    const audio = new Audio(path);
    audio.play();
  };

  let buttonText = "Start Game";
  
  switch (gameState) {
    case 0:
      buttonText = "Start Game";
      break;
    case 1:
      buttonText = "End Game";
      break;
    case 2:
      buttonText = "Retry";
      break;
    default:
      buttonText = "Error";
  }

  return (
    <Stack alignItems="center" spacing={4} bgcolor="green" minHeight="100svh">
      <Typography
        color="white"
        fontSize={30}
        fontWeight="bold"
        fontFamily="pixelify sans"
        sx={{ userSelect: "none" }}
      >
        SNAKE 2.0
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        bgcolor="darkgreen"
        width={460}
        height={100}
      >
        <Button
          variant="contained"
          color="inherit"
          disableElevation
          disableRipple
          onClick={() => {
            handleGameState();
            playSound("snake2-assets/sounds/button-click.mp3", isMuted);
          }}
        >
          <Typography fontSize={24} fontFamily="pixelify sans">{buttonText}</Typography>
        </Button>
        <Button
          variant="contained"
          color="warning"
          disableElevation
          disableRipple
          onClick={() => {
            setSettingsWindowOpen(!settingsWindowOpen);
            playSound("snake2-assets/sounds/button-click.mp3", isMuted);
          }}
        >
          <Typography fontSize={24} fontFamily="pixelify sans">Settings</Typography>
        </Button>
      </Stack>
      <Game state={gameState} setState={setGameState} isMuted={isMuted} isGridEnabled={isGridEnabled} borderColor={borderColor} playSound={playSound} />
      { settingsWindowOpen &&
        <Settings setSettingsWindowOpen={setSettingsWindowOpen} isMuted={isMuted} setIsMuted={setIsMuted} isGridEnabled={isGridEnabled} setIsGridEnabled={setIsGridEnabled} borderColor={borderColor} setBorderColor={setBorderColor} playSound={playSound} />
      }
    </Stack>
  );
}

export default Snake2;