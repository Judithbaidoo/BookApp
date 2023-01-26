import { useState } from "react";
import { Link } from "react-router-dom";
import Book from "../components/Book";
import * as BooksAPI from "../BooksAPI";

const Search = () => {
  const [books, setBooks] = useState([]);
  const afterClick = () => {};
  const searchBooks = (q) => {
    BooksAPI.search(q).then((data) => {
      if (data.error) {
        setBooks([]);
      } else {
        setBooks(data);
      }
    });
  };

  const handleChange = (e) => {
    searchBooks(e.target.value);
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to="/">
          <span className="close-search">Close</span>
        </Link>

        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {books.map((b) => (
            <li key={b.id}>
              <Book book={b} afterClick={afterClick} />
            </li>
          ))}
          ;
        </ol>
      </div>
    </div>
  );
};

export default Search;
