import { Button, Stack, Typography } from "@mui/material";

function PizzaHelp() {
  const buttons = [
    ["LET'S GOOOO", "pizzahelp/levelselection", "success"],
    ["Hol' up", "pizzahelp/settings", "warning"],
    ["Aw hell nah", "/", "error"]
  ];

  return (
    <Stack justifyContent="center" alignItems="center" height="100vh" bgcolor="gold">
      <Stack alignItems="center" position="absolute" top={0} width={700}>
        <Typography fontSize={56}>Pizza Help!</Typography>
        <Typography fontStyle="italic">Hello there! You work for Papa John's Pizzeria. Mr. Luigi Amanguino has ordered a pepperoni pizza, and he wants it delivered ASAP! Simple, right? But be careful, the journey is dangerous and filled with nasty obstacles... And hunger also exists, you know! But luckily for you, there are delicious red meatballs along the way to fill you up on your adventure! If you manage to do it, a hundred bucks is waiting for you! So go on, worker - fulfill your destiny and deliver that pizza!</Typography>
      </Stack>
      <Stack spacing={2}>
        {buttons.map((btn) => (
          <Button variant="contained" color={btn[2]} href={btn[1]}>{btn[0]}</Button>
        ))}
      </Stack>
    </Stack>
  );
}

export default PizzaHelp;