import React  from 'react';
import { useInfiniteQuery } from "react-query";
import catStyle from './cat.module.css';
import { fetchCats } from "../../api/cats";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from '../../store/catSlice';

type Cat = {
  name: string ,
  image_link: string
}

type RootState = {
  catSlice: CatSliceState;
};

type CatSliceState = {
  search: string;
}

function Cats() {
  const dispatch = useDispatch();
 const search = useSelector((state : RootState) => {console.log({state}); return  state.catSlice.search});
  const {
    data: cats,
    // isLoading,
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

  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

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
            onChange={(e) =>dispatch(setSearch(e.target.value))}
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
  );
}

export default Cats;
