import React  from 'react';
import { useInfiniteQuery } from "react-query";
import catStyle from './cat.module.css';
import { fetchCats } from "../../api/cats";
import { setSearch } from '../../store/catSlice';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { Cat } from '../../types/catType';

function Cats() {
  const dispatch = useAppDispatch ()
  const search = useAppSelector ((state) => state.catSlice.search);
//const search = useSelector(state => {console.log({state}); return  state.catSlice.search});

  const {
    data: cats,
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
