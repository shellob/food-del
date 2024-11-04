import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = ({ onProductAdded }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = { name, description, price: parseFloat(price), category_id: parseInt(categoryId) };

    axios.post('http://localhost:3000/api/products', newProduct)
      .then((response) => {
        console.log('Продукт добавлен:', response.data);
        onProductAdded(response.data); // Обновляем список продуктов после добавления
        setName('');
        setDescription('');
        setPrice('');
        setCategoryId('');
      })
      .catch(error => console.error('Ошибка добавления продукта:', error));
  };

  return (
    <form onSubmit={handleAddProduct}>
      <h2>Добавить новый продукт</h2>
      <div>
        <label>Название:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Описание:</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Цена:</label>
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </div>
      <div>
        <label>Категория ID:</label>
        <input type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required />
      </div>
      <button type="submit">Добавить продукт</button>
    </form>
  );
};

export default AddProductForm;
