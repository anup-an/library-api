import BookList from "src/components/BookList";
import SearchAndFilter from "src/components/SearchAndFilter";
import { SelectOption } from "src/components/ui/Select";
import "./BookListPage.scss";

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
      { name: "Arabic", value: { name: "Arabic" } }
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
  return (
    <div className="booklist-page">
      <div>
        <SearchAndFilter selectOptions={selectOptions} />
      </div>
      <BookList />
    </div>
  );
};

export default BookListPage;
