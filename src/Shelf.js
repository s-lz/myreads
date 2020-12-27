//ListBooks component
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  state = {
    books:this.props.books
  }

  render() {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.books.map((book) => (
            <Book
              key={book.id}
              book={book}
              ifShelfChange={(shelf)=>{ this.props.ifShelfChange(book.id, shelf) }}
            />
          ))}
        </ol>
      </div>
    )
  }
}

export default Shelf
