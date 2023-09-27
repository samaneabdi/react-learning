import React, { useState } from 'react';
import { useInfiniteQuery } from "react-query";
import catStyle from '../cat/cat.module.css';
import { fetchCats } from "../../api/cats";

type Cat = {
  name: string,
  image_link: string
}

function Cats() {
  const [search, setSearch] = useState("");
  const {
    data: cats,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<Cat[]>(
    ["cats", search],
    ({ pageParam = 0}) => fetchCats(search, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const expectedPageSize = allPages[0].length;
        if (lastPage.length < expectedPageSize) {
          return undefined; 
        }
        return (allPages.length * expectedPageSize) + allPages.length;
      },
    }
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error...</p>;
  }

  return (
    <>
      <div className={catStyle.row}>
        <div className={catStyle.search}>
          <label htmlFor="search">Search:</label>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="search"
          />
          <br />
        </div>
      </div>
      <div className={catStyle.row}>
        {cats?.pages.map((page) =>
          page?.map((cat:Cat) => (
            <div key={cat.name} className={catStyle.column}>
              <img key={cat.name} src={cat.image_link} alt={cat.name} />
              <div>{cat.name}</div>
            </div>
          ))
        )}
      </div>
      {hasNextPage && (
        <button className={catStyle.show_more} onClick={() => fetchNextPage()}>Show More</button>
      )}
    </>
  );
}

export default Cats;
