import BookList from "src/components/BookList";
import SearchAndFilter from "src/components/SearchAndFilter";

const BookListPage = () => {
  return (
    <div>
      <SearchAndFilter />
      <BookList />
    </div>
  );
};

export default BookListPage;
