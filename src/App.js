import { Outlet, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <li>
          <Link to="/Cats"> Cats</Link>
        </li>
        <li>
          <Link to="/Todos"> Todos</Link>
        </li>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
}

export default App;
