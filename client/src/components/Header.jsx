import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
// eslint-disable-next-line 
import { BrowserRouter as Router, Link } from "react-router-dom";

var Header = (props) => {
  return (
    <header>
      <h1>
        <HighlightIcon />
        NoteKeeper
        <span className="topnav-outer">
        <span className="topnav-right">
        <Link className="link" to={props.link} onClick={props.handleClick}>{props.linkText}</Link>
      </span>
      </span>
      </h1>
      
    </header>
  );
};

export default Header;
