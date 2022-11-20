import classes from "./NoQuotesFound.module.css";
import { Link } from "react-router-dom";

import { useState } from "react";

const NoQuotesFound = () => {

  const returnContent =(
    <div className={classes.noquotes}>
      <p>No quotes found!!</p>
      <Link className="btn" to="/addquote">
        Add a Quote
      </Link>
    </div>);


  return returnContent;
};

export default NoQuotesFound;
