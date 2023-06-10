interface IProps {
  buttonText: string;
  type: 'button' | 'submit'
  clickHandler?: () => any
}

const Button = (props: IProps) => {
  const dummyFunction = () => {

  }
  const { buttonText, clickHandler } = props;
  return <button className="button" onClick={clickHandler||dummyFunction}>{buttonText}</button>;
};

export default Button;
