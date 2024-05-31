import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: "Analysis", link: "/analysis" },
    { text: "Olympic Facts", link: "/facts" },
    { text: "Predictions", link: "/predictions" },
  ];

  const drawer = (
    <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            component={Link}
            to={item.link}
            key={item.text}
            onClick={handleDrawerToggle}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <AppBar position="static" sx={{ zIndex: 1000, minHeight: "90px" }}>
      <Toolbar
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
        }}
      >
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ gridColumn: "1 / 2" }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box
          component={Link}
          to="/"
          sx={{
            gridColumn: "2 / 3",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={logo} alt="JO 2024" style={{ height: 90 }} />
        </Box>
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gridColumn: "3 / 4",
            }}
          >
            {menuItems.map((item) => (
              <Button
                color="inherit"
                component={Link}
                to={item.link}
                key={item.text}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
      {drawer}
    </AppBar>
  );
}

export default Header;
