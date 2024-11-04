// components/DishList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DishList = ({ categoryId, onAddToCart }) => {
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (categoryId) {
      axios.get(`http://localhost:3000/api/products?category_id=${categoryId}`)
        .then(response => setDishes(response.data))
        .catch(error => console.error('Ошибка загрузки блюд:', error));
    }
  }, [categoryId]);

  const filteredDishes = dishes.filter(dish =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Блюда</h2>
      <input
        type="text"
        placeholder="Поиск по названию..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredDishes.map(dish => (
          <li key={dish.id}>
            {dish.name} - {dish.price} руб.
            <button onClick={() => onAddToCart(dish)}>Добавить в корзину</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DishList;
