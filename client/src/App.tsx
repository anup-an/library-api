import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import Routers from "src/components/Routers";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </div>
  );
}

export default App;
