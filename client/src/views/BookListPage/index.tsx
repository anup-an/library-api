import BookList from "src/components/BookList";
import SearchAndFilter from "src/components/SearchAndFilter";
import { SelectOption } from "src/components/ui/Select";
import "./BookListPage.scss";
import { useState } from "react";
import { ApiData, isLoading, loading } from "src/types/ApiTypes";
import { CollectionPayload } from "src/types/common";
import { Book } from "src/types/book";
import { ApiError } from "src/api/axios";

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
  const [booksState, setBooksState] =
    useState<ApiData<CollectionPayload<Book>, ApiError>>(loading);
  
  const handleFetchState = (booksState: ApiData<CollectionPayload<Book>, ApiError>) => {
    setBooksState(booksState)
  }

  return (
    <div className="booklist-page">
      <div className="booklist-page__search">
        <SearchAndFilter
          selectOptions={selectOptions}
          disabled={isLoading(booksState)}
        />
      </div>
      <div className="booklist-page__list">
        <BookList emitBooksState={handleFetchState} />
      </div>
    </div>
  );
};

export default BookListPage;
