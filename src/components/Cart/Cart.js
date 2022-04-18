import React, {Fragment, useContext, useState} from 'react';
import styledClasses from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../../Store/CartContext";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = props => {

    const [isCheckedOut, setIsCheckOut] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState();

    const onCheckout = () => {
        setIsCheckOut(true);
    };


    const cartCtx = useContext(CartContext);

    const cartItems = cartCtx.items.map(item => <CartItem key={item.id} item={item}/>);



    const submitOrderHandler = async userData => {
        setIsSubmitting(true);
        const sendOrder = async (userData) =>{
            const response = await fetch('https://react-task-abe81-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json', {
                method: 'POST',
                body: JSON.stringify({
                    user: userData,
                    order: cartCtx.items
                })
            });

            if(!response.ok){
                console.log(response);
                throw new Error('Something went wrong!');
            }
            console.log(response);
            setIsSubmitting(false);
            setIsSubmitted(true);
            cartCtx.clearCart();
        };

        sendOrder(userData).catch(e=> {
            setIsSubmitting(false);
            setIsSubmitted(true);
            setError(e.message);
        });

    };

    const cart = <Modal onClick={props.onClose}>
        <div className={styledClasses["cart-items"]}>{cartItems}</div>
        <div className={styledClasses.total}>
            <span>Total Amount</span>
            <span>${cartCtx.totalAmount.toFixed(2)}</span>
        </div>
        {!isCheckedOut && <div className={styledClasses.actions}>
            <button  type="button" className={styledClasses["button--alt"]} onClick={props.onClose}>Close</button>
            {cartItems.length > 0 && <button type="button" className={styledClasses.button} onClick={onCheckout}>Checkout</button>}
        </div>}
        {isCheckedOut && <Checkout onCancel={props.onClose} submitOrder={submitOrderHandler}/>}
    </Modal>;

    return (
        <Fragment>
            {!isSubmitting && !isSubmitted && cart}
            {isSubmitting && !isSubmitted && <Modal onClick={props.onClose}><p>Your order is being placed..</p></Modal>}
            {isSubmitted  && !isSubmitting && <Modal onClick={props.onClose}><p>Order placed successfully!</p></Modal>}
            {isSubmitted  && !isSubmitting && error && <Modal onClick={props.onClose}><p>{error}</p></Modal>}
        </Fragment>)
};

export default Cart;