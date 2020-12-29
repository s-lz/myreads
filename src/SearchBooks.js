//SearchBooks component
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import Book from "./Book";

class SearchBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  // define state of query and book filter
  state = {
      search: '',
      filterBooks: []
  }

  // check shelf of books
  checkShelf = (filterBooks, books) => {
    return filterBooks.map((fBook)=>{
      books.forEach((book)=>{
        if(book.id === fBook.id){
            fBook.shelf = book.shelf
        }
      })
      return fBook
    })
  }

  // update books on search query
  updateSearch = (search) => {
    this.setState({search: search })
    if (search.length !== 0) {
      BooksAPI.search(search.trim(), 10).then((books) => {
        if(books.length>0){
          books = this.checkShelf(books, this.props.books)
          this.setState({filterBooks: books})
        }
        else{
          this.setState({filterBooks: []})
        }
      })
    } else {
      this.setState({filterBooks: [], search: ''})
    }
  }

  render() {

    const { filterBooks } = this.state
    const { search } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'>
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={search}
              onChange={(event) => this.updateSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {filterBooks.map((book) => (
              <Book
                key={book.id}
                book={book}
                ifShelfChange={(shelf)=>{ this.props.ifShelfChange(book.id,shelf) }}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
