import { useState } from "react";
import { Box, Button, ButtonGroup, Drawer, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import { ArrowBack, Store } from "@mui/icons-material";

export default function Shop({ cookies, setCookies, setCps, setCookiesPerClick, shortenNum, playSound }) {
  const [shopOpen, setShopOpen] = useState(false);
  const [tab, setTab] = useState(0);

  const purchaseBuilding = (cost=0, cps=0) => {
    setCookies(prevCookies => prevCookies - cost);
    setCps(prevCps => prevCps + cps);
    playSound('purchase.mp3');
  };

  const purchaseUpgrade = (cost=0, func) => {
    setCookies(prevCookies => prevCookies - cost);
    func();
    playSound('purchase.mp3');
  };

  function Building({ name='', price=0, cps=0, description='' }) {
    let unlocked = true;
    // let hidden = true;

    return (
      <Button
        color="inherit"
        disabled={cookies < price}
        onClick={() => purchaseBuilding(price, cps)}
        sx={{ bgcolor: 'yellow', textTransform: 'none' }}
      >
        <Stack direction='row' alignItems='center' spacing={2}>
          <Stack>
            <Typography>{unlocked ? name : '???'}</Typography>
            {unlocked &&
              <img
                src={`cookieclicker-assets/shop-imgs/buildings/${name}.png`}
                alt={name}
                width={64}
                height={64}
                style={{ opacity: cookies < price ? 0.5 : 1 }}
              />
            }
          </Stack>
          <Typography fontWeight='bold'>{shortenNum(price)} cookies</Typography>
          {unlocked && <Typography width={240}>{description}</Typography>}
          {unlocked && <Typography fontStyle='italic' sx={{ opacity: 0.5 }}>{shortenNum(cps)} CpS</Typography>}
        </Stack>
      </Button>
    );
  }

  function Upgrade({ name='', price=0, description='', func }) {  
    // let purchased = false;

    return (
      <Button
        color="inherit"
        disabled={cookies < price}
        onClick={() => {
          purchaseUpgrade(price, func);
        }}
        sx={{ bgcolor: 'yellow', textTransform: 'none' }}
      >
        <Stack direction='row' alignItems='center' spacing={2}>
          <img
            src={`cookieclicker-assets/shop-imgs/upgrades/${name}.png`}
            alt={name}
            width={64}
            height={64}
            style={{ opacity: cookies < price ? 0.5 : 1 }}
          />
          <Typography>{name}</Typography>
          <Typography fontWeight='bold'>{shortenNum(price)} cookies</Typography>
          <Typography width={200}>{description}</Typography>
        </Stack>
      </Button>
    );
  }

  return (
    <Box>
      <Drawer open={shopOpen}>
        <Typography fontSize={20}>The Shop</Typography>
        <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)}>
          <Tab value={0} label='Items' />
          <Tab value={1} label='Upgrades' />
        </Tabs>
        {tab === 0 ?
          <ButtonGroup orientation="vertical">
            <Building name="Slave" price={15} cps={0.1} description="A low-economic peasant. Good for farming cookies." />
            <Building name="Grandma" price={100} cps={1} description="She loves to bake cookies." />
            <Building name="Chef" price={1100} cps={8} description="A skillful chef. Cooks well and fast." />
            <Building name="Mines" price={12000} cps={47} description="Rocks full of valuable cookies." />
            <Building name="Bakery" price={130000} cps={260} description="Bakes fresh cookies every day." />
            <Building name="School" price={1400000} cps={1400} description="Teaches children the value of cookies." />
            <Building name="Factory" price={20000000} cps={7800} description="Sends out boxes of cookies." />
            <Building name="Thief" price={3300000000} cps={44000} description="Who stole the cookie from the cookie jar?" />
            <Building name="Bank" price={5100000000} cps={260000} description="Stores all the cookies." />
            <Building name="Hacker" price={75000000000} cps={1600000} description="Collects cookies from user's computers" />
            <Building name="CookieCoin" price={1000000000000} cps={10000000} description="Invest in cookiecurrency." />
            <Building name="Jesus Christ" price={14000000000000} cps={65000000} description="Holy shit it's Jesus Christ. Summons cookies for you, if you pray." />
            <Building name="Cookie Monster" price={170000000000000} cps={430000000} description="ME LOVE COOKIE. NOM NOM NOM." />
          </ButtonGroup>
          :
          <ButtonGroup orientation="vertical">
            <Upgrade name="Double click" price={100000} description="You get double the cookies for a click." func={() => setCookiesPerClick(2)} />
          </ButtonGroup>
        }
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