import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Divider,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Language, IosShare, Phone, Logout } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { logout } from "../features/auth/authSlice";

const LeftSideMenu = (props) => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation(["LeftSideMenu"]);

  const handleLanguageChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  const handleLogout = () => {
    dispatch(logout());
    props.open(false);
  };

  useEffect(() => {
    let userLang = navigator.language || navigator.userLanguage;
    userLang = userLang.split("-");
    if (localStorage.getItem("i18nextLng")?.length > 2) {
      i18next.changeLanguage(userLang[0]);
    }
  }, []);

  return (
    <>
      <Drawer
        anchor="left"
        open={props.isOpen}
        onClose={() => props.open(false)}
      >
        <Box
          sx={{
            maxWidth: "350px",

            background: "#006064",
            height: "100%",
          }}
        >
          <Typography variant="h5" sx={{ textAlign: "center", mt: 3 }}>
            {t("settings")}
          </Typography>

          <List>
            <ListItem
              button
              sx={{
                width: "90%",
                ml: 1,
                background: "#0097a7",
                mt: 3,
                color: "white",
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <Language />
              </ListItemIcon>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={localStorage.getItem("i18nextLng")}
                  label="Language"
                  onChange={handleLanguageChange}
                >
                  <MenuItem value="en">English </MenuItem>
                  <MenuItem value="he">עברית</MenuItem>
                </Select>
              </FormControl>
            </ListItem>

            <ListItem
              button
              sx={{
                width: "90%",
                ml: 1,
                background: "#0097a7",
                mt: 3,
                color: "white",
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <IosShare />
              </ListItemIcon>
              <ListItemText primary={t("apply for expert")} />
            </ListItem>
            <ListItem
              button
              sx={{
                width: "90%",
                ml: 1,
                background: "#0097a7",
                mt: 3,
                color: "white",
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <Phone />
              </ListItemIcon>
              <ListItemText primary={t("contact us")} />
            </ListItem>
            <Divider />
            <ListItem
              button
              sx={{
                width: "90%",
                ml: 1,
                background: "#0097a7",
                mt: 10,
                color: "white",
              }}
              onClick={handleLogout}
            >
              <ListItemIcon sx={{ color: "white" }}>
                <Logout />
              </ListItemIcon>
              <ListItemText primary={t("logout")} />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default LeftSideMenu;
