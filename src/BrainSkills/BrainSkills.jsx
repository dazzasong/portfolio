import { useState } from "react";
import { Stack } from "@mui/material";
import MainMenu from "./MainMenu";
import Test from "./Test/Test";

const playSound = (path) => {
  const audio = new Audio(path);
  audio.play();
};

function BrainSkills() {
  const [hasStarted, setHasStarted] = useState(false);

  return (
    <Stack justifyContent='center' alignItems='center' height='100vh'>
      { !hasStarted &&
        <MainMenu setHasStarted={setHasStarted} playSound={playSound} />
      }
      { hasStarted &&
        <Test setHasStarted={setHasStarted} playSound={playSound} />
      }
    </Stack>
  );
}

export default BrainSkills;