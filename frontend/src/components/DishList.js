import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DishList = ({ onAddToCart, onEditDish, onShowDetails }) => {
  const [dishes, setDishes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/api/products')
      .then(response => setDishes(response.data))
      .catch(error => console.error('Ошибка загрузки блюд:', error));
  }, []);

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
            <span onClick={() => onShowDetails(dish)}>
              <strong>{dish.name}</strong> - {dish.price} руб.
            </span>
            <p>{dish.description}</p> {/* Добавляем описание блюда */}
            <button onClick={() => onAddToCart(dish)}>Добавить в корзину</button>
            <button onClick={() => onEditDish(dish)}>Редактировать</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DishList;