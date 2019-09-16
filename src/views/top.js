import React from "react"
import { withRouter } from 'react-router'

import NavBar from "components/navbar.js"

import Regist from "views/regist.js"
import BookList from "views/booklist.js"
import Search from "views/search.js"

import Ajax from 'lib/ajax.js'

import '../main.css'

class Top extends React.Component {

    constructor(props) {
        super(props);
        
        this.topRef = React.createRef();

        this.searchBook = this.searchBook.bind(this);
        this.getBookList = this.getBookList.bind(this);
        this.clickRegist = this.clickRegist.bind(this);
        this.downloadReport = this.downloadReport.bind(this);
        this.logout = this.logout.bind(this);
        this.loginAccount = this.loginAccount.bind(this);

        this.state = {
            books: [],
            query: '',
            totalPages: 1,
            uri: '/api/book/list',
            userName: 'user',
            isOpen: false,
            isLoading: false
        };

        this.loginAccount()
        this.getBookList(1)
    }

    searchBook(keyword) {
        this.setState({ isLoading: true })
        this.setState({ uri: '/api/book/search?query=' + keyword })
        this.getBookList(1, '/api/book/search?query=' + keyword)
        this.setState({ isLoading: false })
    }

    getBookList(page, uri) {
        var self = this;

        Ajax.get(uri ? uri : self.state.uri,
            { page: page - 1, size: 5 },
            (body) => {
                self.setState({ books: body.content })
                self.setState({ totalPages: body.totalPages })
            },
            (body) => {
            })
    }
    clickRegist() {
        this.topRef.current.registRef.current.setState({ isOpen: true });
    }
    downloadReport() {
        window.open(Ajax.requestUrl('/api/book/allListPdfReport'))
    }
    logout() {
        var self = this;
        Ajax.post('/api/account/logout',
            {},
            (body) => {
                self.props.history.push('/login')
                console.log('ログアウトしました。')
                location.href = '/'
            },
            (body) => {
                console.log('ログアウトに失敗しました。')
            })
    }
    loginAccount() {
        var self = this;
        Ajax.get('/api/account/loginAccount',
            {},
            (body) => {
                self.setState({ userName: body.name })
            })
    }

    render() {
        return (
            <div>
                <NavBar title="書籍管理システム" isToggle="true"
                    content={
                        <React.Fragment>
                            <a className="item" href="#" onClick={this.clickRegist}>新規登録</a>
                            <a className="item" href="#" onClick={this.downloadReport}>ダウンロード</a>

                            <div className="right menu">
                                <div className="item">{this.state.userName}さん</div>
                                <a className="item" href="#" onClick={this.logout}>ログアウト</a>
                            </div >
                        </React.Fragment>
                    }
                    toggleContent={
                        <React.Fragment>
                            <a className="item" href="#" onClick={this.clickRegist}>新規登録</a>
                            <a className="item" href="#" onClick={this.downloadReport}>ダウンロード</a>
                            <a className="item" href="#" onClick={this.logout}>ログアウト</a>
                        </React.Fragment>
                    }
                />
                <div className="main ui container">
                    <Search searchBook={this.searchBook} isLoading={this.state.isLoading} />
                    <BookList books={this.state.books} totalPages={this.state.totalPages} clickPage={this.getBookList} />
                    <Regist ref={this.topRef} header="書籍登録" />
                </div>
            </div>
        );
    }
}
export default withRouter(Top)