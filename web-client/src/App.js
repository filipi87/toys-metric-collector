import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RouterConfig } from './router/router-config';

const App = () => {
    return (
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    );
};

export default App;