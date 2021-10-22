import React, {Fragment, useContext} from 'react';
import styledClasses from "./CartItem.module.css";
import CartContext from "../../Store/CartContext";
import BinIcon from "./BinIcon";

const CartItem = props => {
    const cartCtx = useContext(CartContext);

    const removeFromCartHandler = (id) => {
        cartCtx.removeItem(id);
    };
    const deleteFromCartHandler = (id) => {
        cartCtx.deleteItem(id);
    };
    const addToCartHandler = (event) => {
        cartCtx.addItem({...props.item, amount: 1});
    };
    return <Fragment>
        <li className={styledClasses["cart-item"]} key={props.item.id}>
            <div className={styledClasses.item}>
                <h2>{props.item.name}</h2>
                <div className={styledClasses["item-details"]}>
                    <span className={styledClasses.price}>${props.item.price.toFixed(2)}</span>
                    <span className={styledClasses.amount}>x{props.item.amount}</span>
                </div>
            </div>
            <div className={styledClasses.actions}>
                <button onClick={removeFromCartHandler.bind(null, props.item.id)}>-</button>
                <button onClick={addToCartHandler.bind(null, props.item)}>+</button>
                <button onClick={deleteFromCartHandler.bind(null, props.item.id)}>
                    <BinIcon/>
                </button>
            </div>
        </li>
    </Fragment>
};

export default CartItem;