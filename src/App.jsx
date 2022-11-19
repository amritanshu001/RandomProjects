import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import Notification from "./components/UI/Notification";
import { cartAddToServer, fecthFromServer } from "./store/cartitem";
import { cartToggleActions } from "./store/cartshow";

let initial = true;

function App() {
  const showCart = useSelector((state) => state.showCart.cartToggle);
  const cartItems = useSelector((state) => state.cartContent.cartItems);
  const notification = useSelector((state) => state.showCart.notificationData);
  const changed = useSelector((state) => state.cartContent.changed);
  const dispatch = useDispatch();

  useEffect(() => {
    const timeId = setTimeout(() => {
      if (notification) {
        dispatch(cartToggleActions.clearNotification());
      }
    }, 5000);

    return () => {
      clearTimeout(timeId);
    };
  }, [notification]);

  useEffect(() => {
    if (initial) {
      initial = false;
      dispatch(fecthFromServer());
      return;
    }
    if (changed) {
      dispatch(cartAddToServer(cartItems));
    }
  }, [cartItems, dispatch]);

  return (
    <React.Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </React.Fragment>
  );
}

export default App;
