import React from 'react';
import styledClasses from './AvailableMeals.module.css';
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
    {
        id: 'c1',
        name: 'Moss Burger',
        description: 'Vegetarian burger with moss and vege patty',
        price: 6.5
    },
    {
        id: 'c2',
        name: 'Moss Wrap',
        description: 'Vegetarian wrap with moss and Quorn filling',
        price: 4.1
    },
    {
        id: 'c3',
        name: 'Chicken Wrap',
        description: 'Chicken wrap with vegetables and cheese',
        price: 12.5
    },
    {
        id: 'c4',
        name: 'Chicken Burger',
        description: 'Chicken burger with vegetables and cheese',
        price: 20.5
    },
    {
        id: 'c5',
        name: 'Chicken Rice',
        description: 'Chicken rice with vegetables and cheese',
        price: 21.5
    },
    {
        id: 'c6',
        name: 'Egg Rice',
        description: 'Egg rice with vegetables and cheese',
        price: 10.5
    }
];

const AvailableMeals = props => {
    const mealsList = DUMMY_MEALS.map(meal =>
        <MealItem
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
            key={meal.id}
        />);

    return (
        <section className={styledClasses.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
};

export default AvailableMeals;