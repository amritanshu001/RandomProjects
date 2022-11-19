import { createSlice } from "@reduxjs/toolkit";
import { cartToggleActions } from "./cartshow";

const initialState = { cartItems: [], totalItems: 0, changed: false };

const cartContentSlice = createSlice({
  name: "showCart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.changed = true;
      const indx = state.cartItems.findIndex((item) => {
        return item.id === action.payload.item.id;
      });
      if (indx === -1) {
        state.totalItems++;
        state.cartItems = state.cartItems.concat(action.payload.item);
      } else {
        state.totalItems++;
        state.cartItems = state.cartItems.map((item, i) => {
          return {
            ...item,
            quantity:
              i === indx
                ? Number(item.quantity) + Number(action.payload.item.quantity)
                : Number(item.quantity),
            amount:
              i === indx
                ? Number(item.amount) + Number(action.payload.item.amount)
                : Number(item.amount),
          };
        });
      }
    },
    removeFromCart: (state, action) => {
      state.changed = true;
      const indx = state.cartItems.findIndex((item) => {
        return item.id === action.payload.id;
      });
      if (state.cartItems[indx].quantity > 1) {
        state.totalItems--;
        state.cartItems = state.cartItems.map((item, i) => {
          return {
            ...item,
            quantity:
              i === indx ? Number(item.quantity) - 1 : Number(item.quantity),
            amount:
              i === indx
                ? Number(item.amount) - Number(item.price)
                : Number(item.amount),
          };
        });
      } else {
        state.totalItems =
          Number(state.totalItems) === 0 ? 0 : state.totalItems - 1;
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
      }
    },
    emptyCart: (state) => {
      state = initialState;
    },
    replaceCart: (state, action) => {
      state.cartItems = action.payload.cartItems;
      state.totalItems = action.payload.cartItems.reduce((total, item) => {
        return total + Number(item.quantity);
      }, 0);
    },
  },
});

export const cartAddToServer = (cart) => {
  return async (dispatch) => {
    dispatch(
      cartToggleActions.showNotification({
        status: "loading",
        title: "Loading...",
        message: "Posting cart to our Database",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-requests-4b4d2-default-rtdb.firebaseio.com/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );
      if (!response.ok) {
        throw new Error("Failed to save data on server");
      }
    };

    try {
      await sendRequest();
      dispatch(
        cartToggleActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart saved on database",
        })
      );
    } catch (servError) {
      dispatch(
        cartToggleActions.showNotification({
          status: "error",
          title: "Error",
          message: servError.message,
        })
      );
    }
  };
};

export const fecthFromServer = () => {
  return async (dispatch) => {
    dispatch(
      cartToggleActions.showNotification({
        status: "loading",
        title: "Loading...",
        message: "Retrieving cart from database",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://react-requests-4b4d2-default-rtdb.firebaseio.com/cart.json"
      );
      if (!response.ok) {
        throw new Error("Failed to retrieve data from server");
      }
      return response.json();
    };
    try {
      const cartResponse = await sendRequest();
      dispatch(
        cartContentSlice.actions.replaceCart({
          cartItems: cartResponse ? cartResponse : [],
        })
      );
      console.log(cartResponse);
      dispatch(
        cartToggleActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Cart fetched from database successfully",
        })
      );
    } catch (servError) {
      dispatch(
        cartToggleActions.showNotification({
          status: "error",
          title: "Error",
          message: servError.message,
        })
      );
    }
  };
};

export const cartContentActions = cartContentSlice.actions;

export default cartContentSlice.reducer;
