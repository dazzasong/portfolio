import { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Circle, CircleOutlined } from "@mui/icons-material";
import SideBar from "./Sidebar/Sidebar";
import Score from "./Score";
import PromotionCard from "./PromotionCard";

const moveSfx = new Audio("chess-assets/sounds/move.mp3");
const captureSfx = new Audio("chess-assets/sounds/capture.mp3");
const castleSfx = new Audio("chess-assets/sounds/castle.mp3");
const checkSfx = new Audio("chess-assets/sounds/check.mp3");

function ChessSquare({ x, y, piece, selected, destinated, clickSquare }) {
  const shaded = (x + y) % 2 === 0;
  let bgcolor;

  if (shaded) bgcolor = "#b58863";
  else bgcolor = "#f0d9B5";
  if (selected) bgcolor = "#ffff77";

  return (
    <div onClick={() => clickSquare(x, y, selected, destinated)}>
      <Stack
        width={64}
        height={64}
        bgcolor={bgcolor}
        justifyContent="center"
        position="relative"
        p={0.2}
      >
        <Typography fontWeight="bold" top={0} left={3}
          sx={{
            position: "absolute"
          }}
        >
          {x === 0 ? y + 1 : null}
        </Typography>
        { piece && 
          <Stack
            sx={{
              mr: 0.5,
              justifyContent: "center", alignItems: "center",
            }}
          >
            <img src={`chess-assets/imgs/${piece}.png`} alt={piece} />
          </Stack>
        }
        {destinated && !piece && <Circle sx={{opacity: 0.2, alignSelf: "center"}} />}
        {destinated && piece && <CircleOutlined sx={{fontSize: 72, opacity: 0.2, alignSelf: "center",  position: "absolute"}} />}
        <Typography fontWeight="bold" bottom={0} right={2}
          sx={{
            position: "absolute"
          }}
        >
          {y === 0 ? String.fromCharCode(x + 97) : null}
        </Typography>
      </Stack>
    </div>
  );
}

function ChessColumn({ xAxis, pieces, selectedY, destinationY = [], clickSquare }) {
  return (
    <Stack direction="column-reverse">
      {Array.from(Array(8).keys()).map(y => <ChessSquare x={xAxis} y={y} piece={pieces[y]} selected={selectedY === y} destinated={destinationY.includes(y)} clickSquare={clickSquare} />)}
    </Stack>
  );
}

export default function Game(props) {
  const initialBoard = [
    ["rw", "pw", null, null, null, null, "pb", "rb"],
    ["nw", "pw", null, null, null, null, "pb", "nb"],
    ["bw", "pw", null, null, null, null, "pb", "bb"],
    ["qw", "pw", null, null, null, null, "pb", "qb"],
    ["kw", "pw", null, null, null, null, "pb", "kb"],
    ["bw", "pw", null, null, null, null, "pb", "bb"],
    ["nw", "pw", null, null, null, null, "pb", "nb"],
    ["rw", "pw", null, null, null, null, "pb", "rb"]
  ];

  const [board, setBoard] = useState(initialBoard);
  const [turn, setTurn] = useState(-1); // -1: White"s turn || 1: Black"s turn
  const [whiteMoves, setWhiteMoves] = useState([]);
  const [blackMoves, setBlackMoves] = useState([]);
  const [pointsWhite, setPointsWhite] = useState(0);
  const [pointsBlack, setPointsBlack] = useState(0);
  const [whiteWins, setWhiteWins] = useState(0);
  const [blackWins, setBlackWins] = useState(0);
  const [scoreboardAnnouncement, setScoreboardAnnouncement] = useState(null);
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [destinationSquares, setDestinationSquares] = useState(null);
  const [castleStateWhite, setCastleStateWhite] = useState(0); // 0: Can castle both sides || -1: Can only castle left side || 1: Can only castle right side || 2: Cannot castle
  const [castleStateBlack, setCastleStateBlack] = useState(0);
  const [promotingSquare, setPromotingSquare] = useState(null);
  const [enPassantSquare, setEnpassantSquare] = useState(null);
  const [isCheckmate, setIsCheckmate] = useState(0);

  const color = turn === 1 ? "b" : "w";
  const opposingColor = turn === -1 ? "b" : "w";

  useEffect(() => {
    if (props.mode === 1) { // if a new game starts
      setBoard(initialBoard);
      setTurn(-1);
      setWhiteMoves([]);
      setBlackMoves([]);
      setPointsWhite(0);
      setPointsBlack(0);
      setCastleStateWhite(0);
      setCastleStateBlack(0);
      setScoreboardAnnouncement(null);
      setIsCheckmate(0);
    } else if (props.mode === 2) { // if the game ends
      setSelectedSquare(null);
      setDestinationSquares(null);
      setPromotingSquare(null);
      if (isCheckmate === 0) {
        turn === 1 ? setWhiteWins(whiteWins + 1) : setBlackWins(blackWins + 1);
        setScoreboardAnnouncement(`${turn === 1 ? "White" : "Black"} wins - Forfeit`);
      }
    }
  // eslint-disable-next-line
  }, [props.mode])

  const addPoint = (pieceTaken, opposite=false, customPoint) => {
    const condition = opposite ? turn === -1 : turn === 1;

    switch (pieceTaken[0]) {
      case "p": // If pawn is taken...
        if (condition) setPointsBlack(pointsBlack + 1);
        else setPointsWhite(pointsWhite + 1)
        break;
      case "b": // If bishop or knight is taken...
      case "n":
        if (condition) setPointsBlack(pointsBlack + 3);
        else setPointsWhite(pointsWhite + 3);
        break;
      case "r": // If rook is taken...
        if (condition) setPointsBlack(pointsBlack + 5);
        else setPointsWhite(pointsWhite + 5);
        break;
      case "q": // If queen is taken...
        if (condition) setPointsBlack(pointsBlack + 9);
        else setPointsWhite(pointsWhite + 9);
        break;
      default:
        if (condition) setPointsBlack(pointsBlack + customPoint);
        else setPointsWhite(pointsWhite + customPoint);
    }
  };

  // Calculate spaces to board edge
  const spacesLen = (x, y, direction) => {
    switch (direction) {
      case 0: return 7 - y; // up
      case 1: return 7 - x; // right
      case 2: return y; // down
      case 3: return x; // left
      case 4: return Math.min(7 - y, x); // topLeft
      case 5: return Math.min(7 - y, 7 - x); // topRight
      case 6: return Math.min(y, 7 - x); // bottomRight
      case 7: return Math.min(y, x); // bottomLeft
      default: throw new Error("Invalid direction!");
    }
  };

  const clickSquare = (x, y, selected, destinated) => {
    const withinBounds = (x, y) => x >= 0 && x <= 7 && y >= 0 && y <= 7; // Checks if move is within bounds

    // Fundamentally canMove but does not consider king in check conditions
    const canPotentialMove = (toX, toY, board, opposing=false) => {
      const c = opposing ? opposingColor : color
      return withinBounds(toX, toY) && board[toX][toY]?.[1] !== c;
    };

    const canMove = (toX, toY, curBoard=board, opposing=false, fromX=x, fromY=y) => {
      if (!canPotentialMove(toX, toY, curBoard, opposing)) return false;
      // Now check if king is in check
      let tempBoard = curBoard.map(row => [...row]);
      tempBoard[toX][toY] = tempBoard[fromX][fromY];
      tempBoard[fromX][fromY] = null;
      return !kingInCheck(tempBoard, opposing);
    };

    const kingInCheck = (board, opposing=false) => {
      let kingX, kingY;
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (board[i][j] === `k${opposing ? opposingColor : color}`) {
            kingX = i;
            kingY = j;
          }
        }
      }

      const usedColor = opposing ? color : opposingColor;
      
      // Test if any opposing pieces are able to capture the king in the current board state.
      const kicTurn = opposing ? -turn : turn;
      
      // Pawn
      if ((canPotentialMove(kingX-1, kingY-kicTurn, board, opposing) && board[kingX-1][kingY-kicTurn] === `p${usedColor}`) ||
          (canPotentialMove(kingX+1, kingY-kicTurn, board, opposing) && board[kingX+1][kingY-kicTurn] === `p${usedColor}`)) return true;
      
      // Knight
      if ((canPotentialMove(kingX-1, kingY+2, board, opposing) && board[kingX-1][kingY+2] === `n${usedColor}`) ||
          (canPotentialMove(kingX+1, kingY+2, board, opposing) && board[kingX+1][kingY+2] === `n${usedColor}`) ||
          (canPotentialMove(kingX+2, kingY+1, board, opposing) && board[kingX+2][kingY+1] === `n${usedColor}`) ||
          (canPotentialMove(kingX+2, kingY-1, board, opposing) && board[kingX+2][kingY-1] === `n${usedColor}`) ||
          (canPotentialMove(kingX+1, kingY-2, board, opposing) && board[kingX+1][kingY-2] === `n${usedColor}`) ||
          (canPotentialMove(kingX-1, kingY-2, board, opposing) && board[kingX-1][kingY-2] === `n${usedColor}`) ||
          (canPotentialMove(kingX-2, kingY-1, board, opposing) && board[kingX-2][kingY-1] === `n${usedColor}`) ||
          (canPotentialMove(kingX-2, kingY+1, board, opposing) && board[kingX-2][kingY+1] === `n${usedColor}`)) return true;
      
      // Bishop, Rook, and Queen
      for (let i = 1; i <= spacesLen(kingX, kingY, 4); i++) {
        if (board[kingX-i][kingY+i] === `b${usedColor}` || board[kingX-i][kingY+i] === `q${usedColor}`) return true;
        if (board[kingX-i][kingY+i]) break;
      }
      for (let i = 1; i <= spacesLen(kingX, kingY, 5); i++) {
        if (board[kingX+i][kingY+i] === `b${usedColor}` || board[kingX+i][kingY+i] === `q${usedColor}`) return true;
        if (board[kingX+i][kingY+i]) break;
      }
      for (let i = 1; i <= spacesLen(kingX, kingY, 6); i++) {
        if (board[kingX+i][kingY-i] === `b${usedColor}` || board[kingX+i][kingY-i] === `q${usedColor}`) return true;
        if (board[kingX+i][kingY-i]) break;
      }
      for (let i = 1; i <= spacesLen(kingX, kingY, 7); i++) {
        if (board[kingX-i][kingY-i] === `b${usedColor}` || board[kingX-i][kingY-i] === `q${usedColor}`) return true;
        if (board[kingX-i][kingY-i]) break;
      }
      for (let i = 1; i <= spacesLen(kingX, kingY, 0); i++) {
        if (board[kingX][kingY+i] === `r${usedColor}` || board[kingX][kingY+i] === `q${usedColor}`) return true;
        if (board[kingX][kingY+i]) break;
      }
      for (let i = 1; i <= spacesLen(kingX, kingY, 1); i++) {
        if (board[kingX+i][kingY] === `r${usedColor}` || board[kingX+i][kingY] === `q${usedColor}`) return true;
        if (board[kingX+i][kingY]) break;
      }
      for (let i = 1; i <= spacesLen(kingX, kingY, 2); i++) {
        if (board[kingX][kingY-i] === `r${usedColor}` || board[kingX][kingY-i] === `q${usedColor}`) return true;
        if (board[kingX][kingY-i]) break;
      }
      for (let i = 1; i <= spacesLen(kingX, kingY, 3); i++) {
        if (board[kingX-i][kingY] === `r${usedColor}` || board[kingX-i][kingY] === `q${usedColor}`) return true;
        if (board[kingX-i][kingY]) break;
      }

      // King
      if ((canPotentialMove(kingX, kingY+1, board, opposing) && board[kingX][kingY+1] === `k${usedColor}`) ||
          (canPotentialMove(kingX+1, kingY, board, opposing) && board[kingX+1][kingY] === `k${usedColor}`) ||
          (canPotentialMove(kingX, kingY-1, board, opposing) && board[kingX][kingY-1] === `k${usedColor}`) ||
          (canPotentialMove(kingX-1, kingY, board, opposing) && board[kingX-1][kingY] === `k${usedColor}`) ||
          (canPotentialMove(kingX-1, kingY+1, board, opposing) && board[kingX-1][kingY+1] === `k${usedColor}`) ||
          (canPotentialMove(kingX+1, kingY+1, board, opposing) && board[kingX+1][kingY+1] === `k${usedColor}`) ||
          (canPotentialMove(kingX+1, kingY-1, board, opposing) && board[kingX+1][kingY-1] === `k${usedColor}`) ||
          (canPotentialMove(kingX-1, kingY-1, board, opposing) && board[kingX-1][kingY-1] === `k${usedColor}`)) return true;
      return false;
    };
    
    // In the current board state, can the piece at position (x,y) make any of its potential moves, without leaving the king in check
    const opposingPiecesCanMove = (x, y, board) => {
      switch (board[x][y]) {
        // Pawn moves
        case `p${opposingColor}`:
          let mod = turn;
          let startPoint = -turn === 1 ? 6 : 1;
          if ((canMove(x, y+1*mod, board, true, x, y) && !board[x][y+1*mod]) ||
              (canMove(x, y+2*mod, board, true, x, y) && !board[x][y+1*mod] && !board[x][y+2*mod] && y === startPoint) ||
              (withinBounds(x-1, y+1*mod) && board[x-1][y+1*mod] && canMove(x-1, y+1*mod, board, true, x, y)) ||
              (withinBounds(x+1, y+1*mod) && board[x+1][y+1*mod] && canMove(x+1, y+1*mod, board, true, x, y)) ||
              (canMove(x-1, y+1*mod, board, true, x, y) && x === enPassantSquare?.[0] + 1 && y === enPassantSquare[1]) ||
              (canMove(x+1, y+1*mod, board, true, x, y) && x === enPassantSquare?.[0] - 1 && y === enPassantSquare[1])) return true;
          return false;
        // Bishop moves
        case `b${opposingColor}`:
          for (let i = 1; i <= spacesLen(x, y, 4); i++) {
            if (canMove(x-i, y+i, board, true, x, y)) return true;
            if (board[x-i][y+i]) break
          }
          for (let i = 1; i <= spacesLen(x, y, 5); i++) {
            if (canMove(x+i, y+i, board, true, x, y)) return true;
            if (board[x+i][y+i]) break
          }
          for (let i = 1; i <= spacesLen(x, y, 6); i++) {
            if (canMove(x+i, y-i, board, true, x, y)) return true;
            if (board[x+i][y-i]) break
          }
          for (let i = 1; i <= spacesLen(x, y, 7); i++) {
            if (canMove(x-i, y-i, board, true, x, y)) return true;
            if (board[x-i][y-i]) break
          }
          return false;
        // Knight moves
        case `n${opposingColor}`:
          if (canMove(x-1, y+2, board, true, x, y) ||
              canMove(x+1, y+2, board, true, x, y) ||
              canMove(x+2, y+1, board, true, x, y) ||
              canMove(x+2, y-1, board, true, x, y) ||
              canMove(x+1, y-2, board, true, x, y) ||
              canMove(x-1, y-2, board, true, x, y) ||
              canMove(x-2, y-1, board, true, x, y) ||
              canMove(x-2, y+1, board, true, x, y)) return true;
          return false;
        // Rook moves
        case `r${opposingColor}`:
          for (let i = 1; i <= spacesLen(x, y, 0); i++) {
            if (canMove(x, y+i, board, true, x, y)) return true;
            if (board[x][y+i]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 1); i++) {
            if (canMove(x+i, y, board, true, x, y)) return true;
            if (board[x+i][y]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 2); i++) {
            if (canMove(x, y-i, board, true, x, y)) return true;
            if (board[x][y-i]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 3); i++) {
            if (canMove(x-i, y, board, true, x, y)) return true;
            if (board[x-i][y]) break;
          }
          return false;
        // Queen moves
        case `q${opposingColor}`:
          for (let i = 1; i <= spacesLen(x, y, 0); i++) {
            if (canMove(x, y+i, board, true, x, y)) return true;
            if (board[x][y+i]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 1); i++) {
            if (canMove(x+i, y, board, true, x, y)) return true;
            if (board[x+i][y]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 2); i++) {
            if (canMove(x, y-i, board, true, x, y)) return true;
            if (board[x][y-i]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 3); i++) {
            if (canMove(x-i, y, board, true, x, y)) return true;
            if (board[x-i][y]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 4); i++) {
            if (canMove(x-i, y+i, board, true, x, y)) return true;
            if (board[x-i][y+i]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 5); i++) {
            if (canMove(x+i, y+i, board, true, x, y)) return true;
            if (board[x+i][y+i]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 6); i++) {
            if (canMove(x+i, y-i, board, true, x, y)) return true;
            if (board[x+i][y-i]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 7); i++) {
            if (canMove(x-i, y-i, board, true, x, y)) return true;
            if (board[x-i][y-i]) break;
          }
          return false;
        // King moves
        case `k${opposingColor}`:
          if (canMove(x, y+1, board, true, x, y) ||
              canMove(x+1, y, board, true, x, y) ||
              canMove(x, y-1, board, true, x, y) ||
              canMove(x-1, y, board, true, x, y) ||
              canMove(x-1, y+1, board, true, x, y) ||
              canMove(x+1, y+1, board, true, x, y) ||
              canMove(x+1, y-1, board, true, x, y) ||
              canMove(x-1, y-1, board, true, x, y)) return true;
          return false;
        default:
          throw new Error("Invalid piece!");
      }
    };
    const checkmated = (board) => {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          const piece = board[i][j];
          if (!piece || piece[1] !== opposingColor) continue;
          if (opposingPiecesCanMove(i, j, board)) return false;
        }
      }
      return true;
    };
    if (board[x][y]?.[1] === color && !selected && !destinated && !promotingSquare && props.mode === 1) { // If the clicked square has a piece and is their current turn...
      setSelectedSquare([x, y]);

      let lst = []; // We add possible moves to this array and setDestinationSquares to this at the end
      switch (board[x][y]) {
        case `p${color}`: // Pawn moves
          let mod = -turn;
          let startPoint = turn === 1 ? 6 : 1;
          if (canMove(x, y+1*mod) && !board[x][y+1*mod]) lst.push([x, y+1*mod]);
          if (canMove(x, y+2*mod) && !board[x][y+1*mod] && !board[x][y+2*mod] && y === startPoint) lst.push([x, y+2*mod]);
          if (canMove(x-1, y+1*mod) && board[x-1][y+1*mod]) lst.push([x-1, y+1*mod]);
          if (canMove(x+1, y+1*mod) && board[x+1][y+1*mod]) lst.push([x+1, y+1*mod]);
          if (canMove(x-1, y+1*mod) && x === enPassantSquare?.[0] + 1 && y === enPassantSquare[1]) lst.push([x-1, y+1*mod]);
          if (canMove(x+1, y+1*mod) && x === enPassantSquare?.[0] - 1 && y === enPassantSquare[1]) lst.push([x+1, y+1*mod]);
          setDestinationSquares(lst);
          break;
        // Bishop moves
        case `b${color}`:
          for (let i = 1; i <= spacesLen(x, y, 4); i++) {
            if (canMove(x-i, y+i)) lst.push([x-i, y+i]); 
            if (board[x-i][y+i]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 5); i++) {
            if (canMove(x+i, y+i)) lst.push([x+i, y+i]);
            if (board[x+i][y+i]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 6); i++) {
            if (canMove(x+i, y-i)) lst.push([x+i, y-i]);
            if (board[x+i][y-i]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 7); i++) {
            if (canMove(x-i, y-i)) lst.push([x-i, y-i]);
            if (board[x-i][y-i]) break;
          }
          setDestinationSquares(lst);
          break;
        // Knight moves
        case `n${color}`:
          if (canMove(x-1, y+2)) lst.push([x-1, y+2]);
          if (canMove(x+1, y+2)) lst.push([x+1, y+2]);
          if (canMove(x+2, y+1)) lst.push([x+2, y+1]);
          if (canMove(x+2, y-1)) lst.push([x+2, y-1]);
          if (canMove(x+1, y-2)) lst.push([x+1, y-2]);
          if (canMove(x-1, y-2)) lst.push([x-1, y-2]);
          if (canMove(x-2, y-1)) lst.push([x-2, y-1]);
          if (canMove(x-2, y+1)) lst.push([x-2, y+1]);
          setDestinationSquares(lst);
          break;
        // Rook moves
        case `r${color}`:
          for (let i = 1; i <= spacesLen(x, y, 0); i++) {
            if (canMove(x, y+i)) lst.push([x, y+i]);
            if (board[x][y+i]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 1); i++) {
            if (canMove(x+i, y)) lst.push([x+i, y]);
            if (board[x+i][y]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 2); i++) {
            if (canMove(x, y-i)) lst.push([x, y-i]);
            if (board[x][y-i]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 3); i++) {
            if (canMove(x-i, y)) lst.push([x-i, y]);
            if (board[x-i][y]) break;
          }
          setDestinationSquares(lst);
          break;
        // Queen moves
        case `q${color}`:
          for (let i = 1; i <= spacesLen(x, y, 0); i++) {
            if (canMove(x, y+i)) lst.push([x, y+i]);
            if (board[x][y+i]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 1); i++) {
            if (canMove(x+i, y)) lst.push([x+i, y]);
            if (board[x+i][y]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 2); i++) {
            if (canMove(x, y-i)) lst.push([x, y-i]);
            if (board[x][y-i]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 3); i++) {
            if (canMove(x-i, y)) lst.push([x-i, y]);
            if (board[x-i][y]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 4); i++) {
            if (canMove(x-i, y+i)) lst.push([x-i, y+i]); 
            if (board[x-i][y+i]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 5); i++) {
            if (canMove(x+i, y+i)) lst.push([x+i, y+i]);
            if (board[x+i][y+i]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 6); i++) {
            if (canMove(x+i, y-i)) lst.push([x+i, y-i]);
            if (board[x+i][y-i]) break;
          }
          for (let i = 1; i <= spacesLen(x, y, 7); i++) {
            if (canMove(x-i, y-i)) lst.push([x-i, y-i]);
            if (board[x-i][y-i]) break;
          }
          setDestinationSquares(lst);
          break;
        // King moves
        case `k${color}`:
          if (canMove(x, y+1)) lst.push([x, y+1]);
          if (canMove(x+1, y)) lst.push([x+1, y]);
          if (canMove(x, y-1)) lst.push([x, y-1]);
          if (canMove(x-1, y)) lst.push([x-1, y]);
          if (canMove(x-1, y+1)) lst.push([x-1, y+1]);
          if (canMove(x+1, y+1)) lst.push([x+1, y+1]);
          if (canMove(x+1, y-1)) lst.push([x+1, y-1]);
          if (canMove(x-1, y-1)) lst.push([x-1, y-1]);
          if (turn === 1) {
            if ((castleStateBlack === 0 || castleStateBlack === -1) && x === 4 && y === 7 && !kingInCheck(board) && canMove(x-1, y) && canMove(x-2, y) && !board[3][7] && !board[2][7] && !board[1][7] && board[0][7] === "rb") lst.push([x-2,y]);
            if ((castleStateBlack === 0 || castleStateBlack === 1) && x === 4 && y === 7 && !kingInCheck(board) && canMove(x+1, y) && canMove(x+2, y) && !board[5][7] && !board[6][7] && board[7][7]=== "rb") lst.push([x+2,y]);
          } else {
            if ((castleStateWhite === 0 || castleStateWhite === -1) && x === 4 && y === 0 && !kingInCheck(board) && canMove(x-1, y) && canMove(x-2, y) && !board[3][0] && !board[2][0] && !board[1][0] && board[0][0] === "rw") lst.push([x-2,y]);
            if ((castleStateWhite === 0 || castleStateWhite === 1) && x === 4 && y === 0 && !kingInCheck(board) && canMove(x+1, y) && canMove(x+2, y) && !board[5][0] && !board[6][0] && board[7][0] === "rw") lst.push([x+2,y]);
          }
          setDestinationSquares(lst);
          break;
        default:
          throw new Error("Invalid piece!");
      }
    } else if (destinated) { // If the clicked square is destinated...
      const selectedPiece = board[selectedSquare[0]][selectedSquare[1]];
      // Constructing move notation
      let whiteMove = '', blackMove = '';
      const editMove = (notation, setTo=false) => {
        if (setTo) turn === 1 ? blackMove = notation : whiteMove = notation;
        else turn === 1 ? blackMove += notation : whiteMove += notation;
      };
      if (selectedPiece !== `p${color}`) editMove(selectedPiece[0].toUpperCase());
      if (board[x][y]) editMove("x");
      editMove(String.fromCharCode(x + 97));
      editMove(y + 1);
      // Setting states for castling
      if (turn === -1) {
        if (castleStateWhite === 0) {
          if (selectedSquare[0] === 0 && selectedSquare[1] === 0) setCastleStateWhite(1);
          else if (selectedSquare[0] === 7 && selectedSquare[1] === 0) setCastleStateWhite(-1);
        } else if (castleStateWhite === -1) {
          if (selectedSquare[0] === 0 && selectedSquare[1] === 0) setCastleStateWhite(2);
        } else if (castleStateWhite === 1) {
          if (selectedSquare[0] === 7 && selectedSquare[1] === 0) setCastleStateWhite(2);
        }
        if (selectedSquare[0] === 4 && selectedSquare[1] === 0) setCastleStateWhite(2);
      } else if (turn === 1) {
        if (castleStateBlack === 0) {
          if (selectedSquare[0] === 0 && selectedSquare[1] === 7) setCastleStateBlack(1);
          else if (selectedSquare[0] === 7 && selectedSquare[1] === 7) setCastleStateBlack(-1);
        } else if (castleStateBlack === -1) {
          if (selectedSquare[0] === 0 && selectedSquare[1] === 7) setCastleStateBlack(2);
        } else if (castleStateBlack === 1) {
          if (selectedSquare[0] === 7 && selectedSquare[1] === 7) setCastleStateBlack(2);
        }
        if (selectedSquare[0] === 4 && selectedSquare[1] === 7) setCastleStateBlack(2);
      }
      // Checks if pawn moved 2 squares forward
      if (selectedPiece === `p${color}` && (y === selectedSquare[1] + 2 || y === selectedSquare[1] - 2)) setEnpassantSquare([x, y]);
      const updatedBoard = board.map(row => [...row]); // Creates copy of board - changes will be made to this one
      updatedBoard[x][y] = updatedBoard[selectedSquare[0]][selectedSquare[1]];
      updatedBoard[selectedSquare[0]][selectedSquare[1]] = null;
      // Checks for castling
      let castle = false;
      if (selectedPiece === `k${color}`) {
        if (x === selectedSquare[0] - 2) {
          updatedBoard[x+1][y] = updatedBoard[0][y];
          updatedBoard[0][y] = null;
          castle = true;
          editMove("0-0-0", true);
        } else if (x === selectedSquare[0] + 2) {
          updatedBoard[x-1][y] = updatedBoard[0][y];
          updatedBoard[7][y] = null;
          castle = true;
          editMove("0-0", true);
        }
      } else if (selectedPiece === `p${color}` && y === (turn === 1 ? 0 : 7)) setPromotingSquare([x, y]); // Checks for promotion
      if (kingInCheck(updatedBoard, true)) { // If opposing king is in check...
        checkSfx.play();
        if (!checkmated(updatedBoard)) editMove("+");
        else {
          editMove("#");
          props.setMode(2);
          turn === 1 ? setBlackWins(blackWins + 1) : setWhiteWins(whiteWins + 1);
          turn === 1 ? setScoreboardAnnouncement("Black wins - Checkmate") : setScoreboardAnnouncement("White wins! - Checkmate");
          setIsCheckmate(1);
        }
      } else if (castle) castleSfx.play(); // Plays castleSfx if move is castling
      else if (selectedPiece === `p${color}` && !board[x][y] && (x === selectedSquare[0] - 1 || x === selectedSquare[0] + 1)) { // Checks for en passant
        updatedBoard[enPassantSquare[0]][enPassantSquare[1]] = null;
        addPoint("p");
        captureSfx.play();
      } else if (!board[x][y]) moveSfx.play();
      else if (board[x][y]) {
        addPoint(board[x][y]);
        captureSfx.play();
      }
      // Sets board state to updated board and switches turn
      setBoard(updatedBoard);
      setTurn(-turn);
      setSelectedSquare(null);
      setDestinationSquares(null);
      if (whiteMove) setWhiteMoves(prevArray => [...prevArray, whiteMove]);
      else if (blackMove) setBlackMoves(prevArray => [...prevArray, blackMove]);
      if (enPassantSquare) setEnpassantSquare(null);
    } else { // Otherwise, if the square is empty or not their turn...
      setSelectedSquare(null);
      setDestinationSquares(null);
    }
  }
  let destinationColumns = [[],[],[],[],[],[],[],[]]; // Destination squares for each column - index is column number
  for (let x = 0; x < 8; x++) for (let coordinate in destinationSquares) if (destinationSquares[coordinate][0] === x) destinationColumns[x].push(destinationSquares[coordinate][1]); // pushes the Y coords of each array to destinationColumns and highlightedColumns in the correct indexes

  return (
    <Stack direction="row" sx={{ userSelect: 'none' }}>
      {promotingSquare &&
        <PromotionCard setBoard={setBoard} promotingSquare={promotingSquare} setPromotingSquare={setPromotingSquare} opposingColor={opposingColor} />
      }
      <Box>
        <Score whiteWins={whiteWins} blackWins={blackWins} scoreboardAnnouncement={scoreboardAnnouncement} />
        <Stack direction="row" boxShadow={10}>
          {[...Array(8)].map((_, i) => (
            <ChessColumn
              xAxis={i}
              pieces={board[i]}
              selectedY={i === selectedSquare?.[0] ? selectedSquare[1] : null}
              destinationY={destinationColumns[i]}
              clickSquare={clickSquare}
            />
          ))}
        </Stack>
      </Box>
      <SideBar
        turn={turn}
        mode={props.mode}
        setMode={props.setMode}
        whiteMoves={whiteMoves}
        blackMoves={blackMoves}
        pointsWhite={pointsWhite}
        pointsBlack={pointsBlack}
        whiteWins={whiteWins}
        blackWins={blackWins}
        setWhiteWins={setWhiteWins}
        setBlackWins={setBlackWins}
        promotingSquare={promotingSquare}
      />
    </Stack>
  );
}