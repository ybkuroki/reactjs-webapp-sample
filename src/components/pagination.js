// ref https://github.com/toshi0383/ts-react-pager
//     https://github.com/toshi0383/ts-react-pager/blob/master/src/pager.jsx
import React from 'react'

export default class Pagenation extends React.Component {

    constructor(props) {
        super(props);

        this.getHandler = this.getHandler.bind(this)
        this.getPager = this.getPager.bind(this)
        this.getBackLiElement = this.getBackLiElement.bind(this)
        this.getNextLiElement = this.getNextLiElement.bind(this)
    }

    getHandler(pageNum, handler) {
        return function () {
            handler(pageNum)
        }
    }

    getPager(o) {
        var totalPageCount = o.totalPageCount
        var handler = o.handler
        var currentPage = o.currentPage

        var pageLinks = []
        pageLinks.push(this.getBackLiElement(currentPage, handler))

        for (var i = 0; i < totalPageCount; i++) {
            var pageNum = i + 1
            var aClassName = pageNum == currentPage ? "item active" : "item"
            pageLinks.push(
                <a onClick={this.getHandler(pageNum, handler)}
                    className={aClassName}
                    key={pageNum}>{pageNum}</a>
            )
        }
        pageLinks.push(this.getNextLiElement(totalPageCount, currentPage, handler))

        var maxPageDispNum = Number(o.maxPagerDispNum)
        maxPageDispNum = maxPageDispNum ? maxPageDispNum : 3
        if (maxPageDispNum < 3) { maxPageDispNum = 3 }
        if (totalPageCount <= maxPageDispNum) {
            return pageLinks
        }
        var offset = 1
        var firstHalf = Math.round(maxPageDispNum / 2)// '前半'を定義
        var lastHalf = Math.round(totalPageCount - firstHalf + 1)// '後半'を定義
        if (currentPage <= firstHalf) {
            // currentが前半に入ったらoffsetは1
            offset = 1
        } else if (currentPage >= lastHalf) {
            // currentが後半に入ったらoffsetはtotal - maxPageDispNum + 1
            offset = totalPageCount - maxPageDispNum + 1
        } else {
            // それ以外はoffsetはcurrent - 1
            offset = currentPage - 1
        }
        var lastKey = offset + maxPageDispNum - 1
        var filtered = pageLinks.filter(function (e) {
            // return true if it should be present
            switch (Number(e.key)) {
                case 0:
                case totalPageCount + 1:
                    return true
                default:
                    return Number(e.key) >= offset && Number(e.key) <= lastKey
            }
        })
        return filtered
    }

    getBackLiElement(currentPage, handler) {
        var back
        if (currentPage > 1) {
            var backPageNum = currentPage - 1
            back = <a key='0' style={{ cursor: 'pointer' }} className="icon item"
                onClick={this.getHandler(backPageNum, handler)}><i className="left chevron icon"></i></a>
        } else {
            back = <a key='0' className="icon item disabled"><i className="left chevron icon"></i></a>
        }
        return back
    }

    getNextLiElement(totalPageCount, currentPage, handler) {
        var next
        if (currentPage < totalPageCount) {
            var nextPageNum = currentPage + 1
            next = <a key={totalPageCount + 1} className="icon item"
                onClick={this.getHandler(nextPageNum, handler)}><i className="right chevron icon"></i></a>
        } else {
            next = <a key={totalPageCount + 1} className="icon item disabled"><i className="right chevron icon"></i></a>
        }
        return next
    }

    render() {
        var pageLinks = this.getPager(this.props.object)
        return (
            <div className={this.props.class}>
                {pageLinks}
            </div>
        )
    }
}