import Counter from "./components/Counter";
import React from "react";
import Header from "./components/Header";
import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <React.Fragment>
      <Header></Header>
      {!isLoggedIn && <Auth></Auth>}
      {isLoggedIn && <UserProfile />}
      {isLoggedIn && <Counter />}
    </React.Fragment>
  );
}

export default App;
