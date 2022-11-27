import React, { useState, useCallback, useEffect } from "react";
import { useHistory } from "react-router-dom";
import useHttp from "../../hooks/useHTTP";

import QuoteForm from "../quotes/QuoteForm";
import styles from "./AddQuote.module.css";
import Message from "../UI/Message";
import LoadingSpinner from "../ui/LoadingSpinner";

const AddQuote = (props) => {
  const [quoteId, setQuoteId] = useState(null);

  const postQuoteData = useCallback((rawData) => {
    console.log(rawData.name);
    setQuoteId(rawData.name);
  }, []);

  const {
    isloading: isLoading,
    error: quoteError,
    sendRequest: postQuote,
  } = useHttp(postQuoteData);

  const redirect = useHistory();

  useEffect(() => {
    if (!quoteError && !isLoading && quoteId) {
      console.log(quoteId, isLoading, quoteError);
      setQuoteId(null);
      redirect.push("/allquotes");
    }
  }, [quoteError, isLoading, quoteId]);

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
  };

  return (
    <React.Fragment>
      <QuoteForm isLoading={isLoading} onAddQuote={addQuote} />
    </React.Fragment>
  );
};

export default AddQuote;
