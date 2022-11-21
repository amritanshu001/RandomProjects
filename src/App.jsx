import Layout from "./components/layout/Layout";
import MainNavigation from "./components/layout/MainNavigation";
import useHTTP from "./hooks/useHTTP";
import { quoteActions } from "./store/quote-slice";
import { useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";
import Message from "./components/UI/Message";
import styles from "./App.module.css";

function App() {
  const dispatch = useDispatch();

  const dispatchQuotes = useCallback((rawdata) => {
    if (!rawdata) {
      dispatch(quoteActions.replaceQuotesyFromServer({ quotes: [] }));
    } else {
      dispatch(quoteActions.replaceQuotesyFromServer({ quotes: rawdata }));
    }
  }, []);

  const {
    isLoading: isLoading,
    error: quoteError,
    sendRequest: fetchQuotes,
  } = useHTTP(dispatchQuotes);

  useEffect(() => {
    const fetchQuoteConfig = {
      url: "https://react-requests-4b4d2-default-rtdb.firebaseio.com/quotes",
    };
    fetchQuotes(fetchQuoteConfig);
  }, [fetchQuotes]);

  let messageContent = null;

  if (quoteError) {
    messageContent = (
      <Message className={styles.error}>Failed to Load Quotes</Message>
    );
  } else {
    if (isLoading) {
      messageContent = (
        <Message className={styles.loading}>Connecting to server....</Message>
      );
    }
  }

  return (
    <div>
      <MainNavigation />
      {messageContent}
      <Layout />
    </div>
  );
}

export default App;
