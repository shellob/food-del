import React from 'react';
import FoodItem from './FoodItem';

function FoodList({ addToCart }) {
  const foodItems = [
    { id: 1, name: 'Пицца Маргарита', price: 450 },
    { id: 2, name: 'Суши', price: 300 },
    { id: 3, name: 'Бургер', price: 200 }
  ];

  return (
    <div>
      <h2>Выберите блюдо:</h2>
      <div>
        {foodItems.map(item => (
          <FoodItem key={item.id} item={item} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default FoodList;
