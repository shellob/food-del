import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Возвращаем пользователя на главную через 3 секунды
    }, 3000);

    return () => clearTimeout(timer); // Очищаем таймер при размонтировании компонента
  }, [navigate]);

  return (
    <div>
      <h2>Заказ оформлен!</h2>
      <p>Спасибо за ваш заказ.</p>
    </div>
  );
};

export default OrderConfirmation;
