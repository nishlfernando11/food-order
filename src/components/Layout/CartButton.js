import React, {useContext, useEffect, useState} from 'react';

import CartIcon from "../Cart/CartIcon";

import styledClasses from './CartButton.module.css';
import CartContext from "../../Store/CartContext";

const CartButton = props => {
    const [cartBtnHighlighted, setCartBtnHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const itemsCount = cartCtx.items.reduce((prev, current) => +prev + current.amount, 0);
    const  cartOpenHandle = () => {
        props.onCartOpen();
    };


    const buttonClasses = `${styledClasses.button} ${cartBtnHighlighted ? styledClasses.bump : ''}`;
    useEffect(() =>{
        if(cartCtx.items.length === 0){
            return;
        }
        setCartBtnHighlighted(true);

        const timer = setTimeout(() => {
            setCartBtnHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [cartCtx.items]);

    return <button className={buttonClasses} onClick={cartOpenHandle}>
        <span className={styledClasses.icon}><CartIcon/></span>
        <span>Your Cart</span>
        <span className={styledClasses.badge}>{itemsCount}</span>
    </button>
};

export default CartButton;