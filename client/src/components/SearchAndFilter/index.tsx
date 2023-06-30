import { useContext, useState } from "react";
import { DispatchContext } from "src/App";
import { SEARCH_BOOKS } from "src/actions/book";
import { Option, SelectOption } from "src/components/ui/Select";
import "./SearchAndFilter.scss";
import Select from "src/components/ui/Select";

interface IProps {
  selectOptions: SelectOption[];
}

const SearchAndFilter = (props: IProps) => {
  const [search, setSearch] = useState<string>("");
  const [searchFields, setSearchFields] = useState<string[]>(["title"]);
  const [filter, setFilter] = useState({});
  const { dispatch } = useContext(DispatchContext);
  const { selectOptions } = props;

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event?.preventDefault();
    setSearch(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(filter);
    dispatch({
      type: SEARCH_BOOKS,
      payload: { search: search, search_fields: searchFields, filter: filter },
    });
  };

  const handleSearchCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.target.checked
      ? setSearchFields([...searchFields, event.target.value])
      : setSearchFields(
          searchFields.filter((field) => field !== event.target.value)
        );
  };

  const handleSelect = (option: { optionKey: string; value: any }) => {
    setFilter({ ...filter, [option.optionKey]: JSON.parse(option.value) });
  };

  return (
    <form onSubmit={handleSubmit} className="search-filter">
      <div className="search-filter__search">
        <label htmlFor="search">
          <input
            id="search"
            name="search"
            placeholder="Search"
            onChange={onSearchInputChange}
            className="search-input"
          />
        </label>
        <div className="search-fields">
          <div>
            <input
              value="title"
              type="checkbox"
              defaultChecked={searchFields.includes("title")}
              onChange={handleSearchCheckboxChange}
            />
            <span>Title</span>
          </div>
          <div>
            <input
              value="series"
              type="checkbox"
              defaultChecked={searchFields.includes("series")}
              onChange={handleSearchCheckboxChange}
            />
            <span>Series</span>
          </div>
        </div>
      </div>
      <div className="search-filter__filter">
        {selectOptions.map((option) => (
          <div key={option.name} className="option">
            <span>{option.name}</span>
            <Select selectConfig={option} handleSelect={handleSelect} />
          </div>
        ))}
      </div>
    </form>
  );
};

export default SearchAndFilter;
