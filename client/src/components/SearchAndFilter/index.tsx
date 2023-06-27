import { useContext, useState } from "react";
import { DispatchContext } from "src/App";
import { SEARCH_BOOKS } from "src/actions/book";

const SearchAndFilter = () => {
  const [search, setSearch] = useState<string>('');
  const { dispatch } = useContext(DispatchContext);

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event?.preventDefault();
    setSearch(event.target.value);
  };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
    dispatch({
      type: SEARCH_BOOKS,
      payload: { search: search, search_fields: ["title"] },
    });
  };
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">
          <input
            id="search"
            name="search"
            placeholder="Search"
            onChange={onSearchInputChange}
          />
        </label>
      </form>
    </div>
  );
};

export default SearchAndFilter;
