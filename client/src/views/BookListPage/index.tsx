import { Box } from "@chakra-ui/layout";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import _ from "lodash";

import BookList from "src/components/BookList";
import SearchAndFilter from "src/components/SearchAndFilter";
import { SelectOption } from "src/components/ui/Select";
import "./BookListPage.scss";
import { useState } from "react";
import {
  ApiData,
  isLoading,
  loading,
  pickDataOrDefault,
} from "src/types/ApiTypes";
import { CollectionPayload, FilterQuery, ListQuery } from "src/types/common";
import { Book } from "src/types/book";
import { ApiError } from "src/api/axios";
import { buildQueryString } from "src/utils/helpers";
import Pagination from "src/components/ui/Pagination";

export interface ListConfig {
  search: string;
  search_fields: string[];
  filter: FilterQuery;
  ordering: string;
  page: number;
  page_size: number;
  count: number;
}

const initialListConfig: ListConfig = {
  search: "",
  search_fields: ["title"],
  filter: {},
  ordering: "",
  count: 0,
  page: 1,
  page_size: 20,
};

const selectOptions: SelectOption[] = [
  {
    name: "Language",
    value: "language",
    options: [
      { name: "All", value: "" },
      { name: "English", value: { name: "English" } },
      { name: "German", value: { name: "German" } },
      { name: "French", value: { name: "French" } },
      { name: "Persian", value: { name: "Persian" } },
      { name: "Arabic", value: { name: "Arabic" } },
    ],
  },
  {
    name: "Book format",
    value: "book_format",
    options: [
      { name: "All", value: "" },
      { name: "Ebook", value: "e" },
      { name: "Hardcover", value: "h" },
      { name: "Kindle edition", value: "k" },
      { name: "Mass Market Paperback", value: "m" },
    ],
  },
];

const BookListPage = () => {
  const history = useNavigate();
  const location = useLocation();
  const [booksState, setBooksState] =
    useState<ApiData<CollectionPayload<Book>, ApiError>>(loading);
  const [listConfig, setListConfig] = useState<ListConfig>(initialListConfig);

  const handleFetchState = (
    booksState: ApiData<CollectionPayload<Book>, ApiError>
  ) => {
    setBooksState(booksState);
    setListConfig({
      ...listConfig,
      count: pickDataOrDefault(booksState, "count", 0),
    });
  };

  const handleListOptionsChange = (config: ListConfig) => {
    setListConfig({ ...config });
    history(buildQueryString(_.omit(config, "count") as ListQuery));
  };

  useEffect(() => {
    if (!location.search) {
      history(buildQueryString(_.omit(listConfig, "count") as ListQuery));
    }
  }, []);

  return (
    <div className="booklist-page">
      <Box className="booklist-page__search" backgroundColor="gray.100">
        <SearchAndFilter
          selectOptions={selectOptions}
          disabled={isLoading(booksState)}
          onListOptionsChange={handleListOptionsChange}
          listConfig={listConfig}
        />
        {listConfig.count ? (
          <Pagination
            paginationConfig={listConfig}
            onPageChange={handleListOptionsChange}
          />
        ) : (
          ""
        )}
      </Box>
      <div className="booklist-page__list">
        <BookList emitBooksState={handleFetchState} />
      </div>
    </div>
  );
};

export default BookListPage;
