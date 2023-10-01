import { ChakraProvider } from "@chakra-ui/react";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { createContext, useReducer } from "react";
import { AppState, appReducer, initialState } from "src/reducer";
import "./App.scss";
import { AppActions } from "./actions";
import { authenticated } from "./types/authenticate";
import BookListPage from "./views/BookListPage";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import BookDetailsPage from "./views/BookDetailsPage";
import UserPage from "./views/UserPage";
import RootLayout from "./views/RootLayout";

const getInitialState = (): AppState => {
  const auth = localStorage.getItem("authStatus");
  return auth ? { ...initialState, authStatus: authenticated } : initialState;
};

export const StateContext = createContext<{ state: AppState }>({
  state: getInitialState(),
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
  const [state, dispatch] = useReducer(appReducer, getInitialState());

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
