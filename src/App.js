import logo from "./logo.svg";
import "./App.css";
import Child from "./Child";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Link, Outlet } from "react-router-dom";

const fibn = (n) => {
  if (n == 1 || n == 0) return 1;
  return fibn(n - 1) + fibn(n - 2);
};
function App() {
  console.log("parent is rendering");
  const [counter, setCounter] = useState(0);
  const [date, setDate] = useState(new Date());
  const [value, setValue] = useState(1);
  const [show, setShow] = useState(true);
  const addCounter = useCallback(() => {
    setCounter(counter + 1);
  }, [counter]);
  const fib = useMemo(() => {
    return fibn(Number(value));
  }, [value]);
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    console.log("parent is mount");
  }, []);

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
