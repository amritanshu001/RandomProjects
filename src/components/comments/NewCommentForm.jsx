import { useRef, useState } from "react";

import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const [isError, setIsError] = useState(false);

  const submitFormHandler = (event) => {
    event.preventDefault();
    if (commentTextRef.current.value.length === 0) {
      setIsError(true);
      return;
    } else {
      setIsError(false);
    }

    props.onCommentAdd({ text: commentTextRef.current.value });
    commentTextRef.current.value = "";
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
        {isError && (
          <p className={classes.error}>Please dont leave blank comments</p>
        )}
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
