//ListBooks component
import React, { Component } from 'react'
import PropTypes from 'prop-types'
class Book extends Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
  }

  changeShelf = (e) => {
      this.props.ifShelfChange(e.target.value)
  }

  render() {
    return (
      <li key={this.props.book.id}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.smallThumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={this.props.book.shelf} onChange={this.changeShelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">Remove</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">
            { this.props.book.authors ? this.props.book.authors.join(', ') : null }
          </div>
        </div>
      </li>
    )
  }
}

export default Book
