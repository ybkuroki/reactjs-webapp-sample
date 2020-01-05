import React from 'react'

export default class InputBox extends React.Component {

  constructor(props) {
    super(props);
    this.changeText = this.changeText.bind(this);
    this.state = { value: this.props.value };
  }

  changeText(e) {
    this.setState({ value: e.target.value });

    if (this.props.onChangeText) {
      this.props.onChangeText(e.target.value)
    }
  }

  render() {
    return (
      <div className={[this.props.isValide ? 'field error' : 'field', this.props.className].join(' ')}>
        {(() => {
          if (this.props.title) {
            return (
              <label>{this.props.title}</label>
            )
          }
          if (this.props.label) {
            return (
              this.props.label
            )
          }
        })()}
        <input type={this.props.typeName} placeholder={this.props.placeholder} value={this.state.value} onChange={this.changeText} />
        {this.props.button}
      </div>
    );
  }
}