import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Person } from "@mui/icons-material";
import { People } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <AppBar style={{ background: "rgba(44,44,44,0.9)" }} position="static">
        <Toolbar>
          {/* <img
            src={logo}
            style={{ height: "1.6rem", width: "8rem" }}
            alt="logo"
          /> */}
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Codeforces Visualizer
          </Typography>

          <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                color="inherit"
                style={{ color: "white", marginRight: 16 }}
              >
                <Person />
                Single User
              </Button>
          </Link>

          <Link to="/compare" style={{ textDecoration: "none" }}>
            <Button color="inherit" style={{ color: "white", marginRight: 16 }}>
            <People />
              Compare
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
