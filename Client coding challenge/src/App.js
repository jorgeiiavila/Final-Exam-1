import React from "react";
import "./App.css";
import Book from "./Book";
import BookForm from "./BookForm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  /* 
    Your code goes here
  */

  render() {
    const updateState = (books) => {
      const data = books ? books : [];
      this.setState({ ...this.state, books: data });
    };
    return (
      <div>
        <BookForm updateState={updateState}></BookForm>
        {this.state.books.map((book, index) => (
          <div key={index}>
            <Book book={book.volumeInfo}></Book>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
