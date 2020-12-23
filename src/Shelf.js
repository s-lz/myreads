//ListBooks component
import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

class Shelf extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  state = {
    books:[]
  }

  render() {
    const showBooks=this.props.books;

    function changeShelf(currentBook,changingTo) {
      console.log(`Shelf changed to: ${changingTo}`)
      BooksAPI.update(currentBook,changingTo)
        .then((books) => {
          this.setState(() => ({
            books
          }))
        })
    }

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {showBooks.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>
                  <div className="book-shelf-changer">
                    <select>
                      <option value="move" disabled>Move to...</option>
                      <option value="currentlyReading" onClick={() => changeShelf(book,'currentlyReading')}>Currently Reading</option>
                      <option value="wantToRead" onClick={() => changeShelf(book,'wantToRead')}>Want to Read</option>
                      <option value="read" onClick={() => changeShelf(book,'read')}>Read</option>
                      <option value="none" onClick={() => changeShelf(book,'none')}>Remove</option>
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
