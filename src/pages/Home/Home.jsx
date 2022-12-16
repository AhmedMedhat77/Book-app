import React, { useEffect, useState } from "react";
import { getAll, update } from "../../api/BooksAPI";

import BookShelf from "../../components/BookShelf";
import { ButtonSearch } from "../../components/Button/ButtonSearch";

function Home() {
  const [homeState, setHomeState] = useState({
    all: [],
    read: [],
    wantToRead: [],
    currentlyReading: [],
  });

  const onBookChange = (book, move_state) => {
    update(book, move_state).then((r) => {
      setHomeState((old) => {
        return {
          ...old,
          currentlyReading: old?.all
            ?.filter((v) => r.currentlyReading.includes(v.id))
            .map((v) => {
              return { ...v, shelf: "currentlyReading" };
            }),
          wantToRead: old?.all
            ?.filter((v) => r.wantToRead.includes(v.id))
            .map((v) => {
              return { ...v, shelf: "wantToRead" };
            }),
          read: old?.all
            ?.filter((v) => r.read.includes(v.id))
            .map((v) => {
              return { ...v, shelf: "read" };
            }),
        };
      });
    });
  };

  useEffect(() => {
    getAll().then((res) => {
      setHomeState({
        all: [...res],
        read: res.filter((book) => book.shelf === "read"),
        currentlyReading: res.filter(
          (book) => book.shelf === "currentlyReading"
        ),

        wantToRead: res.filter((book) => book.shelf === "wantToRead"),
      });
    });
  }, []);

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            onBookStateChange={onBookChange}
            title="Currenlty Reading"
            bookList={homeState.currentlyReading}
          />
          <BookShelf
            onBookStateChange={onBookChange}
            title="Want to Read"
            bookList={homeState.wantToRead}
          />
          <BookShelf
            onBookStateChange={onBookChange}
            title="Read"
            bookList={homeState.read}
          />
        </div>
      </div>
      <ButtonSearch
        state={{
          shelf: [
            ...homeState.wantToRead,
            ...homeState.read,
            ...homeState.currentlyReading,
          ],
        }}
        path="/search"
      >
        Add a book
      </ButtonSearch>
    </div>
  );
}

export default Home;
