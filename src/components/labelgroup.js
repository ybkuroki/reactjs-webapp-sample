import React from 'react'

export default class LabelGroup extends React.Component {
	
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
		    <div className="field">
                <label>{this.props.title}</label>
                <p>{this.props.name}</p>
            </div>
		)
	}
}