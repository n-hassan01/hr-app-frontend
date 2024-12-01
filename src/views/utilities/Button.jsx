/* eslint-disable react/prop-types */

const Button = ({ label, onClick, style, className, disabled = false, type = 'button' }) => {
  return (
    <button type={type} onClick={onClick} className={className} style={style} disabled={disabled}>
      {label}
    </button>
  );
};

export default Button;
