import React from "react"
import { withRouter } from 'react-router'

import Ajax from 'lib/ajax.js'

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.clickMenu = this.clickMenu.bind(this);
    this.checkLogin = this.checkLogin.bind(this);

    this.checkLogin()
  }

  clickMenu() {
  }

  checkLogin() {
    var self = this
    Ajax.get('/api/account/loginStatus',
      {},
      () => {
        self.props.history.push('/top')
      },
      () => {
        self.props.history.push('/login')
      })
  }

  render() {
    return (
      <div className="ui grid">
        <div className="computer tablet only row">
          <div className="ui fixed top menu">
            <a className="brand item" href="/">{this.props.title}</a>
            {this.props.content}
          </div>
        </div>
        <div className="mobile only row">
          <div className="ui fixed top menu">
            <a className="brand item" href="/">{this.props.title}</a>
            {this.props.mobileLeftContent}
            <div className="right menu">
              {this.props.mobileRightContent}

              {(() => {
                if (this.props.isToggle) {
                  return (
                    <div id="menu" className="ui right simple dropdown item">
                      <i className="content icon" onClick={this.clickMenu}></i>
                      <div className="menu">
                        {this.props.toggleContent}
                      </div>
                    </div>
                  )
                }
              })()}
            </div>
          </div>
        </div>
      </div >
    );
  }
}
export default withRouter(NavBar)