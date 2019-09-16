import React from 'react'

export default class SelectItem extends React.Component {

    constructor(props) {
        super(props);
        this.clickItem = this.clickItem.bind(this);
    }

    clickItem() {
        if (this.props.clickItem) {
            this.props.clickItem(this.props.value)
        }
    }

    render() {
        return (
            <div className={['item', this.props.selected ? 'active selected' : ''].join(' ')} onClick={this.clickItem} >
                {this.props.name}
            </div>
        );
    }
}