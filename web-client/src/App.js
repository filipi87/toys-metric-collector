import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './pages/home/home';
import CallSession from './pages/calls/call-session';

const App = () => {
    return (
        <>
          <Router>
            <Switch>
              <Route path="/call/:eventId" component={CallSession} />
              <Route path="/home" component={Home} />
              <Route path="/" component={Home} />
            </Switch>
          </Router>
        </>
    );
};

export default App;