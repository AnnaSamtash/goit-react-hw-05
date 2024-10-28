import clsx from 'clsx';
import css from './Button.module.css';

const Button = ({
  children,
  type = 'button',
  selected = false,
  disabled,
  ...otherProps
}) => {
  return (
    <button
      className={clsx(
        css.btn,
        selected && css.isSelected,
        disabled && css.isDisabled
      )}
      type={type}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
