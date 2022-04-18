import React, {useRef, useState} from 'react';
import styledClasses from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length ===5;

const Checkout = props => {

    const nameRef = useRef();
    const streetRef = useRef();
    const postalCodeRef = useRef();
    const cityRef = useRef();

    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    });



    const submitHandler = e => {
        e.preventDefault();

        const nameVal = nameRef.current.value;
        const streetVal = streetRef.current.value;
        const postalCodeVal = postalCodeRef.current.value;
        const cityVal = cityRef.current.value;

        setFormValidity({
            name: !isEmpty(nameVal),
            street: !isEmpty(streetVal),
            postalCode: isFiveChars(postalCodeVal),
            city: !isEmpty(cityVal)

        });

        if(!isEmpty(nameVal) && !isEmpty(streetVal) && !isEmpty(cityVal) && isFiveChars(postalCodeVal)) {
            props.submitOrder({
                name: nameVal,
                street: streetVal,
                postalCode: postalCodeVal,
                city: cityVal
            });
        }

        return;

    };

    return (
        <form className={styledClasses.form} onSubmit={submitHandler}>
            <div className={styledClasses["form-control"]}>
                <label htmlFor="name" id="name">Your Name</label>
                <input type="text" id="name" className={styledClasses.input} ref={nameRef}/>
                {!formValidity.name && <span className={styledClasses.invalid}>Please enter a valid name.</span>}
            </div>
            <div className={styledClasses["form-control"]}>
                <label htmlFor="street" id="street">Street</label>
                <input type="text" id="street" className={styledClasses.input} ref={streetRef}/>
                {!formValidity.street && <span className={styledClasses.invalid}>Please enter a valid street.</span>}

            </div>
            <div className={styledClasses["form-control"]}>
                <label htmlFor="postal" id="postal">Postal Code</label>
                <input type="text" id="postal" className={styledClasses.input} ref={postalCodeRef}/>
                {!formValidity.postalCode && <span className={styledClasses.invalid}>Please enter a valid postal code.</span>}
            </div>
            <div className={styledClasses["form-control"]}>
                <label htmlFor="city" id="city">City</label>
                <input type="text" id="city" className={styledClasses.input} ref={cityRef}/>
                {!formValidity.city && <span className={styledClasses.invalid}>Please enter a valid city.</span>}
            </div>
            <div className={styledClasses.actions}>
                <button  type="button" className={styledClasses["button--alt"]} onClick={props.onCancel}>Cancel</button>
                <button className={styledClasses.button}>Submit Order</button>
            </div>
        </form>
    )
};

export default Checkout;