import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StateContext } from "src/App";
import { fetchUser, returnBook } from "src/api/user";
import { Nullable, extractDataOrNull, isSuccess } from "src/types/ApiTypes";
import { isAuthenticated } from "src/types/authenticate";
import { User } from "src/types/user";

const UserInfo = () => {
  const { state } = useContext(StateContext);
  const navigate = useNavigate();
  const [user, setUser] = useState<Nullable<User>>(null);

  const handleReturn = async (id: string) => {
    const response = await returnBook(id);
    if (!isSuccess(response)) {
      alert('Unable to return book')
    }
  };

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

  return (
    <div>
      {user ? (
        <div>
          <div>{user.username}</div>
          <div>
            {user.books_onloan.map((bookInstance) => (
              <div key={bookInstance.id}>
                <img
                  alt={bookInstance.book.title}
                  src={bookInstance.book.book_image || ""}
                />
                <div>{bookInstance.book.title}</div>
                <button onClick={() => handleReturn(bookInstance.id)}>
                  Return
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserInfo;
