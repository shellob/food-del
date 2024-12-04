import React, { useState, useEffect } from 'react';

const FoodForm = ({ initialValues = {}, onSubmit }) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [price, setPrice] = useState(initialValues?.price || '');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    setName(initialValues?.name || '');
    setDescription(initialValues?.description || '');
    setPrice(initialValues?.price || '');
    setError(null);
    setSuccess(null); 
  }, [initialValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация на клиентской стороне
    if (!name.trim()) {
      setError('Название не может быть пустым.');
      return;
    }
    if (Number(price) <= 0) {
      setError('Цена должна быть положительным числом.');
      return;
    }

    try {
      await onSubmit({ name, description, price });
      setSuccess('Блюдо успешно сохранено!');
      setError(null); // Сбрасываем ошибку после успешной отправки
    } catch (err) {
      setError('Ошибка при сохранении блюда. Попробуйте еще раз.');
      setSuccess(null); // Сбрасываем сообщение об успехе при ошибке
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Название:</label>
        <input
          type="text"
          placeholder="Введите название блюда"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Описание:</label>
        <textarea
          placeholder="Добавьте описание блюда (например, ингредиенты)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Цена:</label>
        <input
          type="number"
          placeholder="Укажите цену (в рублях)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>
      <button type="submit">{initialValues?.name ? 'Обновить' : 'Добавить'}</button>

      {/* Сообщения об ошибках или успехе */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </form>
  );
};

export default FoodForm;
