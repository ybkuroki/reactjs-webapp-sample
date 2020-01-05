import React from 'react'

export default class CommandButton extends React.Component {

	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		if (this.props.click) {
			this.props.click()
		}
	}

	render() {
		return (
			<React.Fragment>
				{(() => {
					if (this.props.useDiv) {
						return (
							<div className={['ui button', this.props.className].join(' ')} onClick={this.onClick} >
								{this.props.name}
							</div>
						)
					} else {
						return (
							<button className={['ui button', this.props.isLoading ? 'loading' : ''].join(' ')} onClick={this.onClick} >
								{this.props.name}
							</button>
						)
					}
				})()}
			</React.Fragment>
		);
	}
}