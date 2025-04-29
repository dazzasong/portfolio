import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Stats from "./Stats/Stats";

export default function Test({ setState, lives, setLives, playSound }) {
  const [questionNum, setQuestionNum] = useState(0);
  
  const date = new Date();
  const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  
  const questions = [
    "6 + 3 = ?",
    "12 - 4 = ?", 
    "4 x 6 = ?",
    "8 ÷ 2 = ?",
    "Sugar tastes _____.",
    "Black coffee tastes ______.",
    "How many sides does a triangle have?",
    "How many days in a year?",
    "How many days in a leap year?",
    "Who was the first president of the United States?",
    "This chilli pepper is quite _____!",
    "What is the largest organ in the human body?",
    "I left milk out for 18 days. Can I drink it?",
    "14 + 6 = ?",
    "33 x 3 = ?",
    "H2O is _____",
    "Sweet + bitter = ?",
    "What is the coldest planet in the Solar System?",
    "What is the hottest planet in the Solar System?",
    "What sound do cows make?",
    "What sound do pigs make?",
    "9 x 9 = ?",
    "1 x 1 = ?",
    "How many Pokemons are there?",
    "Write the correct spelling --> Sawsage",
    "I have 2 sausages. Jackson gives me 3 sausages. How many sausages do I have?",
    "I have 5 sausages. Fletcher gives me 2 sausages. How many sausages do I have?",
    "I have 7 sausages. Zack gives me 1 sausage. How many sausages do I have?",
    "I have 8 sausages. River gives me 2 sausages. How many sausages do I have?",
    "I have 10 sausages. Jacob gives me 27 sausages. How many sausages do I have?",
    "8 x 4 = ?",
    "11 x 2 = ?",
    "67 - 12 = ?",
    "4.1 + 23 = ?",
    "21 ÷ 3 = ?",
    "How many elements are there in the periodic table?",
    "J.K _______",
    "_______ Shakespeare",
    "24 hours a day, 7 days a ____",
    "Answer the trolley problem. Should you pull the lever?",
    "Salt and ______",
    "______ Ramsay",
    "What is the fear of heights called?",
    "Arachnophobia is the fear of what?",
    "Claustrophobia is the fear of _______ spaces",
    "What is the name of Mcdonald's official mascot?",
    "I dropped a glass from the top of the Effiel Tower. Will it break?",
    "I dropped a chair from the top of the Effiel Tower. Will it break?",
    "I dropped a cat from the top of the Effiel Tower. Will it..?",
    "Assuming it had 9 lives, how many lives does the cat have now?",
    "What question number are we up to?",
    "Is 52 an even number?",
    "What coding language did I use to make this website?",
    "True or false: Declan loves turtles",
    "True or false: Darren has a brother",
    "True or false: Pluto is a planet",
    "What is the current year?",
    "What is the current month?",
    "What is the current day of month?",
    "What day is it?",
    "How many hours has it been since the start of today?",
    "Is it currently AM or PM?",
    "How many minutes has it been since the start of this hour?",
    "Have you completed this test?"
  ];

  const answers = [
    9,
    8,
    24,
    4,
    "sweet",
    "bitter",
    3,
    365,
    366,
    "george washington",
    "spicy",
    "skin",
    "no",
    20,
    99,
    "water",
    "bittersweet",
    "uranus",
    "venus",
    "moo",
    "oink",
    81,
    1,
    1025,
    "sausage",
    5,
    7,
    8,
    10,
    37,
    32,
    22,
    55,
    27.1,
    7,
    118,
    "rowling",
    "william",
    "week",
    "yes",
    "pepper",
    "gordon",
    "acrophobia",
    "spiders",
    "enclosed",
    "ronald mcdonald",
    "yes",
    "yes",
    "no",
    8,
    52,
    "yes",
    "javascript",
    "true",
    "true",
    "false",
    date.getFullYear(),
    months[date.getMonth()],
    date.getDate(),
    weekdays[date.getDay()],
    date.getHours(),
    date.getHours() >= 12 ? "pm" : "am",
    date.getMinutes(),
    "yes"
  ];

  const handleEnter = (e) => {
    const value = e.target.value.trim();
    const isFloat = !isNaN(parseFloat(value));
    const answer = isFloat ? parseFloat(value) : value.toLowerCase(); // convert string to float, otherwise set string to lowercase

    if (e.key === 'Enter') {
      if (answer === answers[questionNum]) {
        setQuestionNum(questionNum => questionNum + 1);
        playSound('correct.mp3');
      } else if (answer !== "") {
        setLives(prevLives => prevLives - 1);
        playSound('wrong.mp3');
      }
      e.target.value = null; // clears input
    }
  };

  if (lives <= 0 || questionNum > questions.length) setState(2); // lives was still 0

  return (
    <Stack alignItems='center' spacing={1}>
      <Stats setState={setState} lives={lives} questionNum={questionNum} />
      <Typography fontSize={18}>{questions[questionNum]}</Typography>
      <TextField variant="standard" onKeyDown={handleEnter} />
    </Stack>
  );
}