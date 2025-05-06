import { useState } from "react";
import { Box, Button, Drawer, IconButton, Stack, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

export default function Shop({ cookies, setCookies, setCps, playSound }) {
  const [storeOpen, setStoreOpen] = useState(false);

  function Item({ name='', img='', price=0, speed=0, description='' }) {
    const purchase = () => {
      if (cookies >= price) {
        setCookies(prevCookies => prevCookies - price);
        setCps(prevCps => prevCps + speed);
        playSound('purchase.mp3');
      } else playSound('poor.mp3');
    };

    return (
      <Button variant="text" color="inherit" disabled={cookies < price} onClick={purchase} sx={{ bgcolor: 'yellow' }}>
        <Stack direction='row' spacing={2}>
          <Stack>
            <Typography>{name}</Typography>
            <img src={`cookieclicker-assets/shop-imgs/${img}`} alt={img} />
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
      <Drawer open={storeOpen}>
        <Typography fontSize={20}>The Shop</Typography>
        <Item name="Slave" price={5} speed={0.1} description="A low-economic peasant. Good for farming cookies." />
        <Item name="Baker" price={10} speed={0.5} description="An Italian cookie baker. Loves cookies." />
        <Item name="Chef" price={30} speed={1} description="A skillful chef. Cooks well and fast." />
        <Item name="Mascot" price={50} speed={2} description="Promotes your cookies." />
        <Item name="Bakery" price={100} speed={4} description="Bakes fresh cookies every day." />
        <Item name="Cookie Robot" price={175} speed={8} description="Constructs cookies at top speed and precision." />
        <Item name="Factory" price={250} speed={10} description="Sends out boxes of cookies." />
        <IconButton size="large" onClick={() => setStoreOpen(!storeOpen)} sx={{ position: 'fixed', bottom: 0, left: 0 }}>
          <ArrowBack />
        </IconButton>
      </Drawer>
      <IconButton size="large" onClick={() => setStoreOpen(!storeOpen)} sx={{ position: 'fixed', bottom: 0, left: 0 }}>
        <ArrowBack />
      </IconButton>
    </Box>
  );
}