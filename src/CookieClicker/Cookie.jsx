export default function Cookie({ setCookies, playSound }) {
  const handleClick = () => {
    setCookies(prevCookies => prevCookies + 1);
    playSound('click.mp3');
  };

  return (
    <img
      src="cookieclicker-assets/cookie.png"
      alt="cookie"
      width={240}
      onClick={handleClick}
      style={{ userSelect: 'none' }}
    />
  );
}