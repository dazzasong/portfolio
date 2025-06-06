import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

function Square({ filled=false, isGridEnabled, isFood }) {
  return (
    <Box width={16} height={16} bgcolor={filled ? "white" : "black"} border={isGridEnabled ? 1 : 0}>
      {isFood &&
        <Box position="absolute">
          <img src="snake2-assets/imgs/berry.png" alt="berry" width={24} />
        </Box>
      }
    </Box>
  );
}

function Column({ squares, isGridEnabled }) {
  return (
    <Stack>
      {Array.from([...squares]).map((square) => (
        <Square filled={square === 1} isGridEnabled={isGridEnabled} isFood={square === 2} />
      ))}
    </Stack>
  );
}

function Grid({ grid, isGridEnabled }) {
  return (
    <Stack direction="row">
      {Array.from([...grid]).map((column) => (
        <Column squares={column} isGridEnabled={isGridEnabled} />
      ))}
    </Stack>
  );
}

function Game({ state, setState, isMuted, isGridEnabled, borderColor, playSound }) {
  const [grid, setGrid] = useState([
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ]); // 25 x 25

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const [direction, setDirection] = useState(0); // Actual direction
  const [nextDirection, setNextDirection] = useState(0); // Queued input

  const [snakeSquares, setSnakeSquares] = useState([]);
  const [foodPosition, setFoodPosition] = useState([]);

  const [message, setMessage] = useState("WAITING FOR GAME TO START...");

  const randomPosition = () => [Math.floor(Math.random() * 25), Math.floor(Math.random() * 25)];

  useEffect(() => {
    if (state === 1) {
      setScore(0);
      setMessage("READY?");
      setTimeout(() => {
        setMessage("GO!");
        setTimeout(() => {
          setMessage("");
          setSnakeSquares([[12, 12]]);
          setFoodPosition(() => {
            let randPos = randomPosition();
            while (snakeSquares.includes(randPos)) randPos = randomPosition();
            return randPos;
          });
        }, 1000);
      }, 2000);
    } else if (state === 2) {
      if (score > highScore) {
        setHighScore(score);
        setMessage("GAME OVER - NEW BEST!");
      } else setMessage("GAME OVER");
      setGrid((prevGrid) => prevGrid.map((column) => column.map(() => 0))); // Reset grid
      setDirection(0);
      setSnakeSquares([]);
      setFoodPosition([]);
      playSound('game-over.mp3', isMuted);
    }
  // eslint-disable-next-line
  }, [state]);

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "ArrowUp":
      case "w":
        if (direction !== 3) setNextDirection(1); // Checks for opposite direction
        break;
      case "ArrowLeft":
      case "a":
        if (direction !== 4) setNextDirection(2);
        break;
      case "ArrowDown":
      case "s":
        if (direction !== 1) setNextDirection(3);
        break;
      case "ArrowRight":
      case "d":
        if (direction !== 2) setNextDirection(4);
        break;
      default:
        break;
    }
  };

  // Set direction based on user inputs
  useEffect(() => {
    if (state !== 1 || snakeSquares.length === 0) return; // Only run when game starts

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  // eslint-disable-next-line
  }, [state, direction, snakeSquares]);

  // Updates snakeSquares per frame
  useEffect(() => {
    if (state !== 1 || snakeSquares.length === 0) return; // Only run during game

    const interval = setInterval(() => {
      setDirection(nextDirection);
      setSnakeSquares(prevSnakeSquares => {
        let newSnakeSquares = [...prevSnakeSquares];
        let newSnakeHead = [...newSnakeSquares[0]]; // Create a copy of the head
        switch (direction) {
          case 1: newSnakeHead[1]--; break; // Up
          case 2: newSnakeHead[0]--; break; // Left
          case 3: newSnakeHead[1]++; break; // Down
          case 4: newSnakeHead[0]++; break; // Right
          default: return prevSnakeSquares;
        }
        newSnakeSquares.unshift(newSnakeHead); // Adds new playerHead to start

        // Unless food is consumed, remove the end of snakeSquares
        if (newSnakeHead[0] === foodPosition[0] && newSnakeHead[1] === foodPosition[1]) {
          setScore((prevScore) => prevScore + 1);
          setFoodPosition(randomPosition);
          playSound('eat.mp3', isMuted);
        } else newSnakeSquares.pop();

        // If snake goes out of bounds or hits itself, game over
        if (newSnakeHead[0] < 0 ||
            newSnakeHead[0] > 24 ||
            newSnakeHead[1] < 0 ||
            newSnakeHead[1] > 24 ||
            prevSnakeSquares.some(pos => Array.isArray(pos) && pos.length === newSnakeHead.length && pos.every((val, index) => val === newSnakeHead[index]))
        ) {
          setState(2);
          return prevSnakeSquares;
        }

        return newSnakeSquares;
      });
    }, 75);
  
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [state, direction, nextDirection, snakeSquares, foodPosition]);

  // Update the grid based on new snakeSquares
  useEffect(() => {
    if (state !== 1 || snakeSquares.length === 0) return; // Only run during game

    setGrid((prevGrid) => {
      const updatedGrid = prevGrid.map(column => column.map(() => 0)); // Reset grid  
      for (let i = 0; i < snakeSquares.length; i++) {
        const [x, y] = snakeSquares[i];
        updatedGrid[x][y] = 1;
      }
  
      const [x, y] = foodPosition;
      updatedGrid[x][y] = 2;
      
      return updatedGrid;
    });
  }, [state, snakeSquares, foodPosition])

  return (
    <Box color={borderColor}>
      <Stack direction="row" spacing={2}>
        <Typography fontSize={18} fontFamily="pixelify sans">SCORE: {score}</Typography>
        <Typography fontSize={18} fontFamily="pixelify sans">HIGH SCORE: {highScore}</Typography>
      </Stack>
      <Stack
        justifyContent="center"
        alignItems="center"
        border={2}
      >
        <Typography fontSize={18} fontFamily="pixelify sans" position="absolute">{message}</Typography>
        <Grid grid={grid} isGridEnabled={isGridEnabled} />
      </Stack>
    </Box>
  );
}

export default Game;