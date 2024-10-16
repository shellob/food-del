import React, {useState} from "react";
import Header from "./components/Header";
import FoodList from "./components/FoodList";

function App() {

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  }

  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_,i)=> i !== index));
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  return (
   <div className="App">
    <Header />
    <FoodList addToCart = {addToCart}/>
    <div>
      <h2>Корзина</h2>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, index) => (
              <li key = {index}>
                {item.name}  -{item.price} руб.
                <button onClick={()=> removeFromCart(index)}>Удалить</button>
              </li>
            ))}
          </ul>
          <h3>Общая стоимость: {totalPrice} руб.</h3>
        </div>
      )}
    </div>
   </div> 
  );
            }

export default App;
