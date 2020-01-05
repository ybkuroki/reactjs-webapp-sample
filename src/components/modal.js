import React from "react"

export default class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.clickClose = this.clickClose.bind(this);
    this.state = {
      isOpen: false
    }
  }

  clickClose() {
    this.setState({ isOpen: false });
  }

  render() {
    return (
      <div className={['ui dimmer modals page', this.state.isOpen ? 'visible active' : ''].join(' ')}>
        <div className={['ui modal', this.state.isOpen ? 'visible active' : ''].join(' ')}
          style={this.state.isOpen ? { display: "block" } : { display: "none" }}>
          <i className="close icon" onClick={this.clickClose}></i>

          <div className="header">
            {this.props.header}
          </div>

          <div className="content">
            {this.props.content}
          </div>

          <div className="actions">
            {this.props.footer}
          </div>
        </div>
      </div>
    );
  }
}