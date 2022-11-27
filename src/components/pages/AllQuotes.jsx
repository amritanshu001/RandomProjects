import QuoteList from "../quotes/QuoteList";
import NoQuotesFound from "../quotes/NoQuotesFound";
import React, { useEffect, useCallback } from "react";
import useHttp from "../../hooks/useHTTP";
import Message from "../UI/Message";
import { quoteActions } from "../../store/quote-slice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AllQuotes.module.css";
import LoadingSpinner from "../ui/LoadingSpinner";

const AllQuotes = (props) => {
  const dispatch = useDispatch();
  const quoteList = useSelector((state) => state.quotes.allQuotes);

  const dispatchQuotes = useCallback(
    (rawdata) => {
      if (!rawdata) {
        dispatch(quoteActions.replaceQuotesyFromServer({ quotes: [] }));
      } else {
        const processData = [];
        for (let key in rawdata) {
          processData.push({
            id: key,
            author: rawdata[key].author,
            text: rawdata[key].text,
            ts: rawdata[key].ts,
          });
        }
        dispatch(
          quoteActions.replaceQuotesyFromServer({ quotes: processData })
        );
      }
    },
    [dispatch, quoteActions]
  );

  const {
    isloading: isLoading,
    error: quoteError,
    sendRequest: fetchQuotes,
  } = useHttp(dispatchQuotes);

  useEffect(() => {
    const fetchQuoteConfig = {
      url: "https://react-requests-4b4d2-default-rtdb.firebaseio.com/quotes.json",
      method: "GET",
    };
    fetchQuotes(fetchQuoteConfig);
  }, [fetchQuotes]);

  let messageContent = null;

  if (quoteError) {
    messageContent = <Message className={styles.error}>{quoteError}</Message>;
  }
  if (isLoading) {
    messageContent = (
      <Message className={styles.loading}>Loading Quotes...</Message>
    );
  }
  //   if (!quoteError && !isLoading && quoteList) {
  //     messageContent = (
  //       <Message className={styles.success}>Successfully loaded</Message>
  //     );
  //   }

  return (
    <React.Fragment>
      {messageContent}
      {quoteList.length != 0 ? (
        <QuoteList quotes={quoteList}></QuoteList>
      ) : (
        <NoQuotesFound />
      )}
    </React.Fragment>
  );
};

export default AllQuotes;
