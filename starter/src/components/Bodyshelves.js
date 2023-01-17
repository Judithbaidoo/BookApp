import React from 'react';
import Shelf from './Shelf';

const bodyshelves = ({books , bookShelfUpdate}) => {

    const currentlyReading = books.filter((book) => book.shelf === "currentlyReading");
    const wantToRead = books.filter((book) => book.shelf === "wantToRead");
    const read = books.filter((book) => book.shelf === "read");

    return (
        <div>
            <Shelf  title = "Currently Reading" books = {currentlyReading} bookShelfUpdate = {bookShelfUpdate}/>
            <Shelf  title = "Want To Read" books = {wantToRead} bookShelfUpdate = {bookShelfUpdate} />
            <Shelf  title = "Read" books = {read} bookShelfUpdate = {bookShelfUpdate} />
        </div>
    );
};
export default bodyshelves;