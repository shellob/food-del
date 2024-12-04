import React, { useState, useEffect } from 'react';
import DishList from './components/DishList';
import Cart from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
import DishDetailsModal from './components/DishDetailsModal';
import FoodForm from './components/FoodForm';
import axios from 'axios';
import Cookies from 'js-cookie';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [editingDish, setEditingDish] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Загрузка данных из Cookies при загрузке страницы
  useEffect(() => {
    const savedCart = Cookies.get('cartItems');
    console.log("Загружаем корзину из Cookies:", savedCart);

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        console.log("Парсинг Cookies успешно:", parsedCart);
        setCartItems(parsedCart);
      } catch (error) {
        console.error('Ошибка чтения данных из Cookies:', error);
        Cookies.remove('cartItems'); // Удаляем некорректные данные
      }
    }

    fetchDishes();
  }, []);

  // Сохранение корзины в Cookies при каждом изменении
  useEffect(() => {
    if (cartItems.length > 0) {
      console.log("Сохранение корзины в Cookies:", cartItems);
      try {
        Cookies.set('cartItems', JSON.stringify(cartItems), { expires: 7 });
      } catch (error) {
        console.error('Ошибка сохранения корзины в Cookies:', error);
      }
    } else {
      console.log("Корзина пуста, удаляем Cookies.");
      Cookies.remove('cartItems');
    }
  }, [cartItems]);

  const fetchDishes = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setDishes(response.data);
    } catch (error) {
      console.error('Ошибка загрузки блюд:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductSubmit = async (foodData) => {
    try {
      if (editingDish) {
        await axios.put(`http://localhost:3000/api/products/${editingDish.id}`, foodData);
      } else {
        await axios.post('http://localhost:3000/api/products', foodData);
      }
      await fetchDishes();
      setEditingDish(null);
    } catch (error) {
      console.error('Ошибка при сохранении блюда:', error);
    }
  };

  const handleAddToCart = (dish) => {
    const existingItem = cartItems.find(item => item.id === dish.id);
    if (existingItem) {
      const updatedCart = cartItems.map(item =>
        item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...dish, quantity: 1 }]);
    }
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity })),
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    try {
      await axios.post('http://localhost:3000/api/orders', orderData);
      setOrderPlaced(true);
      setCartItems([]);
      Cookies.remove('cartItems');
    } catch (error) {
      console.error('Ошибка оформления заказа:', error);
    }
  };

  const handleUpdateQuantity = (dish, quantity) => {
    if (quantity > 0) {
      setCartItems(cartItems.map(item =>
        item.id === dish.id ? { ...item, quantity } : item
      ));
    } else {
      setCartItems(cartItems.filter(item => item.id !== dish.id));
    }
  };

  const handleEditDish = (dish) => {
    setEditingDish(dish);
  };

  return (
    <div>
      <h1>Меню</h1>
      {!orderPlaced ? (
        <>
          <FoodForm initialValues={editingDish} onSubmit={handleProductSubmit} />
          {isLoading ? (
            <p>Загрузка блюд...</p>
          ) : (
            <DishList
              dishes={dishes}
              onAddToCart={handleAddToCart}
              onEditDish={handleEditDish}
              onShowDetails={setSelectedDish}
            />
          )}
          <Cart
            cartItems={cartItems}
            onPlaceOrder={handlePlaceOrder}
            onUpdateQuantity={handleUpdateQuantity}
          />
          {selectedDish && (
            <DishDetailsModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
          )}
        </>
      ) : (
        <OrderConfirmation />
      )}
    </div>
  );
};

export default App;
