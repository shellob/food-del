// App.js

import React, { useState } from 'react';
import CategoryList from './components/CategoryList';
import DishList from './components/DishList';
import Cart from './components/Cart';
import OrderConfirmation from './components/OrderConfirmation';
import DishDetailsModal from './components/DishDetailsModal';
import AddProductForm from './components/AddProductForm';
import axios from 'axios';

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const [dishes, setDishes] = useState([]);

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
        setCartItems([]); // Очищаем корзину после оформления
        setTimeout(() => window.location.reload(), 1000); // Перезагружаем страницу после подтверждения
      })
      .catch(error => console.error('Ошибка оформления заказа:', error));
  };

  const handleUpdateQuantity = (dish, quantity) => {
    if (quantity > 0) {
      setCartItems(cartItems.map(item => 
        item.id === dish.id ? { ...item, quantity } : item
      ));
    } else {
      setCartItems(cartItems.filter(item => item.id !== dish.id)); // Удаляем, если количество 0
    }
  };

  // Обработка нового продукта
  const handleProductAdded = (newProduct) => {
    if (newProduct.category_id === selectedCategory) {
      setDishes([...dishes, newProduct]);
    }
  };

  return (
    <div>
      <h1>Меню</h1>
      {!orderPlaced ? (
          <>
            <CategoryList onSelectCategory={setSelectedCategory} />
            {selectedCategory && (
              <DishList
                categoryId={selectedCategory}
                onAddToCart={handleAddToCart}
                onShowDetails={setSelectedDish} 
                dishes={dishes} // Передаем список блюд, включая добавленные
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
            <AddProductForm onProductAdded={handleProductAdded} /> {/* Форма для добавления продукта */}
          </>
        ) : (
          <OrderConfirmation />
        )}
      </div>
  );
};

export default App;
