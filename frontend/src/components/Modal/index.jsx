import React from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('portal');

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.element = document.createElement('div');
    }

    componentDidMount = () => {
        modalRoot.appendChild(this.element);
    };

    componentWillUnmount = () => {
        modalRoot.removeChild(this.element);
    };

    render() {
        console.log(this.props.children)
        console.log(this.state)
        return createPortal(this.props.children, this.element);
    }
}
