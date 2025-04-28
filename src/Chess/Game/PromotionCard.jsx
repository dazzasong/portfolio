export default function PromotionCard() {
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

  const promotionSrc = (piece) => `chess-assets/imgs/${piece}${color}`;

  return (
    <Stack spacing={2} p={1} border={"solid"} sx={{ backgroundImage: 'linear-gradient(white, grey)' }}>
      <Typography fontSize={16} fontWeight="bold">
        Promote to..
      </Typography>
      <IconButton onClick={() => promote("q")} disableRipple>
        <img src={promotionSrc("q")} alt={color ? "Black Queen" : "White Queen"} />
      </IconButton>
      -
      <IconButton onClick={() => promote("r")} disableRipple>
        <img src={promotionSrc("r")} alt={color ? "Black Rook" : "White Rook"} />
      </IconButton>
      -
      <IconButton onClick={() => promote("n")} disableRipple>
        <img src={promotionSrc("n")} alt={color ? "Black Knight" : "White Knight"} />
      </IconButton>
      -
      <IconButton onClick={() => promote("b")} disableRipple>
        <img src={promotionSrc("b")} alt={color ? "Black Bishop" : "White Bishop"} />
      </IconButton>
    </Stack>
  );
}