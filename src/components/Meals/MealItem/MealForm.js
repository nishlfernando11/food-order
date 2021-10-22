import React, {useRef, useState} from 'react';

import styledClasses from './MealForm.module.css';
import Input from "../../UI/Input";

const MealForm = props => {
    const [formValidity, setFormValidity] = useState(true);
    const amountRef = useRef();
    const addMealToCart = event => {
        event.preventDefault();
        const enteredAmount = amountRef.current.value;
        const enteredAmountNum = +enteredAmount;
        if(enteredAmount.trim().length === 0 || enteredAmountNum < 1 || enteredAmountNum >5) {
            setFormValidity(false);
            return;
        }
        setFormValidity(true);
        props.addToCart(props.id, amountRef.current.value);
    };

    return <form className={styledClasses.form} onSubmit={addMealToCart}>
        <Input ref={amountRef} label="Amount" input={{
            id: 'amount_' + props.id,
            type: 'number',
            min: '1',
            max: '5',
            step: '1',
            defaultValue: '1'
        }}/>
        <button >+ Add</button>
        {!formValidity && <p>Please enter a valid amount between 1 to 5.</p>}
    </form>
};

export default MealForm;