import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/dashboard/dashboard';
import Home from '../pages/home/home';
import CallSession from '../pages/calls/call-session';

import { ROOT, HOME, DASHBOARD, CALL } from './router-constants';

export const RouterConfig = () => {
    return (
        <Switch>
            <Route path={HOME} component={Home} />
            <Route path={CALL} component={CallSession} />
            <Route path={DASHBOARD} component={Dashboard} />
            <Route path={ROOT} component={Home} />
        </Switch>
    );
};
