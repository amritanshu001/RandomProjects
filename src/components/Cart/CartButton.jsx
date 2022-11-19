import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartToggleActions } from "../../store/cartshow";

const CartButton = (props) => {
  const toggleCart = useDispatch();

  const totalItems = useSelector((state) => state.cartContent.totalItems);

  const clickHandler = () => {
    toggleCart(cartToggleActions.toggleCart());
  };
  return (
    <button className={classes.button} onClick={clickHandler}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default CartButton;
