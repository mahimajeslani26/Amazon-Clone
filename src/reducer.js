export const initialState = {
  cart: [],
  user: null,
};

//selector
export const getCartTotal = (cart) =>
  cart?.reduce((amount, item) => item.price * item.qty + amount, 0);

export const getCartSize = (cart) =>
  cart?.reduce((amount, item) => item.qty + amount, 0);

const reducer = (state, action) => {
  //console.log(action);
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cart: [...state.cart, action.item],
      };

    case 'EDIT_QUANTITY':
      const index = state.cart.findIndex((item) => item.id === action.item.id);
      let newCart = [...state.cart];
      newCart[index].qty = action.item.qty;
      return {
        ...state,
        cart: newCart,
      };

    case 'REMOVE_FROM_CART':
      const ind = state.cart.findIndex((item) => item.id === action.id);

      let updatedCart = [...state.cart];
      if (ind >= 0) {
        updatedCart.splice(ind, 1);
      } else {
        console.warn(
          `Cant remove product (id : ${action.id}) as its not in the cart`
        );
      }
      console.log('new Cart', updatedCart);
      return {
        ...state,
        cart: updatedCart,
      };

    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
  }
};

export default reducer;
