import { Route, Redirect, Switch, useHistory } from "react-router-dom";
import QuoteList from "../quotes/QuoteList";
import { useSelector, useDispatch } from "react-redux";
import NoQuotesFound from "../quotes/NoQuotesFound";
import QuoteForm from "../quotes/QuoteForm";
import { useState, useCallback } from "react";
import { quoteActions } from "../../store/quote-slice";
import useHTTP from "../../hooks/useHTTP";

import QuoteComments from "../pages/QuoteComments";
import NoPage from "../pages/NoPage";
import styles from "./Layout.module.css";
import Message from "../UI/Message";

const Layout = (props) => {
  let quoteList = useSelector((state) => state.quotes.allQuotes);
  const [quoteId, setQuoteId] = useState(null);

  const postQuoteData = useCallback((rawData) => {
    console.log(rawData.name);
    setQuoteId(rawData.name);
  }, []);

  const {
    isloading: isLoading,
    error: quoteError,
    sendRequest: postQuote,
  } = useHTTP(postQuoteData);

  const dispatch = useDispatch();
  const redirect = useHistory();

  const redirectFunction = () => {
    if (!quoteError && !isLoading && quoteId) {
      console.log(quoteId, isLoading, quoteError);
      // setQuoteId(null);
      redirect.push("/allquotes");
    }
  };

  const addQuote = (quote) => {
    const quoteConfig = {
      url: "https://react-requests-4b4d2-default-rtdb.firebaseio.com/quotes.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: { ...quote, ts: Date.now() },
    };
    postQuote(quoteConfig);
    console.log("quoteid: ", quoteId);
    dispatch(
      quoteActions.addQuote({
        quote: { ...quote, id: quoteId, ts: Date.now() },
      })
    );
    redirectFunction();
  };

  let messageContent = null;
  if (quoteError) {
    messageContent = <Message className={styles.error}>{quoteError}</Message>;
  } else {
    if (isLoading) {
      messageContent = (
        <Message className={styles.loading}>Posting Quote to server...</Message>
      );
    }
  }

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
          {messageContent}
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
