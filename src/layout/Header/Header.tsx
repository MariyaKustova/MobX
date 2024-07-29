import React from "react";

import { AppBar, Toolbar, Typography } from "@mui/material";
import { routes } from "../../routes";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense" sx={{ width: "960px", mr: "auto", ml: "auto" }}>
        {routes[0].children.map(({ path, title }) => (
          <Typography
            variant="h6"
            color="inherit"
            component="div"
            sx={{ mr: 2, cursor: "pointer" }}
            key={title}
          >
            <NavLink
              style={({ isActive }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: "white",
                  textDecoration: "none",
                };
              }}
              to={path}
            >
              {title}
            </NavLink>
          </Typography>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
