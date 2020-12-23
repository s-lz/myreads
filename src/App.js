import React from 'react'
import './App.css'
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
// importing Components
import Header from './Header'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <div className="list-books">
            <Header />
            <Route exact path='/' render={() => (
              <ListBooks />
            )} />
            <Route path='/add' render={() => (
              <SearchBooks />
            )} />
          </div>
        </div>
      </Router>
    )
  }
}

export default BooksApp
