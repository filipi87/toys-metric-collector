import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RouterConfig } from './router/router-config';
import { CallProvider } from './contexts/calls-context';

const App = () => {
    return (
      <CallProvider>
        <BrowserRouter>
          <RouterConfig />
        </BrowserRouter>
      </CallProvider>
    );
};

export default App;