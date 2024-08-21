import { useState } from 'react';
// import { data } from './data';
import { data } from '../utils/data';

export default function useBooks() {
  const [state, setState] = useState({
    booklist: data,
    cart: []
  });

  const addToCart = (book) => {
    setState(prevState => ({
      ...prevState,
      cart: prevState.cart.find((cartItem) => cartItem.id === book.id)
        ? prevState.cart.map((cartItem) =>
            cartItem.id === book.id
              ? { ...cartItem, count: cartItem.count + 1 }
              : cartItem
          )
        : [...prevState.cart, { ...book, count: 1 }]
    }));
  };

  const removeFromCart = (id) => {
    setState(prevState => ({
      ...prevState,
      cart: prevState.cart.filter((cartItem) => cartItem.id !== id)
    }));
  };

  const increase = (id) => {
    setState(prevState => ({
      ...prevState,
      cart: prevState.cart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, count: cartItem.count + 1 }
          : cartItem
      )
    }));
  };

  const decrease = (id) => {
    setState(prevState => ({
      ...prevState,
      cart: prevState.cart.map((cartItem) =>
        cartItem.id === id
          ? { ...cartItem, count: cartItem.count > 1 ? cartItem.count - 1 : 1 }
          : cartItem
      )
    }));
  };

  const toggleSelect = (id) => {
    setState(prevState => ({
        ...prevState,
        cart: prevState.cart.map((cartItem) =>
            cartItem.id === id
                ? { ...cartItem, isSelected: !cartItem.isSelected }
                : cartItem
        )
    }));
};

const placeOrder = () => {
  setState(prevState => {
      const selectedItems = prevState.cart.filter(cartItem => cartItem.isSelected);
      const remainingItems = prevState.cart.filter(cartItem => !cartItem.isSelected);

      console.log('Order placed:', selectedItems);

      return {
          ...prevState,
          cart: remainingItems,
          isLoading: false,
          orderSuccess: {
              message: 'Order placed successfully!',
              cartDetails: selectedItems
          }
      };
  });
};


  return {
    state,
    addToCart,
    increase,
    decrease,
    removeFromCart,
    toggleSelect,
    placeOrder,
  };
}
