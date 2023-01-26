import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/*SEARCH*/}
          <Route path="/search" element={<Search/>} />
          {/*HOME PAGE*/}
          <Route path="/" element={<Home/>} />
        </Routes>
      </BrowserRouter>  
    </div>
  );
};
export default App;