import React, {Fragment} from 'react';
import mealsImage from '../../../src/assets/meals.jpg';

import styleClasses from './Header.module.css';
import CartButton from "./CartButton";

const Header = props => {
    return <Fragment>
        <header className={styleClasses.header}>
            <h1>Meals</h1>
            <CartButton onCartOpen={props.onCartOpen}/>
        </header>
        <div className={styleClasses["header-img"]}>
            <img src={mealsImage} alt="meals"/>
        </div>
    </Fragment>
};

export default Header;