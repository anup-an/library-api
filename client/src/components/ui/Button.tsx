interface IProps {
  buttonText: string;
}

const Button = (props: IProps) => {
  const { buttonText } = props;
  return <button className="button">{buttonText}</button>;
};

export default Button;
