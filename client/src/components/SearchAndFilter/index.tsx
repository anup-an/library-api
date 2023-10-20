import { useContext, useEffect, useRef, useState } from "react";
import { useOutsideClick } from "@chakra-ui/react";
import { TbSettingsSearch } from "react-icons/tb";

import { DispatchContext } from "src/App";
import _ from "lodash";
import {
  Box,
  Heading,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  Grid,
} from "@chakra-ui/react";

import { SEARCH_BOOKS } from "src/actions/book";
import { SelectOption } from "src/components/ui/Select";
import "./SearchAndFilter.scss";
import Select from "src/components/ui/Select";
import { Checkbox, FormControl, Input, Stack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface IProps {
  selectOptions: SelectOption[];
  disabled: boolean;
}

const SearchAndFilter = (props: IProps) => {
  const [search, setSearch] = useState<string>("");
  const [searchFields, setSearchFields] = useState<string[]>(["title"]);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
  const [filter, setFilter] = useState({});
  const { dispatch } = useContext(DispatchContext);
  const { selectOptions, disabled } = props;
  const ref = useRef(null);

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

  useOutsideClick({
    ref: ref,
    handler: () => setIsAdvancedSearch(false),
  });

  useEffect(() => {
    dispatch({
      type: SEARCH_BOOKS,
      payload: { search: search, search_fields: searchFields, filter: filter },
    });
  }, [search, searchFields, filter]);

  return (
    <>
      <form onSubmit={handleSubmit} className="search-filter">
        <div className="search-filter__search">
          <FormControl isDisabled={disabled}>
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
                minWidth={["300px","350px"]}
              />
              <InputRightElement
                children={
                  <button
                    onClick={toggleSearchOptions}
                    className="options"
                    disabled={disabled}
                  >
                    <Icon
                      as={TbSettingsSearch}
                      color={disabled ? "gray.400" : "gray:800"}
                    />
                  </button>
                }
              />
            </InputGroup>
          </FormControl>
          <Box
            ref={ref}
            display={isAdvancedSearch ? "block" : "none"}
            boxShadow={"2xl"}
            border="gray.300"
            borderRadius="10px"
            position="absolute"
            zIndex={"30"}
            padding="30px"
            marginTop="5px"
            backgroundColor="gray.100"
          >
            <Box display="flex" flexDirection="column">
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
            <div className="search-filter__filter">
              <Heading fontSize="16px" fontWeight="bold">
                Filters
              </Heading>
              <Grid templateColumns={["repeat(1, 1fr)","repeat(2, 1fr)"]}>
              {selectOptions.map((option) => (
                <div key={option.name} className="option">
                  <Select
                    selectConfig={option}
                    handleSelect={handleSelect}
                    disabled={disabled}
                  />
                </div>
              ))}
                </Grid>
            </div>
          </Box>
        </div>
      </form>
    </>
  );
};

export default SearchAndFilter;
