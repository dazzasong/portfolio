import { Stack, Typography } from "@mui/material";
import Timer from "./Timer";
import MoveHistory from "./MoveHistory";

export default function SideBar(props) {
  return (
    <Stack bgcolor="#4B4847" justifyContent="space-around" p={2}>
      <Typography color="white" fontSize={20} height={10}>
        {props.pointsBlack > props.pointsWhite ? `+${props.pointsBlack - props.pointsWhite}` : null}
      </Typography>
      <Timer timerFor={1} turn={props.turn} mode={props.mode} setMode={props.setMode} whiteWins={props.whiteWins} blackWins={props.blackWins} setWhiteWins={props.setWhiteWins} setBlackWins={props.setBlackWins} promotingSquare={props.promotingSquare} />
      <MoveHistory whiteMoves={props.whiteMoves} blackMoves={props.blackMoves} />
      <Timer timerFor={-1} turn={props.turn} mode={props.mode} setMode={props.setMode} whiteWins={props.whiteWins} blackWins={props.blackWins} setWhiteWins={props.setWhiteWins} setBlackWins={props.setBlackWins} promotingSquare={props.promotingSquare} />
      <Typography color="white" fontSize={20} fontFamily="Tilt Neon" height={10}>
        {props.pointsWhite > props.pointsBlack ? `+${props.pointsWhite - props.pointsBlack}` : null}
      </Typography>
    </Stack>
  );
}