import { motion } from "motion/react";

export default function Cookie({ setCookies, cpc, playSound }) {
  const handleClick = () => {
    setCookies(prevCookies => prevCookies + cpc);
    playSound('click.mp3');
  };

  return (
    <motion.img
      src="cookieclicker-assets/cookie.png"
      alt="Cookie"
      draggable={false}
      width={240}
      onClick={handleClick}
      style={{ userSelect: 'none' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1 }}
    />
  );
}