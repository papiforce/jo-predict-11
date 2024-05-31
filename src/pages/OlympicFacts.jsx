import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const ScrollBox = styled(Box)(({ theme }) => ({
  backgroundImage: "url(/src/assets/olympics-parchment.jpg)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  color: "#333",
  fontFamily: "Georgia, serif",
  fontSize: "18px",
  border: "1px solid #ddd",
  position: "relative",
  overflow: "hidden",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(255, 255, 255, 0.8)",
    borderRadius: "10px",
    transition: "opacity 0.3s ease",
    opacity: 0,
  },
  "&:hover::before": {
    opacity: 0.5,
  },
  "& > *": {
    position: "relative",
    zIndex: 1,
  },
}));

function OlympicFacts() {
  return (
    <Box mt={5} p={3}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ marginBottom: "2rem" }}
      >
        Olympic Facts
      </Typography>
      <ScrollBox>
        <Typography variant="body1">
          Fact 1: The Olympic Games were first held in ancient Greece in 776 BC.
        </Typography>
      </ScrollBox>
      <ScrollBox>
        <Typography variant="body1">
          Fact 2: The five rings of the Olympic logo represent the five
          inhabited continents.
        </Typography>
      </ScrollBox>
      <ScrollBox>
        <Typography variant="body1">
          Fact 3: The modern Olympic Games were revived in 1896 by Pierre de
          Coubertin.
        </Typography>
      </ScrollBox>
      <ScrollBox>
        <Typography variant="body1">
          Fact 4: The first Winter Olympics were held in Chamonix, France, in
          1924.
        </Typography>
      </ScrollBox>
      <ScrollBox>
        <Typography variant="body1">
          Fact 5: The Olympics have been held in 23 countries.
        </Typography>
      </ScrollBox>
      <ScrollBox>
        <Typography variant="body1">
          Fact 6: The United States has won the most Olympic medals, with over
          2,500.
        </Typography>
      </ScrollBox>
      <ScrollBox>
        <Typography variant="body1">
          Fact 7: The 2020 Tokyo Olympics were the first to be postponed,
          occurring in 2021 due to the COVID-19 pandemic.
        </Typography>
      </ScrollBox>
      <ScrollBox>
        <Typography variant="body1">
          Fact 8: The Olympic flame is lit at Olympia, Greece, and travels to
          the host city.
        </Typography>
      </ScrollBox>
      <ScrollBox>
        <Typography variant="body1">
          Fact 9: The first official Olympic mascot was Waldi, the dachshund, in
          1972.
        </Typography>
      </ScrollBox>
      <ScrollBox>
        <Typography variant="body1">
          Fact 10: The longest-standing Olympic record is held by Bob Beamon for
          the long jump, set in 1968.
        </Typography>
      </ScrollBox>
    </Box>
  );
}

export default OlympicFacts;
