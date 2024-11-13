import React, { useState, useEffect } from 'react';
import DishList from './components/DishList';
import Cart from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
import DishDetailsModal from './components/DishDetailsModal';
import FoodForm from './components/FoodForm';
import axios from 'axios';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [editingDish, setEditingDish] = useState(null);

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setDishes(response.data);
    } catch (error) {
      console.error('Ошибка загрузки блюд:', error);
    }
  };

  const handleAddToCart = (dish) => {
    const existingItem = cartItems.find(item => item.id === dish.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...dish, quantity: 1 }]);
    }
  };

  const handlePlaceOrder = () => {
    const orderData = {
      items: cartItems.map(item => ({ productId: item.id, quantity: item.quantity })),
      total: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };

    axios.post('http://localhost:3000/api/orders', orderData)
      .then(() => {
        setOrderPlaced(true);
        setCartItems([]);
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch(error => console.error('Ошибка оформления заказа:', error));
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

  const handleProductSubmit = async (foodData) => {
    try {
      if (editingDish) {
        await axios.put(`http://localhost:3000/api/products/${editingDish.id}`, foodData);
        setEditingDish(null);
      } else {
        await axios.post('http://localhost:3000/api/products', foodData);
      }
      fetchDishes();
    } catch (error) {
      console.error('Ошибка при сохранении блюда:', error);
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
            <DishList
              dishes={dishes}
              onAddToCart={handleAddToCart}
              onEditDish={handleEditDish}
              onShowDetails={setSelectedDish}
            />
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
