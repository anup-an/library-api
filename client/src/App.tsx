import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { createContext, useEffect, useReducer } from "react";
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

  useEffect(() => {
    (async () => {
      const userResponse = await fetchUser();
      applyApiEffect(
        userResponse,
        (data) => {
          dispatch({ type: AUTHENTICATE, payload: authenticated });
        },
        (error) => {
          dispatch({ type: AUTHENTICATE, payload: unauthenticated });
        }
      );
    })();
  }, []);

  return (
    <ChakraProvider>
      <DispatchContext.Provider value={{ dispatch }}>
        <StateContext.Provider value={{ state }}>
          <div className="App">
            <RouterProvider router={router} />
          </div>
        </StateContext.Provider>
      </DispatchContext.Provider>
    </ChakraProvider>
  );
}

export default App;
