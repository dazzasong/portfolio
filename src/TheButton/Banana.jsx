import { useEffect, useState } from "react";

export default function Banana({ numBananas, setNumBananas, visible, setVisible }) {
  const [position, setPosition] = useState([]);

  useEffect(() => {
    setPosition([
      Math.floor(Math.random() * window.innerHeight),
      Math.floor(Math.random() * window.innerWidth)
    ]);
  }, [numBananas]);

  const handleClick = () => {
    setNumBananas((prevNumBananas) => prevNumBananas + 1);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <img
      src="the-button-assets/imgs/banana.png"
      alt="banana"
      width={100}
      onClick={handleClick}
      style={{
        position: 'absolute',
        top: position[0],
        left: position[1],
      }}
    />
  );
}