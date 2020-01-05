import React from "react"

import Book from "models/book.js"
import Pagination from "components/pagination.js"

export default class BookList extends React.Component {

  constructor(props) {
    super(props);

    this.state = { currentPage: 1 }
    this.clickPage = this.clickPage.bind(this);
  }

  clickPage(page) {
    this.props.clickPage(page)
    this.setState({ currentPage: page })
  }

  render() {
    var body = this.props.books.map(book =>
      <Book key={book.id} book={book} />
    );

    var o = {
      totalPageCount: this.props.totalPages,
      handler: this.clickPage,
      currentPage: this.state.currentPage
    }

    return (
      <table className="ui selectable striped table">
        <thead>
          <tr>
            <th>書籍ID</th>
            <th>書籍タイトル</th>
            <th>カテゴリ</th>
            <th>形式</th>
            <th colSpan="2">操作</th>
          </tr>
        </thead>
        <tbody>
          {body}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan="6">
              <Pagination class="ui right floated pagination menu" object={o} />
            </th>
          </tr>
        </tfoot>
      </table>
    );
  }
}