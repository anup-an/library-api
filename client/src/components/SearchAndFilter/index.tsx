import { useContext, useState } from "react";
import { DispatchContext } from "src/App";
import { SEARCH_BOOKS } from "src/actions/book";
import "./SearchAndFilter.scss"

const SearchAndFilter = () => {
  const [search, setSearch] = useState<string>("");
  const [searchFields, setSearchFields] = useState<string[]>([]);
  const { dispatch } = useContext(DispatchContext);

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event?.preventDefault();
    setSearch(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({
      type: SEARCH_BOOKS,
      payload: { search: search, search_fields: searchFields },
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.checked
      ? setSearchFields([...searchFields, event.target.value])
      : setSearchFields(
          searchFields.filter((field) => field !== event.target.value)
        );
  };

  return (
      <form onSubmit={handleSubmit} className="search-filter">
        <div className="search-filter__search">
        <label htmlFor="search" >
          <input
            id="search"
            name="search"
            placeholder="Search"
            onChange={onSearchInputChange}
          />
        </label>
        <div>
          <input
            value="title"
            type="checkbox"
            onChange={handleCheckboxChange}
          />
          <span>Title</span>
        </div>
        <div>
          <input
            value="series"
            type="checkbox"
            onChange={handleCheckboxChange}
          />
          <span>Series</span>
              </div>
              </div>
      </form>
  );
};

export default SearchAndFilter;
