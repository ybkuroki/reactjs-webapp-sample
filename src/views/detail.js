import React from "react"

import Modal from "components/modal.js"
import LabelGroup from "components/labelgroup.js"

export default class Detail extends React.Component {

    constructor(props) {
        super(props);

        this.clickOk = this.clickOk.bind(this);
        this.clickDetail = this.clickDetail.bind(this);
    }

    clickDetail() {
        this.refs.showModal.setState({ isOpen: true });
    }

    clickOk() {
        this.refs.showModal.setState({ isOpen: false });
    }

    render() {
        return (
            <div>
                <a href="#" onClick={this.clickDetail}>{this.props.book.title}</a>
            
                <Modal ref="showModal" header="書籍詳細"
                    content={
                        <React.Fragment>
                            <div className="ui form">
                                <LabelGroup title="書籍タイトル" name={this.props.book.title} />
                                <LabelGroup title="ISBN" name={this.props.book.isbn} />
                                <LabelGroup title="カテゴリ" name={this.props.book.category.name} />
                                <LabelGroup title="形式" name={this.props.book.format.name} />
                            </div>
                        </React.Fragment>
                    }
                    footer={
                        <button type="button" className="ui primary right button" onClick={this.clickOk}>OK</button >
                    }
                />
            </div>
        )
    }
}