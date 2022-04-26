export const initialState = {
  cart: [],
  user: null,
};

{
  /* confused here */
}
export const getCartTotal = (cart) =>
  cart?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'ADD_TO_CART':
      return {
        // return what the state looked like before but add the new item
        ...state,
        cart: [...state.cart, action.item],
      };
    case 'REMOVE_FROM_CART':
      const index = state.cart.findIndex((item) => item.id === action.item.id);
      if (index == -1) {
        console.log('index was -1');
      }
      return {
        ...state,
        cart: state.cart.filter((item) => item !== state.cart[index]),
      };
    default:
      return state;
  }
};

export default reducer;
