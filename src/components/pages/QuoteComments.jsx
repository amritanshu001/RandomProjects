import HighlightedQuote from "../quotes/HighlightedQuote";
import Comments from "../comments/Comments";
import CommentsList from "../comments/CommentsList";
import NoQuotesFound from "../quotes/NoQuotesFound";
import { useParams, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const QuoteComments = (props) => {
  const params = useParams();
  const allQuotes = useSelector((state) => state.quotes.allQuotes);
  const allComments = useSelector((state) => {
    return state.comments.allComments.filter(
      (comment) => comment.quoteId === params.quoteId
    );
  });
  const quote = allQuotes.find((item) => {
    return String(item.id) === String(params.quoteId);
  });

  if (!quote) {
    return <NoQuotesFound />;
  }

  return (
    <div>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={`/allquotes/${params.quoteId}`} exact>
        <div className="centered">
          <Link
            to={`/allquotes/${params.quoteId}/comments`}
            className="btn--flat"
          >
            View Comments
          </Link>
        </div>
      </Route>
      <Route path={`/allquotes/${params.quoteId}/comments`}>
        <Comments quoteId={params.quoteId} />
        <CommentsList comments={allComments} />
      </Route>
    </div>
  );
};

export default QuoteComments;
