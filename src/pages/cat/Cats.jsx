import React, { useState } from 'react'
import { useQuery } from "react-query";
import { fetchCats } from "../../api/cats";
import './cat.css';

function Cats() {
  const [search, setSearch] = useState("");
  const { data: cats, isLoading, isError } = useQuery(["cats", search], () =>
    fetchCats(search)
  );
  
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error...</p>;
  }
  return (
    <>
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
    </>
  )
}

export default Cats