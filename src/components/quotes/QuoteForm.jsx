import React, { useRef, useState } from "react";
import { Prompt } from "react-router-dom";

import Card from "../ui/Card";
import LoadingSpinner from "../ui/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [isError, setIsError] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    if (enteredAuthor.length === 0 || enteredText.length === 0) {
      setIsError(true);
      return;
    } else {
      setIsError(false);
    }

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
    authorInputRef.current.value = "";
    textInputRef.current.value = "";
  }

  const formFocusHandler = () => {
    setIsEditing(true);
  };

  const addQuoteHandler = () => {
    setIsEditing(false);
  };

  return (
    <React.Fragment>
      <Prompt
        when={isEditing}
        message="You are leaving the page, all information will be lost.Do you want to continue?"
      />

      <Card>
        <form
          className={classes.form}
          onSubmit={submitFormHandler}
          onFocus={formFocusHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button className="btn" onClick={addQuoteHandler}>
              Add Quote
            </button>
          </div>
          {isError && (
            <p className={classes.error}>Please dont leave the fields blank</p>
          )}
        </form>
      </Card>
    </React.Fragment>
  );
};

export default QuoteForm;
