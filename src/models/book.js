import React from "react"

import Edit from "views/edit.js"
import Detail from "views/detail.js"

import Ajax from 'lib/ajax.js'

export default class Book extends React.Component {

  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    var book = {
      id: this.props.book.id,
      title: this.props.book.title,
      isbn: this.props.book.isbn,
      categoryId: this.props.book.category.id,
      formatId: this.props.book.format.id
    }

    Ajax.post('/api/book/delete',
      JSON.stringify(book),
      () => {
        location.href = '/'
      },
      () => { })
  }

  render() {
    return (
      <tr>
        <td>{this.props.book.id}</td>
        <td>
          <Detail book={this.props.book} />
        </td>
        <td>{this.props.book.category.name}</td>
        <td>{this.props.book.format.name}</td>
        <td>
          <Edit book={this.props.book} />
        </td>
        <td>
          <a href="#" onClick={this.handleDelete}>削除</a>
        </td>
      </tr>
    )
  }
}