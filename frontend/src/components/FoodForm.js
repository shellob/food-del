import React, { useState, useEffect } from 'react';

const FoodForm = ({ initialValues = {}, onSubmit }) => {
  // Обработка случая, когда initialValues равен null или undefined
  const [name, setName] = useState(initialValues?.name || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [price, setPrice] = useState(initialValues?.price || '');

  useEffect(() => {
    setName(initialValues?.name || '');
    setDescription(initialValues?.description || '');
    setPrice(initialValues?.price || '');
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, price });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Название:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Описание:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Цена:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">{initialValues?.name ? 'Обновить' : 'Добавить'}</button>
    </form>
  );
};

export default FoodForm;
