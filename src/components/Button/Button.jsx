import style from './Button.module.css';

const Button = ({ clickMore, children }) => {
  return (
    <button type="button" className={style.Button} onClick={clickMore}>
      Load more
      {children}
    </button>
  );
};
export default Button;
