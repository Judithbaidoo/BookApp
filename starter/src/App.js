import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Bodyshelves from "./components/Bodyshelves";
import { useState , useEffect} from "react";
import * as BooksAPI from "./BooksAPI";
import Book from "./components/Book";


function App() {

  const [ books , setbooks ] = useState([]) ;
  const [ request , setRequest ] = useState("") ;
  const [ useBooks , setUseBooks ] = useState([]) ;
  const [ bookSearch , setBookSearch ] = useState([]) ;
  const [ bookId , setBookID ] = useState(new Map()) ;

  useEffect(() => {
    BooksAPI.getAll().then( data => {      
    setbooks(data);
    setBookID(booksMap(data))
    })}, []);

  useEffect(() => {
    let active = true;
    if (request){
    BooksAPI.search(request).then(data => {
      if(data.error) {
        setBookSearch([]);
      } else {
        if (active){
          setBookSearch(data); 
        } ; 
      } ;
    })
  } ;
  return () => {
    active = false ;
    setBookSearch([])
  }
  }, [request]);

  useEffect(() => {
    const combined = bookSearch.map(book => {
      if (bookId.has(book.id)){
        return bookId.get(book.id);
      } else {
        return book;
      };
    });
    setUseBooks(combined);
  }, [bookSearch]) ;

  const booksMap = (books) => { 
    const map = new Map();
    books.map(book => map.set(book.id,book ));
    return map ;
  };

  const bookShelfUpdate = (book,location) => {
    const bookUpdate = books.map( b => {
      if (b.id === book.id){
        book.shelf = location;
        return book;
      };
      return b;
    });
    if (!bookId.has(book.id)){
      book.shelf = location;
      bookUpdate.push(book);
    };
    setbooks(bookUpdate)
    BooksAPI.update(book , location)
  };
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
      
              {/*SEARCH*/}
          <Route path="/search" element={
            <div className="search-books">
              <div className="search-books-bar">
              <Link to = "/">
                <span className="close-search">
                  Close
                </span>
              </Link>
            
                <div className="search-books-input-wrapper">
                  <input
                    type="text"
                    placeholder="Search by title, author, or ISBN" value = {request} onChange = {(event) => setRequest(event.target.value)}
                  />
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  {useBooks.map( b => (
                    <li key = {b.id}>
                      <Book book = {b}bookShelfUpdate = {bookShelfUpdate} />
                    </li>
                  ))};
                </ol>
              </div>
            </div>
          } />
          
      
          {/*HOME PAGE*/}
          <Route path="/" element={
          
            <div className="list-books">
              <Header/>
              <div className="list-books-content">
                <Bodyshelves books={books} bookShelfUpdate = {bookShelfUpdate}/>
              </div>
              <div className="open-search">
                <Link to = "/search" >
             
                  <span>Add a book</span>
                </Link>               
              </div>
            </div>
            } />
        </Routes>
      </BrowserRouter>  
    </div>
  );
};
export default App;