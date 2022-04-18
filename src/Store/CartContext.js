import React, {useReducer} from 'react';
import _ from "lodash";

const initialCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (prevState, action) => {
    if (action.type === 'ADD_TO_CART') {
        const meal = prevState.items.filter(m => m.id === action.item.id);
        if (_.isEmpty(meal)) {
            // new item
            const updatedItems = prevState.items.concat(action.item);
            return {
                items: updatedItems,
                totalAmount: prevState.totalAmount + action.item.price * action.item.amount
            }
        } else {
            const updatedItems = prevState.items.map(m => {
                if (m.id === action.item.id) {
                    return {...m, amount: +m.amount + action.item.amount};
                }
                return m;
            });
            return {
                items: updatedItems,
                totalAmount: prevState.totalAmount + action.item.price * action.item.amount
            };
        }
    } else if (action.type === 'REMOVE_FROM_CART') {
        let removedItemPrice = 0;
        const updatedItems = prevState.items.map(m => {
            if(m.id === action.item.id){
                removedItemPrice = m.price;
                if(m.amount > 1) {
                    return {...m, amount: --m.amount}
                }
                return null;
            }
            return m;
        });
        const updatedTotalAmount = prevState.totalAmount - removedItemPrice;
         return {
            items: _.compact(updatedItems),
            totalAmount: updatedTotalAmount
        };

    } else if (action.type === 'DELETE_FROM_CART') {
        const updatedItems = prevState.items.filter(m => m.id !== action.item.id);
        const removedItem = prevState.items.find(m => m.id === action.item.id);
         return {
            items: updatedItems,
            totalAmount: prevState.totalAmount - (removedItem.price * removedItem.amount)
        };

    } else if(action.type = 'CLEAR_CART') {
        return {
            items: [],
            totalAmount: 0
        }
    }
    return initialCartState;

};

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {
    },
    removeItem: (id) => {
    },
    deleteItem: (id) => {
    },
    clearCart: () => {
    }
});

export const CartContextProvider = props => {
    const [cartState, cartDispatcher] = useReducer(cartReducer, initialCartState);

    const addToCartHandle = (item) => {
        cartDispatcher({
            type: 'ADD_TO_CART',
            item
        });
    };

    const removeFromCartHandle = (id) => {
        cartDispatcher({type: 'REMOVE_FROM_CART', item: {id}});
    };

    const deleteFromCartHandle = (id) => {
        cartDispatcher({type: 'DELETE_FROM_CART', item: {id}});
    };

    const clearCartHandle = () => {
        cartDispatcher({type: 'CLEAR_CART'});
    };


    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addToCartHandle,
        removeItem: removeFromCartHandle,
        deleteItem: deleteFromCartHandle,
        clearCart: clearCartHandle,
    };

    return (<CartContext.Provider
        value={cartContext}>
        {props.children}
    </CartContext.Provider>);
};

export default CartContext;