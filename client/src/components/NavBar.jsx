import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  AppBar,
  Typography,
  Button,
  IconButton,
  Menu,
  Box,
  Toolbar,
  Grid,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";

import MenuItem from "@mui/material/MenuItem";

const NavBar = (props) => {
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  let { user } = useSelector((state) => state.auth);
  user = user || { id: 5, name: "John" };
  const handleClose = () => {
    console.log("close");
  };
  const handleMenu = () => {
    // props.setOpen(true);
  };

  return (
    <header>
      <AppBar position="static" sx={{ backgroundColor: "secondary.dark" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 1, color: "#f9fbe7" }}
            onClick={() => {
              props.setOpen(true);
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              color: "#e65100",
              textAlign: "center",
              fontSize: { xs: "15px", sm: "20px", md: "26px" },
              fontWeight: "bold",
              fontFamily: "'Stone Age', sans-serif",
            }}
          >
            World Trivia Battle
          </Typography>
          {user && (
            <>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  color: "#f9fbe7",
                  fontSize: { xs: "10px", sm: "16px" },
                  ml: { xs: 1 },
                }}
              >
                Welcome , {user.name}
              </Typography>
              <Box>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default NavBar;
