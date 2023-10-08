import { useContext, useEffect, useState } from "react";
import { DispatchContext } from "src/App";
import _ from "lodash";
import { SEARCH_BOOKS } from "src/actions/book";
import { Option, SelectOption } from "src/components/ui/Select";
import "./SearchAndFilter.scss";
import Select from "src/components/ui/Select";
import { Checkbox, FormControl, Input, Stack } from "@chakra-ui/react";

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
    debouncedSearch(event.target.value);
  };

  const debouncedSearch = _.debounce((search: string) => {
    setSearch(search);
  }, 300);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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

  useEffect(() => {
    dispatch({
      type: SEARCH_BOOKS,
      payload: { search: search, search_fields: searchFields, filter: filter },
    });
  }, [search, searchFields, filter]);

  return (
    <form onSubmit={handleSubmit} className="search-filter">
      <div className="search-filter__search">
        <div className="search-fields">
          <Stack spacing={5} direction="row">
            <Checkbox
              value="title"
              defaultChecked={searchFields.includes("title")}
              onChange={handleSearchCheckboxChange}
            >
              Title
            </Checkbox>
            <Checkbox
              value="series"
              defaultChecked={searchFields.includes("series")}
              onChange={handleSearchCheckboxChange}
            >
              Series
            </Checkbox>
          </Stack>
        </div>
        <FormControl>
          <Input
            id="search"
            name="search"
            borderColor="black"
            onChange={onSearchInputChange}
            placeholder="Search"
            minWidth={300}
          />
        </FormControl>
      </div>
      <div className="search-filter__filter">
        {selectOptions.map((option) => (
          <div key={option.name} className="option">
            <div className="title">{option.name}</div>
            <Select selectConfig={option} handleSelect={handleSelect} />
          </div>
        ))}
      </div>
    </form>
  );
};

export default SearchAndFilter;
