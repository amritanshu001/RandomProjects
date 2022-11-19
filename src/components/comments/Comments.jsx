import { useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import { commentActions } from "../../store/comment-slice";

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const dispatch = useDispatch();

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addCommentHandler = (comment) => {
    dispatch(
      commentActions.addComment({
        comment: {
          ...comment,
          quoteId: props.quoteId,
          id: Math.random(),
          ts: Date.now(),
        },
      })
    );
  };

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onCommentAdd={addCommentHandler} />}
      <p>Comments...</p>
    </section>
  );
};

export default Comments;
