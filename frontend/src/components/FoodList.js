import React from 'react'
import FoodItem from './FoodItem'

function FoodList() {
    const foodItems = [
        {id: 1, name: "пирожок с капустой", price: 50},
        {id: 2, name: "пирожок с грибами и картошкой", price: 55},
        {id: 3, name: "пирожок с яблоком", price: 40}
    ];

    return (
        <div>
            <h2>Выберете блюда:</h2>
            <div>
                {foodItems.map(food => (
                    <FoodItem key = {food.id} name = {food.name} price = {food.price}/>
                ))}
            </div>
        </div>
    )
}

export default FoodList;