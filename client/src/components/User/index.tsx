import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "src/App";
import { fetchUser } from "src/api/user";
import { Nullable, extractDataOrNull } from "src/types/ApiTypes";
import { isAuthenticated } from "src/types/authenticate";
import { User } from "src/types/user";

const UserInfo = () => {
  const { state } = useContext(StateContext);
  const navigate = useNavigate();
  const [user, setUser] = useState<Nullable<User>>(null);
  useEffect(() => {
      (async () => {
      if (!isAuthenticated(state.authStatus)) {
        navigate("/login");
        return;
      }
      const loggedUser = await fetchUser();
      setUser(extractDataOrNull(loggedUser));
    })();
  }, [state.authStatus, navigate]);
  return <div>{user ? <div>{user.username}</div> : ""}</div>;
};

export default UserInfo;
