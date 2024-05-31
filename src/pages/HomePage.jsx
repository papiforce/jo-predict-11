import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Typed from "typed.js";
import videoUrl from "../assets/videos/jo_is_come.mp4";

function HomePage() {
  const typedJSRef = useRef(null);

  useEffect(() => {
    const typedJS = new Typed(typedJSRef.current, {
      strings: [
        "Predicting the Future of the Olympic Games",
        "Join us in Paris 2024",
      ],
      typeSpeed: 70,
      backSpeed: 50,
      backDelay: 500,
      startDelay: 500,
      loop: true,
    });

    return () => typedJS.destroy();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        overflow: "hidden",
        paddingLeft: "0px",
        paddingTop: "10px",
        paddingRight: "0px",
        maxWidth: "none",
      }}
      lg={{
        maxWidth: "none",
      }}
      xl={{
        maxWidth: "none",
      }}
    >
      <Box
        component="video"
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        Your browser does not support HTML5 videos.
      </Box>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      />
      <Box sx={{ position: "relative", zIndex: 1, p: 3, width: "100%" }}>
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
          Paris 2024
        </Typography>
        <Typography variant="h5" sx={{ mb: 4 }}>
          <span ref={typedJSRef} />
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ mt: 4 }}
          component={Link}
          to="/predictions"
        >
          Predictions
        </Button>
      </Box>
    </Box>
  );
}

export default HomePage;
