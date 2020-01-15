import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { IconButton } from '@material-ui/core';
import styled, { css } from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import { withRouter } from 'react-router';
import './styles.css';


// const Moda = props => {
//     const [modalRoot, setModalRoot] = useState();
//     const element = document.createElement('div');
//
//     const handleClose = () => {
//         this.props.history.push('/')
//     };
//
//     useEffect(() => {
//         const modalRoot = document.getElementById('portal');
//         const element = document.createElement('div');
//         modalRoot.appendChild(element);
//         setModalRoot(modalRoot);
//     }, []);
//
//     useEffect(() => {
//        return () => {
//            modalRoot.removeChild(element);
//        }
//     }, []);
//
//     const elements = (
//         <Wrapper className="modal-wrapper">
//             <div className="modal-header">
//                 <h3>{props.title}</h3>
//                 <IconButton onClick={handleClose}>
//                     <CloseIcon />
//                 </IconButton>
//             </div>
//             {props.children}
//         </Wrapper>
//     );
//
//     return createPortal(elements, element);
// };

const modalRoot = document.getElementById('portal');

class Modal extends React.Component {
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

    handleClose = () => {
        this.props.history.push('/')
    };

    render() {
        const elements = (
            <Wrapper className="modal-wrapper" height={this.props.height}>
                <div className="modal-header">
                    <h3>{this.props.title}</h3>
                    <IconButton onClick={this.handleClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                {this.props.children}
            </Wrapper>
        );

        return createPortal(elements, this.element);
    }
}
Modal.propTypes = {
    title: PropTypes.string.isRequired,
    height: PropTypes.string,
};

Modal.defaultProps = {
  height: '420px',
};

const Wrapper = styled.div`
    ${props =>
        css`
          height: ${props.height};
    `};
`;
 
export default withRouter(Modal);
