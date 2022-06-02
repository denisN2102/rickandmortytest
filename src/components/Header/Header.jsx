import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import s from "./Header.module.css";

const Header = ({ user, setUser }) => {
  return (
    <div className={s.wrapp}>
      <div className={s.content}>
        <div>
          <Link to="/">Rick and Morty</Link>
        </div>
        <div>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setUser(null);
            }}
          >
            Exit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
