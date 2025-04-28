import { IconButton, Stack, Typography } from "@mui/material";

const promoteSfx = new Audio("chess-assets/sounds/promote.mp3");

export default function PromotionCard({ board, setBoard, promotingSquare, setPromotingSquare, opposingColor, addPoint }) {
  const promote = (promotionPiece) => {
    let updatedBoard = board.map(row => [...row]);
    updatedBoard[promotingSquare[0]][promotingSquare[1]] = `${promotionPiece}${opposingColor}`;
    setBoard(updatedBoard);
    setPromotingSquare(null);

    switch (promotionPiece) {
      case "q":
        addPoint(0, true, 8);
        break;
      case "r":
        addPoint(0, true, 4);
        break;
      case "n":
      case "b":
        addPoint(0, true, 2);
        break;
      default: throw new Error("Invalid promotionPiece!");
    }

    promoteSfx.play();
  };

  const promotionSrc = (piece) => `chess-assets/imgs/${piece}${opposingColor}`;

  return (
    <Stack spacing={2} p={1} border={"solid"} sx={{ backgroundImage: 'linear-gradient(white, grey)' }}>
      <Typography fontSize={16} fontWeight="bold">
        Promote to..
      </Typography>
      <IconButton onClick={() => promote("q")} disableRipple>
        <img src={promotionSrc("q")} alt={opposingColor === 'w' ? "White Queen" : "Black Queen"} />
      </IconButton>
      -
      <IconButton onClick={() => promote("r")} disableRipple>
        <img src={promotionSrc("r")} alt={opposingColor === 'w' ? "White Rook" : "Black Rook"} />
      </IconButton>
      -
      <IconButton onClick={() => promote("n")} disableRipple>
        <img src={promotionSrc("n")} alt={opposingColor === 'w' ? "White Knight" : "Black Knight"} />
      </IconButton>
      -
      <IconButton onClick={() => promote("b")} disableRipple>
        <img src={promotionSrc("b")} alt={opposingColor === 'w' ? "White Bishop" : "Black Bishop"} />
      </IconButton>
    </Stack>
  );
}