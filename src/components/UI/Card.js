import React from "react";
import stylesClasses from './Card.module.css';

const Card = props => {
    return (
        <div className={stylesClasses.card}>
            {props.children}
        </div>
    )
};

export default Card;