import React from "react"

import { BrowserRouter} from 'react-router-dom'
import Routes from "router/router.js"

export default class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                {Routes}
            </BrowserRouter>
        );
    }
}