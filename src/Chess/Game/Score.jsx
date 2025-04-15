import { Stack, Typography } from "@mui/material";

export default function Score({ whiteWins, blackWins, scoreAnnouncement }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      bgcolor="grey"
      height={50}
    >
      { !scoreAnnouncement &&
        <Typography color="white" fontSize={24} fontFamily="Tilt Neon">
          White: {whiteWins}
        </Typography>
      }
      { !scoreAnnouncement &&
        <Typography color="white" fontSize={24} fontFamily="Tilt Neon">
          Black: {blackWins}
        </Typography>
      }
      { scoreAnnouncement &&
        <Typography color="white" fontSize={24} fontFamily="Tilt Neon">
          {scoreAnnouncement}
        </Typography>
      }
    </Stack>
  );
}