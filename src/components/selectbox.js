import React from 'react'
import SelectItem from 'components/selectitem.js'

export default class SelectBox extends React.Component {
	
	constructor(props) {
		super(props)
		
		this.setWrapperRef = this.setWrapperRef.bind(this);
		this.clickItem = this.clickItem.bind(this)
		this.clickDropdown = this.clickDropdown.bind(this)
		this.listen = this.listen.bind(this)
		this.state = {
			selectedValue: '',
			isActive: false,
			value: this.props.value
		};
	}

	setWrapperRef(node) {
		this.wrapperRef = node;
	}
	
	componentDidMount() {
		// @see https://codeday.me/jp/qa/20190228/339228.html
		// ドロップダウンの外側をクリック時に閉じる動作
		this.listen(window, 'click', function (e) {
			if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
				this.setState({isActive : false})
			}
		}.bind(this))
	}

	componentWillUnmount() {
		// イベント破棄
		if (this._eventRemovers) {
			this._eventRemovers.forEach(function (eventRemover) {
				eventRemover.remove()
			})
		}
	}

	clickDropdown() {
		// ドロップダウンクリック時の項目リスト表示可否判定
		this.state.isActive == false ? this.setState({ isActive: true }) : this.setState({ isActive: false })
	}
	
    clickItem(index) {
		this.setState({ value: index })
		var value = this.props.options.find((option) => option.id == index).name
		this.setState({ selectedValue: value })
        
        if(this.props.onChangeSelect) {
        	this.props.onChangeSelect(index)
        }
	}

	listen(target, eventType, callback) {
		// イベントリスナーにドロップダウンの外側をクリック時の処理を追加
		if (!this._eventRemovers) {
			this._eventRemovers = []
		}
		target.addEventListener(eventType, callback)
		this._eventRemovers.push({
			remove: function () {
				target.removeEventListener(eventType, callback)
			}
		})
	}

    render() {
		var lists = this.props.options.map((list) => {
			return <SelectItem name={list.name} key={list.id} selected={list.id == this.state.value} value={list.id} clickItem={this.clickItem} />;
		});
		
		// 初期値を設定
		var defaultValue = this.props.options.find((option) => option.id == this.state.value)

		return (
			<div ref={this.setWrapperRef} className="field">
				<label>{this.props.title}</label>
				<div className={['ui selection dropdown', this.state.isActive ? 'active visible' : ''].join(' ')} onClick={this.clickDropdown}>
					<i className="dropdown icon"></i>
					<div className="text">{this.state.selectedValue == '' && defaultValue ? defaultValue.name : this.state.selectedValue }</div>
					<div className={['menu transition', this.state.isActive ? 'visible' : ''].join(' ')} styles={this.state.isActive ? 'display: block !important' : ''}>
						{lists}
					</div>
				</div>
	        </div>
		);
	}
}