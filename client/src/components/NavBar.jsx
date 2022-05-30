import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  AppBar,
  Typography,
  IconButton,
  Menu,
  Box,
  Toolbar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import MenuItem from "@mui/material/MenuItem";

const NavBar = (props) => {
 
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };
  const handleQuestions = () => {
    handleClose();
    navigate("/sugest");
  };
  const handleAdmin = () => {
    handleClose();
    navigate("/admin");
  };

  return (
    <header>
      <AppBar position="static" sx={{ backgroundColor: "#9C27B0" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ color: "#f9fbe7" }}
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
              color: "#f9fbe7",
              textAlign: "center",
              fontSize: { xs: "15px", sm: "20px", md: "26px" },
              fontWeight: "bold",
              fontFamily: "'Stone Age', sans-serif",
            }}
          ></Typography>
          {user && (
            <>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  textAlign: "center",
                  color: "#f9fbe7",
                  fontSize: { xs: "10px", sm: "16px" },
                  ml: { xs: 1 },
                }}
              >
                Welcome, {user.name}
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
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleQuestions}>Questions</MenuItem>
                  <MenuItem onClick={handleAdmin}>Admin Dashboard</MenuItem>
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
