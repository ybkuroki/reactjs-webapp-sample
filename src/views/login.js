import React from "react"
import { withRouter } from 'react-router'

import NavBar from "components/navbar.js"
import InputBox from "components/inputbox.js"
import Message from "components/message.js"
import CommandButton from "components/commandbutton.js"

import Ajax from 'lib/ajax.js'

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.onChangeUserText = this.onChangeUserText.bind(this);
    this.onChangePasswordText = this.onChangePasswordText.bind(this);

    this.state = {
      user: '',
      password: '',
      message: '',
      isLoading: false
    }
  }

  login() {
    this.setState({ isLoading: true });
    var self = this;
    Ajax.formPost('/api/account/login',
      { username: self.state.user, password: self.state.password },
      (body) => {
        self.setState({ isLoading: false });
        self.setState({ message: '' })
        self.props.history.push('/top')
      },
      (body) => {
        self.setState({ isLoading: false });
        self.setState({ message: 'ログインに失敗しました。' })
      })
  }

  onChangeUserText(value) {
    this.setState({ user: value })
  }
  onChangePasswordText(value) {
    this.setState({ password: value })
  }

  render() {
    return (
      <div>
        <NavBar title="書籍管理システム" isToggle={false} />
        <div className="main ui container">
          <div className="column">
            <Message messageType="error" message={this.state.message} />
            <div className="ui large form">
              <div className="ui segment">
                <InputBox title="ユーザ名" placeholder="ユーザ名" value={this.state.user} onChangeText={this.onChangeUserText} />
                <InputBox title="パスワード" typeName="password" placeholder="パスワード" value={this.state.password} onChangeText={this.onChangePasswordText} />
                <CommandButton name="ログイン" className="ui button fluid large primary" useDiv="false" isLoading={this.state.isLoading} click={this.login} />
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}
export default withRouter(Login)