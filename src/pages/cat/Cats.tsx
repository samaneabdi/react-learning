import React  from 'react';
import catStyle from './cat.module.css';
import { setSearch } from '../../store/catSlice';
import { useGetCatQuery } from '../../api/catsApiService';
import { useAppDispatch, useAppSelector } from '../../store/hook';

function Cats() {

  const search = useAppSelector((state) => state.catSlice.search)
  const dispatch = useAppDispatch();

  const {
    data: cats,
    isError
  } = useGetCatQuery(search)

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
        {cats?.map((cat) => (
            <div key={cat.name} className={catStyle.column}>
              <img key={cat.name} src={cat.image_link} alt={cat.name} />
              <div>{cat.name}</div>
            </div>
          ))
        }
      </div>
    
    </>
  );
}

export default Cats;
