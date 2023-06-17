import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Routers from "src/components/Routers";
import { AppState, appReducer, initialState } from "src/reducer";
import { createContext, useReducer } from "react";
import { AppActions } from "./actions";

const getInitialState = (): AppState => {
  const auth = localStorage.getItem("authStatus");
  return auth
    ? { ...initialState, authStatus: JSON.parse(auth) }
    : initialState;
};

export const StateContext = createContext<{ state: AppState }>({
  state: getInitialState(),
});

export const DispatchContext = createContext<{
  dispatch: React.Dispatch<AppActions>;
}>({
  dispatch: () => null,
});

function App() {
  const [state, dispatch] = useReducer(appReducer, getInitialState());

  return (
    <DispatchContext.Provider value={{ dispatch }}>
      <StateContext.Provider value={{ state }}>
        <div className="App">
          <BrowserRouter>
            <Routers />
          </BrowserRouter>
        </div>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
}

export default App;
