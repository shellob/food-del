// components/CategoryList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategoryList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Ошибка загрузки категорий:', error));
  }, []);

  return (
    <div>
      <h2>Категории</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id} onClick={() => onSelectCategory(category.id)}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
