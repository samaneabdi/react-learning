import "./App.css";
import Child from "./Child";
import { useState, useEffect, useMemo, useCallback } from "react";

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
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {show && <Child addCounter={addCounter} />}
        {show && <Child addCounter={addCounter} />}

        <button type="button" onClick={() => setCounter(counter + 1)}>
          click
        </button>
        <button onClick={() => setShow(!show)}>clickShow</button>
        <div>{date.toISOString()}</div>
        <div>{counter}</div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div>{fib}</div>
      </header>
    </div>
  );
}

export default App;
