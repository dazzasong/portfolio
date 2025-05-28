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
  const [cpc, setCpc] = useState(1);
  const [cps, setCps] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies(prevCookies => prevCookies + cps / 10);
    }, 100);
    return () => clearInterval(interval)
  }, [cps]);

  const shortenNum = (num) => {
    if (num >= 1000000000000) return `${num / 1000000000000}t`;
    else if (num >= 1000000000) return `${num / 1000000000}b`;
    else if (num >= 1000000) return `${num / 1000000}m`;
    else if (num >= 1000) return `${num / 1000}k`;
    return num;
  };

  return (
    <Stack justifyContent='center' alignItems='center' height='100vh'>
      <Stats cookies={cookies} cps={cps} shortenNum={shortenNum} />
      <Shop cookies={cookies} setCookies={setCookies} setCpc={setCpc} setCps={setCps} shortenNum={shortenNum} playSound={playSound} />
      <Cookie setCookies={setCookies} cpc={cpc} playSound={playSound} />
    </Stack>
  );
}

export default CookieClicker;