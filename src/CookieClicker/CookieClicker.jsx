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
  const [cookiesPerClick, setCookiesPerClick] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCookies(prevCookies => prevCookies + cps);
    }, 1000);
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
      <Shop cookies={cookies} setCookies={setCookies} setCookiesPerClick={setCookiesPerClick} setCps={setCps} shortenNum={shortenNum} playSound={playSound} />
      <Cookie setCookies={setCookies} cookiesPerClick={cookiesPerClick} playSound={playSound} />
    </Stack>
  );
}

export default CookieClicker;