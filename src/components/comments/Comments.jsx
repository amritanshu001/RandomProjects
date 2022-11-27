import { useState, useCallback, useEffect } from "react";
import useHttp from "../../hooks/useHTTP";

import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import Message from "../UI/Message";
import LoadingSpinner from "../ui/LoadingSpinner";
import { useDispatch } from "react-redux";
import { commentActions } from "../../store/comment-slice";

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [commentId, setCommentId] = useState(null);
  const dispatch = useDispatch();
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const postedComment = useCallback((rawData) => {
    setCommentId(rawData.name);
  }, []);

  const loadedComments = useCallback((rawData) => {
    if (rawData) {
      let processedComments = [];
      for (let key in rawData) {
        processedComments.push({
          id: key,
          quoteId: rawData[key].quoteId,
          text: rawData[key].text,
          ts: rawData[key].ts,
        });
      }
      dispatch(
        commentActions.loadComments({
          quoteId: props.quoteId,
          comments: processedComments,
        })
      );
    }
  }, []);

  const {
    isloading: isLoading,
    error: postCommentError,
    sendRequest: postComment,
  } = useHttp(postedComment);

  const {
    isloading: commentsLoading,
    error: loadingError,
    sendRequest: refreshComments,
  } = useHttp(loadedComments);

  useEffect(() => {
    if (!isLoading && !postCommentError && commentId) {
      refreshComments();
    }
  }, [isLoading, postCommentError, commentId]);

  const postCommentHandler = (comment) => {
    const commentConfig = {
      url: "https://react-requests-4b4d2-default-rtdb.firebaseio.com/comments.json",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        ...comment,
        quoteId: props.quoteId,
        ts: Date.now(),
      },
    };

    postComment(commentConfig);
  };

  const addCommentHandler = (comment) => {
    postCommentHandler(comment);
  };

  let messageContent = null;
  if (postCommentError) {
    messageContent = <Message className="error">{postCommentError}</Message>;
  }
  if (isLoading) {
    messageContent = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  // if (!isLoading && !postCommentError && commentId) {
  //   messageContent = <Message className="success">Posted!</Message>;
  // }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onCommentAdd={addCommentHandler} />}
      {messageContent}
    </section>
  );
};

export default Comments;
