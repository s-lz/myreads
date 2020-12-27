//ListBooks component
import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

class ListBooks extends Component {

  state = {
    books:[]
  }
  componentDidMount() {
      this.getBooks()
  }

  changeShelf = (id,shelf = 'read') => {
      BooksAPI.update({id},shelf).then(() => {
          this.getBooks()
      })
  }

  getBooks = () => {
      BooksAPI.getAll().then((books) => { this.setState({ books }) })
  }

  render() {
    const booksCurrentlyReading = this.state.books.filter(books => books.shelf === 'currentlyReading')
    const booksWantToRead = this.state.books.filter(books => books.shelf === 'wantToRead')
    const booksRead = this.state.books.filter(books => books.shelf === 'read')

    return (
      <div>
        <div className="list-books-content">
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <Shelf
              books={booksCurrentlyReading}
              ifShelfChange={(bookId,shelf) => { this.changeShelf(bookId,shelf) }}
            />
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to read</h2>
            <Shelf
              books={booksWantToRead}
              ifShelfChange={(bookId,shelf) => { this.changeShelf(bookId,shelf) }}
            />
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <Shelf
              books={booksRead}
              ifShelfChange={(bookId,shelf) => { this.changeShelf(bookId,shelf) }}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to='/add'>
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
