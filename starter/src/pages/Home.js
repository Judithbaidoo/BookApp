import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Shelf from "../components/Shelf";
import Book from "../components/Book";
import * as BooksAPI from "../BooksAPI";
import Header from "../components/Header";

const Home = () => {
  const [books, setBooks] = useState([]);
  const fetchBooks = () => {
    BooksAPI.getAll().then((data) => {
      setBooks(data);
    });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const afterClick = () => {
    fetchBooks();
  };

  const currentlyReading = books.filter(
    (book) => book.shelf === "currentlyReading"
  );
  const wantToRead = books.filter((book) => book.shelf === "wantToRead");
  const read = books.filter((book) => book.shelf === "read");
  const shelves = [
    { title: "Currently Reading", books: currentlyReading },
    { title: "Want To Read", books: wantToRead },
    { title: "Read", books: read },
  ];

  return (
    <div className="list-books">
      <Header />
      <div className="list-books-content">
        <div>
          {shelves.map((shelf) => (
            <Shelf title={shelf.title} key={shelf.title}>
              {shelf.books.map((book) => (
                <Book key={book.id} book={book} afterClick={afterClick} />
              ))}
            </Shelf>
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          <span>Add a book</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;