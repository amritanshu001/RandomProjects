import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import QuoteList from "../quotes/QuoteList";
import { useSelector, useDispatch } from "react-redux";
import NoQuotesFound from "../quotes/NoQuotesFound";
import QuoteForm from "../quotes/QuoteForm";
import { useState } from "react";
import { quoteActions } from "../../store/quote-slice";
import QuoteComments from "../pages/QuoteComments";
import NoPage from "../pages/NoPage";
import styles from "./Layout.module.css";

const DUMMY_QUOTES = [
  { id: "01", author: "Amritanshu", text: "Lets build this page" },
];

const Layout = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  let quoteList = useSelector((state) => state.quotes.allQuotes);

  const dispatch = useDispatch();
  const redirect = useHistory();

  const addQuote = (quote) => {
    setIsLoading(true);
    dispatch(
      quoteActions.addQuote({
        quote: { ...quote, id: Math.random(), ts: Date.now() },
      })
    );
    setIsLoading(false);
    redirect.replace("/allquotes");
  };

  return (
    <main className={styles.main}>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/allquotes" />
        </Route>
        <Route path="/allquotes" exact>
          {quoteList.length != 0 ? (
            <QuoteList quotes={quoteList}></QuoteList>
          ) : (
            <NoQuotesFound />
          )}
        </Route>
        <Route path="/addquote">
          <QuoteForm isLoading={isLoading} onAddQuote={addQuote} />
        </Route>
        <Route path="/allquotes/:quoteId">
          <QuoteComments />
        </Route>
        <Route path="*">
          <NoPage />
        </Route>
      </Switch>
    </main>
  );
};

export default Layout;
