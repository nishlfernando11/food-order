import Header from "./components/Layout/Header";

import './App.css';
import React, {useState} from "react";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import {CartContextProvider} from '../src/Store/CartContext'
function App() {

    const [isShowCart, setIsShowCart] = useState(false);

    const cartOpenHandler = () => {
        setIsShowCart(true);
    };
    const cartCloseHandler = () => {
        setIsShowCart(false);
    };

    return (
        <CartContextProvider>
            {isShowCart && <Cart onClose={cartCloseHandler}/>}
            <Header onCartOpen={cartOpenHandler}/>
            <main>
                <Meals/>
            </main>
        </CartContextProvider>
    );
}

export default App;
