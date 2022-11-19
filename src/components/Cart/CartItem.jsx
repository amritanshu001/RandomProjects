import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartContentActions } from "../../store/cartitem";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const addHandler = () => {
    const item = {
      id: props.item.id,
      title: props.item.description,
      price: props.item.price,
      quantity: 1,
      amount: props.item.price,
    };
    dispatch(cartContentActions.addToCart({ item }));
  };

  const removeHandler = () => {
    dispatch(cartContentActions.removeFromCart({ id: props.item.id }));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{props.item.title}</h3>
        <div className={classes.price}>
          ${props.item.amount.toFixed(2)}{" "}
          <span className={classes.itemprice}>
            (${props.item.price.toFixed(2)}/item)
          </span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{props.item.quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeHandler}>-</button>
          <button onClick={addHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
