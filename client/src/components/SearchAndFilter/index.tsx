import { useContext, useEffect, useState } from "react";
import { DispatchContext } from "src/App";
import _ from "lodash";
import {
  Box,
  Button,
  Heading,
  Icon,
  IconButton,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { GrSearchAdvanced } from "react-icons/gr";

import { SEARCH_BOOKS } from "src/actions/book";
import { Option, SelectOption } from "src/components/ui/Select";
import "./SearchAndFilter.scss";
import Select from "src/components/ui/Select";
import { Checkbox, FormControl, Input, Stack } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "@chakra-ui/icons";

interface IProps {
  selectOptions: SelectOption[];
}

const SearchAndFilter = (props: IProps) => {
  const [search, setSearch] = useState<string>("");
  const [searchFields, setSearchFields] = useState<string[]>(["title"]);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
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

  const toggleSearchOptions = () => {
    setIsAdvancedSearch(!isAdvancedSearch);
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
        <FormControl>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              id="search"
              name="search"
              borderColor="black"
              onChange={onSearchInputChange}
              placeholder="Search"
              min-Width="350px"
            />
            <InputRightElement
              display="flex"
              alignItems="center"
              justifyContent="center"
              children={
                <button onClick={toggleSearchOptions} className="options">
                  {isAdvancedSearch ? (
                    <ChevronUpIcon color="black" />
                  ) : (
                    <ChevronDownIcon color="black" />
                  )}
                </button>
              }
            />
          </InputGroup>
        </FormControl>

        <Box
          boxShadow="xl"
          borderColor="black"
          minHeight="100px"
          width="100%"
          className={`${
            isAdvancedSearch ? "display-search-options" : "hide-search-options"
          }`}
        >
          <Box display="flex" flexDirection="column" padding="20px">
            <Heading fontSize="16px" fontWeight="bold">
              Search fields
            </Heading>

            <Stack spacing={5} direction="row" marginTop="5px">
              <Checkbox
                value="title"
                fontSize="12px"
                defaultChecked={searchFields.includes("title")}
                onChange={handleSearchCheckboxChange}
              >
                Title
              </Checkbox>
              <Checkbox
                value="series"
                fontSize="12px"
                defaultChecked={searchFields.includes("series")}
                onChange={handleSearchCheckboxChange}
              >
                Series
              </Checkbox>
            </Stack>
          </Box>
        </Box>
      </div>
      <div className="search-filter__filter">
        {selectOptions.map((option) => (
          <div key={option.name} className="option">
            <Select selectConfig={option} handleSelect={handleSelect} />
          </div>
        ))}
      </div>
    </form>
  );
};

export default SearchAndFilter;
