import React from "react"
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Top from 'views/top.js'
import Login from 'views/login.js'

export default (
    <Switch>
        <Route path="/top" component={Top} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Login} />
    </Switch>
)