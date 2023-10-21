import { ChakraProvider, Flex } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { createContext, useEffect, useReducer, useState } from "react";
import { AppState, appReducer, initialState } from "src/reducer";
import "./App.scss";
import { AppActions } from "./actions";
import { AUTHENTICATE } from "./actions/authenticate";
import { fetchUser } from "./api/user";
import { applyApiEffect } from "./types/ApiTypes";
import { authenticated, unauthenticated } from "./types/authenticate";
import BookDetailsPage from "./views/BookDetailsPage";
import BookListPage from "./views/BookListPage";
import LandingPage from "./views/LandingPage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import RootLayout from "./views/RootLayout";
import UserPage from "./views/UserPage";
import Loader from "./components/ui/Loader";

export const StateContext = createContext<{ state: AppState }>({
  state: initialState,
});

export const DispatchContext = createContext<{
  dispatch: React.Dispatch<AppActions>;
}>({
  dispatch: () => null,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <div>404</div>,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/books",
        element: <BookListPage />,
      },
      {
        path: "/books/:id",
        element: <BookDetailsPage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const userResponse = await fetchUser();
      applyApiEffect(
        userResponse,
        (data) => {
          dispatch({ type: AUTHENTICATE, payload: authenticated });
          setLoading(false);
        },
        (error) => {
          dispatch({ type: AUTHENTICATE, payload: unauthenticated });
          setLoading(false);
        }
      );
    })();
  }, []);

  return (
    <ChakraProvider>
      <DispatchContext.Provider value={{ dispatch }}>
        <StateContext.Provider value={{ state }}>
          {!loading ? (
            <div className="App">
              <RouterProvider router={router} />
            </div>
          ) : (
            <Flex height="100vh" alignItems="center" justifyContent="center">
              <Loader displayText="" />
            </Flex>
          )}
        </StateContext.Provider>
      </DispatchContext.Provider>
    </ChakraProvider>
  );
}

export default App;
