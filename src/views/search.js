import React from "react"

import InputBox from "components/inputbox.js"
import CommandButton from "components/commandbutton.js"

export default class Search extends React.Component {

  constructor(props) {
    super(props);

    this.searchBook = this.searchBook.bind(this);
    this.changeText = this.changeText.bind(this);

    this.state = { query: '' }
  }

  searchBook() {
    this.props.searchBook(this.state.query)
  }

  changeText(value) {
    this.setState({ query: value })
  }

  render() {
    return (
      <InputBox className="ui fluid action left icon input" placeholder="タイトル検索" value={this.state.query} onChangeText={this.changeText}
        label={
          <i className="search icon"></i>
        }
        button={
          <CommandButton name="検索" className="ui primary button" useDiv="false" isLoading={this.props.isLoading} click={this.searchBook} />
        }
      />
    )
  }
}