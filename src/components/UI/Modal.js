import React, {Fragment} from "react";
import ReactDOM from 'react-dom';

import stylesClasses from './Modal.module.css';

const Backdrop = props => {
    return <div className={stylesClasses.backdrop} onClick={props.onClick}></div>
};

const ModalOverlay = props => {
    return <div className={stylesClasses.modal}>
        <div className={stylesClasses.content}>{props.children}</div>
    </div>
};

const Modal = props => {
    const overlayElement = document.getElementById('backdrop');
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, overlayElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, overlayElement)}
        </Fragment>
    )
};

export default Modal;