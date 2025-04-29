import { Stack, Typography } from "@mui/material";
import Timer from "./Timer";
import Lives from "./Lives";

export default function Stats({ setState, lives, questionNum }) {
  return (
    <Stack position='absolute' top={10} left={10} spacing={2}>
      <Timer setState={setState} />
      <Lives lives={lives} />
      <Typography fontSize={24}>Question {questionNum+1}</Typography>
    </Stack>
  );
}