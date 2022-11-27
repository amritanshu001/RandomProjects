import HighlightedQuote from "../quotes/HighlightedQuote";
import Comments from "../comments/Comments";
import CommentsList from "../comments/CommentsList";
import NoQuotesFound from "../quotes/NoQuotesFound";
import { useParams, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useHttp from "../../hooks/useHTTP";
import { commentActions } from "../../store/comment-slice";
import { useCallback } from "react";
import Message from "../UI/Message";
import LoadingSpinner from "../ui/LoadingSpinner";

const QuoteComments = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const allQuotes = useSelector((state) => state.quotes.allQuotes);
  const allComments = useSelector((state) => {
    return state.comments.allComments.filter(
      (comment) => comment.quoteId === params.quoteId
    );
  });
  const quote = allQuotes.find((item) => {
    return String(item.id) === String(params.quoteId);
  });

  const commentParser = useCallback((rawData) => {
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
          quoteId: params.quoteId,
          comments: processedComments,
        })
      );
    }
  }, []);

  const {
    isloading: isLoading,
    error: error,
    sendRequest: loadComments,
  } = useHttp(commentParser);

  if (!quote) {
    return <NoQuotesFound />;
  }

  const loadCommentsHandler = () => {
    const fetchCommentsConfig = {
      url: "https://react-requests-4b4d2-default-rtdb.firebaseio.com/comments.json",
      method: "GET",
    };
    loadComments(fetchCommentsConfig);
  };

  let messageContent = null;
  if (error) {
    messageContent = <Message className="error">{error}</Message>;
  }
  if (isLoading) {
    messageContent = <LoadingSpinner />;
  }

  return (
    <div>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={`/allquotes/${params.quoteId}`} exact>
        <div className="centered">
          <Link
            to={`/allquotes/${params.quoteId}/comments`}
            className="btn--flat"
            onClick={loadCommentsHandler}
          >
            View Comments
          </Link>
        </div>
      </Route>
      <Route path={`/allquotes/${params.quoteId}/comments`}>
        {messageContent}
        <Comments quoteId={params.quoteId} />
        <CommentsList comments={allComments} />
      </Route>
    </div>
  );
};

export default QuoteComments;
