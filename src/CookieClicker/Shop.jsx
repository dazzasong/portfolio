import { useState } from "react";
import { Box, Button, ButtonGroup, Drawer, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import { ArrowBack, Store } from "@mui/icons-material";

export default function Shop({ cookies, setCookies, setCps, shortenNum, playSound }) {
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
      <Button
        color="inherit"
        disabled={cookies < price}
        onClick={purchase}
        sx={{ bgcolor: 'yellow', textTransform: 'none' }}
      >
        <Stack direction='row' alignItems='center' spacing={2}>
          <Stack>
            <Typography>{name}</Typography>
            <img
              src={`cookieclicker-assets/shop-imgs/${name}.png`}
              alt={name}
              width={64}
              height={64}
              style={{ opacity: cookies < price ? 0.5 : 1 }}
            />
          </Stack>
          <Typography fontWeight='bold'>{shortenNum(price)} cookies</Typography>
          <Typography width={240}>{description}</Typography>
          <Typography fontStyle='italic' sx={{ opacity: 0.5 }}>{shortenNum(speed)} CpS</Typography>
        </Stack>
      </Button>
    );
  }

  return (
    <Box>
      <Drawer open={shopOpen}>
        <Typography fontSize={20}>The Shop</Typography>
        <Tabs>
          <Tab label='Items' />
          <Tab label='Upgrades' />
        </Tabs>
        <ButtonGroup orientation="vertical">
          <Item name="Slave" price={15} speed={0.1} description="A low-economic peasant. Good for farming cookies." />
          <Item name="Grandma" price={100} speed={1} description="She loves to bake cookies." />
          <Item name="Chef" price={1100} speed={8} description="A skillful chef. Cooks well and fast." />
          <Item name="Mines" price={12000} speed={47} description="Rocks full of valuable cookies." />
          <Item name="Bakery" price={130000} speed={260} description="Bakes fresh cookies every day." />
          <Item name="Thief" price={1400000} speed={1400} description="Who stole the cookie from the cookie jar?" />
          <Item name="School" price={20000000} speed={7800} description="Teaches children the value of cookies." />
          <Item name="Factory" price={3300000000} speed={44000} description="Sends out boxes of cookies." />
          <Item name="Hacker" price={5100000000} speed={260000} description="Collects cookies from user's computers" />
          <Item name="Stocks" price={75000000000} speed={1600000} description="Invest in cookie stocks." />
          <Item name="CookieCoin" price={1000000000000} speed={10000000} description="Invest in cookiecurrency." />
          <Item name="Cookie Monster" price={14000000000000} speed={65000000} description="ME LOVE COOKIE. NOM NOM NOM." />
        </ButtonGroup>
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