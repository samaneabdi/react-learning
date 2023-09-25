import "./App.css";
import { Link, Outlet } from "react-router-dom";

function App() {
  console.log("parent is rendering");

  return (
    <div className="App">
      <header className="App-header">
        <li>
          <Link to="/Home">Home</Link>
        </li>
        <li>
          <Link to="/About">About</Link>
        </li>
        <li>
          <Link to="/Contact">Contact</Link>
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
