import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quoteList, sortOrder) => {
  return quoteList.slice().sort((q1, q2) => {
    if (sortOrder === "asc") {
      return q1.ts - q2.ts;
    } else {
      return q2.ts - q1.ts;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  let sortOrder = "asc";
  if (queryParams.get("sort")) {
    sortOrder = queryParams.get("sort");
  }

  const sortHandler = () => {
    history.push("/allquotes?sort=" + (sortOrder === "asc" ? "desc" : "asc"));
  };

  const sortedQuoteList = sortQuotes(props.quotes, sortOrder);

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortHandler}>
          Sort {sortOrder === "asc" ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuoteList.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
