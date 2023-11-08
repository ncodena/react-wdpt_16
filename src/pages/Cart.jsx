import React, { useContext } from 'react';
import { CartContext } from '../context/CartProvider';

const Cart = () => {
  const { cart, removeItem } = useContext(CartContext);
  console.log(cart, 'cart')

  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {cart.length ? cart.map(item => (
          <li key={item._id}>
            {item.name} - Quantity: {item.quantity}
            <button onClick={() => removeItem(item._id)}>Remove item</button>
          </li>
        )) : <p>Your cart is empty</p>}
      </ul>
    </div>
  );
}

export default Cart;