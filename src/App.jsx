import { Route, Redirect, Switch } from "react-router-dom";

import Layout from "./components/layout/Layout";
import MainNavigation from "./components/layout/MainNavigation";
import AllQuotes from "./components/pages/AllQuotes";
import AddQuote from "./components/pages/AddQuote";
import QuoteComments from "./components/pages/QuoteComments";
import NoPage from "./components/pages/NoPage";

function App() {
  return (
    <div>
      <MainNavigation />
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/allquotes" />
          </Route>
          <Route path="/index.html" exact>
            <Redirect to="/allquotes" />
          </Route>
          <Route path="/allquotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/addquote">
            <AddQuote />
          </Route>
          <Route path="/allquotes/:quoteId">
            <QuoteComments />
          </Route>
          <Route path="*">
            <NoPage />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
