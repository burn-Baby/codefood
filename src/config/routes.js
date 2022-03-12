import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import App from "../App";

class routes extends React.Component {
    render() {
    return (
        <Router>
            <div id="routers">
                <Route exact path="/hehe" component={App}/>
            </div>
        </Router>
    )}
}

export default routes;