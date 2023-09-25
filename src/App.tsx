import { useEffect, useState } from "react";
import "./App.css";
import { fetchCats } from "./api/cats";

type Cat = {
  name: string,
  image_link: string
}

function App() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [search, setSearch]= useState("");

  useEffect(() => {
    const getCats = async() =>{
      const result = await fetchCats(search);
      setCats(result);
    }
    getCats();
  }, [search]);

  if(!cats.length) {
    return <p>Loading...</p>
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>List Of Cats</h1>
      </header>
      <main>
            <div className="row">
              <div className="search">
                <label htmlFor="search">Serach : </label>
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  id="search"
                />
                <br />
              </div>
            </div>
            <div className="row">
              {cats.map((cat) => (
                <div key={cat.name} className="column">
                  <img key={cat.name} src={cat.image_link} alt="tt" />
                  <div>{cat.name}</div>
                </div>
              ))}
            </div>
      
      </main>
      <footer>footer</footer>
    </div>
  );
}

export default App;
