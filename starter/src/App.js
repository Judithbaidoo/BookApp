import "./App.css";
import Header from "./components/Header";
import Bodyshelves from "./components/Bodyshelves";
import { useState , useEffect} from "react";
import * as BooksAPI from "./BooksAPI";

function App() {

  useEffect( () =>{

    BooksAPI.getAll()
    .then(data => {
      
      setbooks(data)

    })

  }, []

  )

  
  const [ showSearchPage , setShowSearchpage ] = useState(false);

  const [ books ,setbooks] = useState([])

  const bookShelfUpdate = (book,location) => {
    const bookUpdate = books.map( b => {
      if (b.id === book.id){
        book.shelf = location;
        return book;

      }
      return b;
    })
    setbooks(bookUpdate)
    BooksAPI.update(book , location)
  }
  return (
    <div className="app">
      {showSearchPage ? (
        <div className="search-books">
          <div className="search-books-bar">
            <a
              className="close-search"
              onClick={() => setShowSearchpage(!showSearchPage)}
            >
              Close
            </a>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
      ) : (
        <div className="list-books">
          <Header/>
          <div className="list-books-content">
            <Bodyshelves books={books} bookShelfUpdate = {bookShelfUpdate}/>
          </div>
          <div className="open-search">
          <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  )
}

export default App;
