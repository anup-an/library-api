import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "src/api/user";
import Button from "src/components/ui/Button";
import { isSuccess } from "src/types/ApiTypes";

const Register = () => {
  const history = useNavigate();
  const [registerDetails, setRegisterDetails] = useState({
    username: "",
    password: "",
  });

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const response = await registerUser(registerDetails);
    if (isSuccess(response)) {
      history("/login");
    }
  };

  const updateDetails = (event: React.ChangeEvent<HTMLInputElement>) => {
    event?.preventDefault();
    setRegisterDetails({
      ...registerDetails,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div>
      <form onSubmit={handleRegister}>
        <label htmlFor="username">
          <input
            id="username"
            name="username"
            placeholder="Type an e-mail"
            onChange={updateDetails}
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            placeholder="Type a password"
            type="password"
            onChange={updateDetails}
          />
        </label>
        <Button buttonText="Regsiter" type="submit" />
      </form>
    </div>
  );
};

export default Register;
