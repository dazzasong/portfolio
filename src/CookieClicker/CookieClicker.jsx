import { useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Cookie from "./Cookie";
import Shop from "./Shop";
import Stats from "./Stats";

const playSound = (name) => {
  const audio = new Audio(`cookieclicker-assets/sounds/${name}`);
  audio.play();
};

function CookieClicker() {
  const [cookies, setCookies] = useState(0);
  const [cps, setCps] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies(prevCookies => prevCookies + cps);
    }, 1000);
    return () => clearInterval(interval)
  }, [cps]);

  return (
    <Stack justifyContent='center' alignItems='center' height='100vh'>
      <Stats cookies={cookies} cps={cps} />
      <Shop cookies={cookies} setCookies={setCookies} setCps={setCps} playSound={playSound} />
      <Cookie setCookies={setCookies} playSound={playSound} />
    </Stack>
  );
}

export default CookieClicker;