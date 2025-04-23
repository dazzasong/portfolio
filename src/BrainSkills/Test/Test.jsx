import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function Test({ setHasStarted, playSound }) {
  const [questionNum, setQuestionNum] = useState(0);

  const questions = [
    "6 + 3 = ?",
    "12 - 4 = ?", 
    "4 x 6 = ?",
    "8 ÷ 2 = ?",
    "Sugar tastes _____.",
    "Black coffee tastes ______.",
    "How many days in a year?",
    "How many days in a leap year?",
    "How many sides does a triangle have?",
    "Who was the first president of the United States?",
    "This chilli pepper is quite _____!",
    "What is the largest organ in the human body?",
    "I left milk out for 18 days. Can I drink it?",
    "14 + 6 = ?",
    "33 x 3 = ?",
    "How much does a Big Mac cost at Mcdonald's? (dollar sign not needed)",
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
    "Answer the trolley problem. Should you pull the lever?"
  ];

  const answers = [
    9,
    8,
    24,
    4,
    "sweet",
    "bitter",
    365,
    366,
    3,
    "george washington",
    "spicy",
    "skin",
    "no",
    20,
    99,
    9.75,
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
    "yes"
  ];

  const handleEnter = (e) => {
    const value = e.target.value.trim();
    const isFloat = !isNaN(parseFloat(value));
    // convert string to float, otherwise set string to lowercase
    const answer = isFloat ? parseFloat(value) : value.toLowerCase();

    if (e.key === 'Enter') {
      if (answer === answers[questionNum]) {
        setQuestionNum((questionNum) => questionNum + 1);
        playSound('brainskills-assets/correct.mp3');
      } else playSound('brainskills-assets/wrong.mp3');
      
      e.target.value = null; // clears input
    }
  };

  if (questionNum > questions.length) setHasStarted(false);

  return (
    <Stack alignItems='center' spacing={1}>
      <Typography fontSize={24} position="absolute" top={10} left={10}>Question {questionNum+1}</Typography>
      <Typography fontSize={18}>{questions[questionNum]}</Typography>
      <TextField variant="standard" onKeyDown={handleEnter} />
    </Stack>
  );
}