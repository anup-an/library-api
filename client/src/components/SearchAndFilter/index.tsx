import { useOutsideClick } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { TbSettingsSearch } from "react-icons/tb";

import {
  Box,
  Grid,
  Heading,
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import _ from "lodash";

import { SearchIcon } from "@chakra-ui/icons";
import { Checkbox, FormControl, Input, Stack } from "@chakra-ui/react";
import Select, { SelectOption } from "src/components/ui/Select";
import { FilterQuery } from "src/types/common";
import { ListConfig } from "src/views/BookListPage";
import "./SearchAndFilter.scss";

export interface SearchOptions {
  search: string;
  search_fields: string[];
  filter: FilterQuery;
}

interface IProps {
  selectOptions: SelectOption[];
  disabled: boolean;
  onListOptionsChange: (config: ListConfig) => void;
  listConfig: ListConfig;
}

const SearchAndFilter = (props: IProps) => {
  const { selectOptions, disabled, onListOptionsChange, listConfig } = props;
  const { search_fields, filter } = listConfig;

  const [isAdvancedSearch, setIsAdvancedSearch] = useState<boolean>(false);
  const ref = useRef(null);

  const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event?.preventDefault();
    debouncedSearch(event.target.value);
  };

  const debouncedSearch = _.debounce((search: string) => {
    onListOptionsChange({ ...listConfig, search, page: 1 });
  }, 300);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const toggleSearchOptions = () => {
    setIsAdvancedSearch(!isAdvancedSearch);
  };

  const handleSearchCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fields = event.target.checked
      ? [...search_fields, event.target.value]
      : search_fields.filter((field: string) => field !== event.target.value);
    onListOptionsChange({ ...listConfig, search_fields: fields, page: 1 });
  };

  const handleSelect = (option: { optionKey: string; value: any }) => {
    const filterObj = {
      ...filter,
      [option.optionKey]: JSON.parse(option.value),
    };
    onListOptionsChange({ ...listConfig, filter: filterObj, page: 1 });
  };

  useOutsideClick({
    ref: ref,
    handler: () => setIsAdvancedSearch(false),
  });

  return (
    <>
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
                defaultValue={listConfig.search}
                borderColor="black"
                placeholder="Search"
                onChange={onSearchInputChange}
                minWidth={["100px", "350px"]}
              />
              <InputRightElement
                children={
                  <button
                    onClick={toggleSearchOptions}
                    className="options"
                    disabled={disabled}
                    type="button"
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
                  defaultChecked={search_fields.includes("title")}
                  onChange={handleSearchCheckboxChange}
                >
                  Title
                </Checkbox>
                <Checkbox
                  value="series"
                  fontSize="12px"
                  defaultChecked={search_fields.includes("series")}
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
              <Grid templateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}>
                {selectOptions.map((option) => (
                  <div key={option.name} className="option">
                    <Select
                      selectConfig={option}
                      handleSelect={handleSelect}
                      disabled={disabled}
                      defaultValue={listConfig.filter[option.value]}
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
