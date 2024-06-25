
import { useDispatch, useSelector } from 'react-redux';
import { changeFilter, selectNameFilter } from '../../redux/filtersSlice';
import { useId } from 'react';
import css from './SearchBox.module.css'

const SearchBox = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectNameFilter);
  const id = useId();
  const handleFilterChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div> 
      <p className={css.searchLabel}>Find contacts by name</p>
      <input className={css.searchBox}
    type="text"
    value={filter}
    id={id}
    onChange={handleFilterChange}
    placeholder="Search contacts"
  /></div>
   
  );
};


export default SearchBox
