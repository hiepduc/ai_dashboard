function Button(props) {
  return (
    <button
      id={props.id}
      className={props.className}
      type="button"
      onClick={props.onClick}
    >
      {props.buttonContent}
    </button>
  );
}
export default Button;
