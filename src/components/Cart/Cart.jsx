import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const items = [
  { id: "01", title: "Test Item", quantity: 3, total: 18, price: 6 },
];

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cartContent.cartItems);
  const cartMapper = (item) => {
    return <CartItem key={item.id} item={item} />;
  };

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <ul>{cartItems.map(cartMapper)}</ul>
      ) : (
        <p>Cart is empty</p>
      )}
    </Card>
  );
};

export default Cart;
