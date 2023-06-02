import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ onClose, largeImageURL }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdrop = event => {
    const { target, currentTarget } = event;
    if (target === currentTarget) {
      onClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={handleBackdrop}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default Modal;
