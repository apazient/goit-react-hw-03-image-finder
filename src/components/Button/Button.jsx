import style from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ clickMore, children }) => {
  return (
    <button type="button" className={style.Button} onClick={clickMore}>
      Load more
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  clickMore: PropTypes.func,
};

export default Button;
