import React from "react"

import Actions from "store/actions.js"
import Store from "store/store.js"

import Modal from "components/modal.js"
import InputBox from "components/inputbox.js"
import SelectBox from "components/selectbox.js"
import Message from "components/message.js"

import Ajax from 'lib/ajax.js'

export default class Regist extends React.Component {

  constructor(props) {
    super(props);

    this.registRef = React.createRef();

    this.load = this.load.bind(this);
    this.success = this.success.bind(this);
    this.initilize = this.initilize.bind(this);
    this.bookCancel = this.bookCancel.bind(this);
    this.bookRegist = this.bookRegist.bind(this);

    this.onChangeTitleText = this.onChangeTitleText.bind(this);
    this.onChangeIsbnText = this.onChangeIsbnText.bind(this);
    this.onChangeCategorySelect = this.onChangeCategorySelect.bind(this);
    this.onChangeFormatSelect = this.onChangeFormatSelect.bind(this);

    this.state = {
      title: '',
      isbn: '',
      category: 1,
      format: 1,
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

  bookCancel() {
    this.initilize()
  }

  bookRegist() {
    var self = this;
    var book = {
      title: this.state.title,
      isbn: this.state.isbn,
      categoryId: this.state.category,
      formatId: this.state.format
    }

    Ajax.post('/api/book/new',
      JSON.stringify(book),
      (body) => {
        self.success()
      },
      (body) => {
        self.setState({ errors: body })
        self.setState({ message: '入力内容に誤りがあります。' })
      })
  }

  success() {
    this.initilize()
    location.href = '/'
  }
  initilize() {
    this.setState({ errors: '' })
    this.setState({ message: '' })
    this.setState({ title: '' })
    this.setState({ isbn: '' })
    this.setState({ category: 1 })
    this.setState({ format: 1 })
    this.registRef.current.setState({ isOpen: false });
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
      <Modal ref={this.registRef} header="書籍登録"
        content={
          <React.Fragment>
            <Message messageType="error" message={this.state.message} />
            <div className="ui form">
              <InputBox title="書籍タイトル" isValide={this.state.errors.hasOwnProperty('title')} onChangeText={this.onChangeTitleText} />
              <InputBox title="ISBN" isValide={this.state.errors.hasOwnProperty('isbn')} onChangeText={this.onChangeIsbnText} />
              <SelectBox title="カテゴリ" options={this.state.categories} value={this.state.category} onChangeSelect={this.onChangeCategorySelect} />
              <SelectBox title="形式" options={this.state.formats} value={this.state.format} onChangeSelect={this.onChangeFormatSelect} />
            </div>
          </React.Fragment>
        }
        footer={
          <React.Fragment>
            <div className="ui black button" onClick={this.bookCancel}>キャンセル</div>
            <div className="ui primary right button" onClick={this.bookRegist} > 登録</div >
          </React.Fragment>
        }
      />
    )
  }
}