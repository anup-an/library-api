import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { DispatchContext } from "src/App";
import { AUTHENTICATE } from "src/actions/authenticate";
import { loginUser } from "src/api/user";
import "src/components/Login/Login.scss";
import Button from "src/components/ui/Button";
import { isSuccess } from "src/types/ApiTypes";
import { authenticated } from "src/types/authenticate";

const Login = () => {
  const history = useNavigate();
  const { dispatch } = useContext(DispatchContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await loginUser(credentials);
    if (isSuccess(response)) {
      dispatch({ type: AUTHENTICATE, payload: authenticated });
      history("/");
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">
          <input
            id="username"
            name="username"
            placeholder="Type your e-mail"
            required
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          <input
            id="password"
            name="password"
            placeholder="Type your password"
            type="password"
            required
            onChange={handleChange}
          />
        </label>
        <Button buttonText="Login" type="submit" />
      </form>
    </div>
  );
};

export default Login;
