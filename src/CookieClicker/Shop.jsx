import { useState } from "react";
import { Box, Button, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { ArrowBack, Store } from "@mui/icons-material";

export default function Shop({ cookies, setCookies, setCps, playSound }) {
  const [shopOpen, setShopOpen] = useState(false);

  function Item({ name='', price=0, speed=0, description='' }) {
    const purchase = () => {
      if (cookies >= price) {
        setCookies(prevCookies => prevCookies - price);
        setCps(prevCps => prevCps + speed);
        playSound('purchase.mp3');
      } else playSound('poor.mp3'); // deal with the cookie devil
    };

    return (
      <Button color="inherit" disabled={cookies < price} onClick={purchase} sx={{ bgcolor: 'yellow' }}>
        <Stack direction='row' spacing={2}>
          <Stack>
            <Typography>{name}</Typography>
            <img src={`cookieclicker-assets/shop-imgs/${name}.png`} alt={name} width={64} height={64} />
          </Stack>
          <Typography fontWeight='bold'>{price} cookies</Typography>
          <Typography width={240}>{description}</Typography>
          <Typography fontStyle='italic' sx={{ opacity: 0.5 }}>{speed} cps</Typography>
        </Stack>
      </Button>
    );
  }

  return (
    <Box>
      <Drawer open={shopOpen}>
        <Typography fontSize={20}>The Shop</Typography>
        <Item name="Slave" price={5} speed={0.1} description="A low-economic peasant. Good for farming cookies." />
        <Item name="Grandma" price={15} speed={0.5} description="She loves to bake cookies." />
        <Item name="Chef" price={30} speed={1} description="A skillful chef. Cooks well and fast." />
        <Item name="Mines" price={50} speed={2} description="Rocks full of valuable cookies." />
        <Item name="Bakery" price={120} speed={4} description="Bakes fresh cookies every day." />
        <Item name="Robot" price={175} speed={6} description="Constructs cookies at top speed and precision." />
        <Item name="Factory" price={300} speed={10} description="Sends out boxes of cookies." />
        <Item name="Printer" price={500} speed={20} description="Prints out a variety of cookies." />
        <Item name="Thief" price={700} speed={30} description="Steals cookies from the elderly." />
        <Item name="Jacob" price={1000} speed={45} description="Loves to eat and cook cookies." />
        <Item name="School" price={3000} speed={280} description="Teaches children the value of cookies." />
        <Item name="Theme Park" price={4000} speed={360} description="Visitors come to bake cookies." />
        <Item name="Stocks" price={6000} speed={600} description="Invest in cookie stocks." />
        <Item name="CookieCoin" price={10000} speed={1500} description="Invest in cryptocurrency." />
        <IconButton size="large" onClick={() => setShopOpen(!shopOpen)} sx={{ position: 'fixed', bottom: 10, left: 10 }}>
          <ArrowBack />
        </IconButton>
      </Drawer>
      <Button
        variant="contained"
        color="success"
        size="large"
        endIcon={<Store />}
        onClick={() => setShopOpen(!shopOpen)}
        sx={{ position: 'fixed', bottom: 10, left: 10 }}
      >
        Shop
      </Button>
    </Box>
  );
}