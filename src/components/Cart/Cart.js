import React, {useContext} from 'react';
import styledClasses from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../../Store/CartContext";
import CartItem from "./CartItem";

const Cart = props => {

    const cartCtx = useContext(CartContext);

    const cartItems = cartCtx.items.map(item => <CartItem key={item.id} item={item}/>);

    return <Modal onClick={props.onClose}>
        <div className={styledClasses["cart-items"]}>{cartItems}</div>
        <div className={styledClasses.total}>
            <span>Total Amount</span>
            <span>${cartCtx.totalAmount.toFixed(2)}</span>
        </div>
        <div className={styledClasses.actions}>
            <button className={styledClasses["button--alt"]} onClick={props.onClose}>Close</button>
            {cartItems.length > 0 && <button className={styledClasses.button}>Checkout</button>}
        </div>
    </Modal>
};

export default Cart;