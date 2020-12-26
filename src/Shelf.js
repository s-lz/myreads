//ListBooks component
import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class Shelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  state = {
    books:this.props.books
  }

  changeShelf = (selectValue,book) => {
    console.log(`Shelf changed.`);
    BooksAPI.update(book,selectValue)
      .then(() => {

        // What should I put there?
        this.setState({ });

      })
  }

  render() {
    const showBooks=this.props.books;
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {showBooks.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                  <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={(e) => this.changeShelf(e.target.value,book)}>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">Remove</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                  {book.authors.map((author,i) => (
                    (i < book.authors.length-1) ?
                      (` ${author}, `) :
                      (`${author}`)
                  ))}
                </div>
              </div>

            </li>
          ))}

        </ol>
      </div>
    )
  }
}

export default Shelf
