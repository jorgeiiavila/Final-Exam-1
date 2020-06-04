import React from "react";

function Book(props) {
  return (
    <div>
      <h2>{props.book.title}</h2>
      <p>{props.book.authors ? props.book.authors.join(", ") : ""}</p>
      <p>{props.book.description}</p>
      <img src={props.book.imageLinks.smallThumbnail}></img>
    </div>
  );
}

export default Book;
