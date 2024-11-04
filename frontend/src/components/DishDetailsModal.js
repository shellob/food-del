// components/DishDetailsModal.js

import React from 'react';

const DishDetailsModal = ({ dish, onClose }) => {
  if (!dish) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{dish.name}</h2>
        <p>Цена: {dish.price} руб.</p>
        <p>{dish.description}</p>
        <button onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default DishDetailsModal;
