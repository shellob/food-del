import React from 'react';

const Cart = ({ cartItems, onPlaceOrder, onUpdateQuantity }) => {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Корзина</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - {item.price} руб. x {item.quantity}
            <button onClick={() => onUpdateQuantity(item, item.quantity + 1)}>+</button>
            <button onClick={() => onUpdateQuantity(item, item.quantity - 1)}>-</button>
          </li>
        ))}
      </ul>
      <p>Сумма заказа: {totalPrice} руб.</p>
      <button onClick={onPlaceOrder}>Оформить заказ</button>
    </div>
  );
};

export default Cart;
