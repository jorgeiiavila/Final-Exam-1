import React, { useState } from "react";
import Book from "./Book";

async function fetchBooks(query) {
  const results = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}`,
    { method: "GET" }
  );
  const json = await results.json();
  return json.items;
}

function BookForm(props) {
  const [query, setQuery] = useState("");

  return (
    <div>
      <input
        onChange={(e) => setQuery(e.currentTarget.value)}
        placeholder="Search Book"
      ></input>
      <button
        type="submit"
        onClick={async () => {
          const books = await fetchBooks(query);
          props.updateState(books);
        }}
      >
        Search
      </button>
    </div>
  );
}

export default BookForm;
