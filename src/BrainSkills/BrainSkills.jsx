import { useState } from "react";
import { Stack } from "@mui/material";
import MainMenu from "./MainMenu";
import Test from "./Test/Test";
import Results from "./Results";

const playSound = (name) => {
  const audio = new Audio(`brainskills-assets/sounds/${name}`);
  audio.play();
};

function BrainSkills() {
  const [state, setState] = useState(0);
  const [lives, setLives] = useState(3);
  const [questionNum, setQuestionNum] = useState(0);

  const [save, setSave] = useState(null);

  const render = () => {
    if (state === 0) return <MainMenu setState={setState} setLives={setLives} setQuestionNum={setQuestionNum} save={save} playSound={playSound} />;
    else if (state === 1) return <Test setState={setState} lives={lives} setLives={setLives} questionNum={questionNum} setQuestionNum={setQuestionNum} setSave={setSave} playSound={playSound} />;
    else return <Results setState={setState} lives={lives} setLives={setLives} questionNum={questionNum} setQuestionNum={setQuestionNum} save={save} setSave={setSave} />
  };

  return (
    <Stack justifyContent='center' alignItems='center' height='100vh'>
      {render()}
    </Stack>
  );
}

export default BrainSkills;