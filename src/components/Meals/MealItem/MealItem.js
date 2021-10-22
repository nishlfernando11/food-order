import React, {useContext} from 'react';
import styledClasses from './MealItem.module.css';
import MealForm from "./MealForm";
import CartContext from "../../../Store/CartContext";

const MealItem = props => {
    const cartCtx = useContext(CartContext);
    const price = `$${props.price.toFixed(2)}`;


    const addToCartHandle = (id, amount) => {
        if(amount > 0) {
            cartCtx.addItem({id, amount: +amount, name: props.name, price: props.price});
        }
    };

    return <li className={styledClasses.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={styledClasses.description}>{props.description}</div>
            <div className={styledClasses.price}>{price}</div>
        </div>
        <div>
            <MealForm id={props.id} addToCart={addToCartHandle}/>
        </div>
    </li>
};

export default MealItem;