import Login from '../commont/login'
import Main from '../commont/main'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React, { Component } from 'react';
class router extends Component {
    render() {
        return (
            <Router basename="/">
                <div className="App">
                    <Switch>
                        <Route exact path="/" component={Login} />
                        <Route path="/main/tk" component={Main} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default router;