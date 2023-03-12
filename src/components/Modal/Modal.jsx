import { Component } from 'react';
import { createPortal } from 'react-dom';
import style from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleCloseModal);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleCloseModal);
  }
  handleCloseModal = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  clickOverlay = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };
  render() {
    return createPortal(
      <div className={style.overlay} onClick={this.clickOverlay}>
        <div className={style.modal}> {this.props.children}</div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
