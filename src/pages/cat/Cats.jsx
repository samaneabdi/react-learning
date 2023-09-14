import React, { useContext }  from 'react';
import { useInfiniteQuery } from "react-query";
import catStyle from './cat.module.css';
import { fetchCats } from "../../api/cats";
import { catStore } from '../../store/catStore';
import { useObserver } from 'mobx-react';


function Cats() {
 const store = useContext(catStore);

  const {
    data: cats,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["cats", store.search],
    ({ pageParam = 0}) => fetchCats(store.search, pageParam),
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

return useObserver(()=>(
  <>
  <div className={catStyle.row}>
    <div className={catStyle.search}>
      <label htmlFor="search">Search:</label>
      <input
        type="search"
        value={store.search}
        onChange={(e) =>store.setSearch(e.target.value)}
        id="search"
      />
      <br />
    </div>
  </div>
  <div className={catStyle.row}>
    {cats?.pages.map((page) =>
      page.map((cat) => (
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
))

}

export default Cats;
