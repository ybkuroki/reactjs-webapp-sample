import React from 'react'

export default class Message extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.message == '') {
			return null
		}
		return (
			<div className={['ui message', this.props.messageType].join(' ')}>
				{this.props.message}
			</div>
		)
	}
}