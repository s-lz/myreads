import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
// importing Books API
import * as BooksAPI from './BooksAPI'
// importing Components
import Header from './Header'
import Shelf from './Shelf'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {

  // first, declare state of books
  state = {
    books:[]
  }

  // when component did mount, get the books
  componentDidMount() {
      this.getBooks()
  }

  // get the books function
  getBooks = () => {
      BooksAPI.getAll().then((books) => { this.setState({ books }) })
  }

  // changing shelf of books function
  changeShelf = (id,shelf = 'read') => {
      BooksAPI.update({id},shelf).then(() => {
          this.getBooks()
      })
  }

  render() {

    // variables to define each shelf
    const booksCurrentlyReading = this.state.books.filter(books => books.shelf === 'currentlyReading')
    const booksWantToRead = this.state.books.filter(books => books.shelf === 'wantToRead')
    const booksRead = this.state.books.filter(books => books.shelf === 'read')

    return (
      <Router>
        <div className="app">
          <div className="list-books">
            <Header />
            <Route exact path='/' render={() => (
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
                  <Link to='/search'>
                    <button>Add a book</button>
                  </Link>
                </div>
              </div>
            )} />
            <Route path='/search' render={() => (
              <SearchBooks
                books={this.state.books}
                ifShelfChange={(id,shelf) => { this.changeShelf(id,shelf) }}
              />
            )} />
          </div>
        </div>
      </Router>
    )
  }
}

export default BooksApp
