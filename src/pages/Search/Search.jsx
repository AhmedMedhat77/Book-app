import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { search, update } from "../../api/BooksAPI";
import BookShelf from "../../components/BookShelf";
import Searchbar from "../../components/Searchbar";
import useDebounce from "../../helpers/useDebounce";

function Search() {
  const loc = useLocation();

  const [searchState, setSearchState] = useState({
    searchInput: "",
    searchResults: [],
  });

  const [searchInputDebounceValue] = useDebounce(searchState.searchInput, 1000);

  const onChangeHandler = (e) => {
    let { value } = e.target;
    setSearchState((old) => {
      return { ...old, searchInput: value };
    });
  };

  const onBookChange = (book, move_state) => {
    console.log({ book, move_state });
    update(book, move_state).then((r) => {
      setSearchState((old) => {
        return {
          ...old,
          shelfState: r,
          searchResults: old.searchResults.map((c) =>
            c.id === book.id ? { ...c, shelf: move_state } : c
          ),
        };
      });
    });
  };

  useEffect(() => {
    search(searchInputDebounceValue, 10).then((res) => {
      if ("error" in (res ?? { error: "" })) {
        setSearchState((old) => {
          return {
            ...old,
            searchResults: [],
          };
        });
        return;
      }

      setSearchState((old) => {
        return {
          ...old,
          searchResults: res.map((v) => {
            return {
              ...v,
              shelf: loc.state.shelf.find((b) => b.id === v.id)?.shelf,
            };
          }),
        };
      });
    });
  }, [loc.state?.shelf, searchInputDebounceValue]);

  return (
    <div className="search-books">
      <Searchbar
        backPath="/"
        onChange={onChangeHandler}
        backState={searchState.shelfState}
      />
      <div className="search-books-results">
        <ol
          className="books-grid"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {searchState.searchResults?.length ? (
            <React.Fragment>
              <li>
                <BookShelf
                  title="Read"
                  onBookStateChange={onBookChange}
                  bookList={searchState.searchResults.filter(
                    (v) => v.shelf === "read"
                  )}
                />
              </li>
              <li>
                <BookShelf
                  title="wantToRead"
                  onBookStateChange={onBookChange}
                  bookList={searchState.searchResults.filter(
                    (v) => v.shelf === "wantToRead"
                  )}
                />
              </li>
              <li>
                <BookShelf
                  title="currentlyReading"
                  onBookStateChange={onBookChange}
                  bookList={searchState.searchResults.filter(
                    (v) => v.shelf === "currentlyReading"
                  )}
                />
              </li>
              <li>
                <BookShelf
                  title="None"
                  onBookStateChange={onBookChange}
                  bookList={searchState.searchResults.filter(
                    (v) => v.shelf === "none" || v.shelf === undefined
                  )}
                />
              </li>
            </React.Fragment>
          ) : (
            <h1> Book Not Found </h1>
          )}
        </ol>
      </div>
    </div>
  );
}

export default Search;
