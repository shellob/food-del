import React from 'react'

function FoodItem ({item, addToCart}) {
    return( 
        <div className='food-item'>
            <h3>{item.name}</h3>
            <p>Цена: {item.price} руб.</p>
            <button onClick={() => addToCart(item)}>Добавить в корзину</button>
        </div>)
}

export default FoodItem