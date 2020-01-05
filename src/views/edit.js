import React from "react"

import Actions from "store/actions.js"
import Store from "store/store.js"

import Modal from "components/modal.js"
import InputBox from "components/inputbox.js"
import SelectBox from "components/selectbox.js"
import Message from "components/message.js"

import Ajax from 'lib/ajax.js'

export default class Edit extends React.Component {

  constructor(props) {
    super(props);

    this.load = this.load.bind(this);
    this.success = this.success.bind(this);
    this.clickEdit = this.clickEdit.bind(this);
    this.bookCancel = this.bookCancel.bind(this);
    this.bookEdit = this.bookEdit.bind(this);

    this.onChangeTitleText = this.onChangeTitleText.bind(this);
    this.onChangeIsbnText = this.onChangeIsbnText.bind(this);
    this.onChangeCategorySelect = this.onChangeCategorySelect.bind(this);
    this.onChangeFormatSelect = this.onChangeFormatSelect.bind(this);

    this.state = {
      title: this.props.book.title,
      isbn: this.props.book.isbn,
      category: this.props.book.category.id,
      format: this.props.book.format.id,
      errors: [],
      message: '',
      categories: [],
      formats: []
    };

    Actions.cateogry();
    Actions.format();
  }

  componentDidMount() {
    Store.addSuccessListener(this.load);
  }

  componentWillUnmount() {
    Store.removeSuccessListener(this.load);
  }

  load() {
    this.setState({ categories: Store.getCategory() });
    this.setState({ formats: Store.getFormat() });
  }

  success() {
    this.refs.showModal.setState({ isOpen: false });
    this.setState({ errors: [] })
    this.setState({ messages: '' })
    location.href = '/'
  }

  clickEdit() {
    this.refs.showModal.setState({ isOpen: true });
  }

  bookCancel() {
    this.success()
  }

  bookEdit() {
    var book = {
      id: this.props.book.id,
      title: this.state.title,
      isbn: this.state.isbn,
      categoryId: this.state.category,
      formatId: this.state.format
    }

    var self = this;
    Ajax.post('/api/book/edit',
      JSON.stringify(book),
      (body) => {
        self.success()
      },
      (body) => {
        self.setState({ errors: body })
        self.setState({ message: '入力内容に誤りがあります。' })
      })
  }

  onChangeTitleText(value) {
    this.setState({ title: value })
  }
  onChangeIsbnText(value) {
    this.setState({ isbn: value })
  }
  onChangeCategorySelect(value) {
    this.setState({ category: value })
  }
  onChangeFormatSelect(value) {
    this.setState({ format: value })
  }

  render() {
    return (
      <div>
        <a href="#" onClick={this.clickEdit}>編集</a>

        <Modal ref="showModal" header="書籍編集"
          content={
            <React.Fragment>
              <Message messageType="error" message={this.state.message} />
              <div className="ui form">
                <InputBox title="書籍タイトル" isValide={this.state.errors.hasOwnProperty('title')} value={this.props.book.title} onChangeText={this.onChangeTitleText} />
                <InputBox title="ISBN" isValide={this.state.errors.hasOwnProperty('isbn')} value={this.props.book.isbn} onChangeText={this.onChangeIsbnText} />
                <SelectBox title="カテゴリ" options={this.state.categories} value={this.props.book.category.id} onChangeSelect={this.onChangeCategorySelect} />
                <SelectBox title="形式" options={this.state.formats} value={this.props.book.format.id} onChangeSelect={this.onChangeFormatSelect} />
              </div>
            </React.Fragment>
          }
          footer={
            <React.Fragment>
              <div className="ui black button" onClick={this.bookCancel}>キャンセル</div>
              <div className="ui primary right button" onClick={this.bookEdit} > 編集</div >
            </React.Fragment>
          }
        />
      </div>
    )
  }
}