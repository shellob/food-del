import React from 'react'

function FoodItem ({name, price}) {
    return( 
        <div className='food-item'>
            <h3>{name}</h3>
            <p>Цена: {price} руб.</p>
            <button>Добавить в корзину</button>
        </div>)
}

export default FoodItem