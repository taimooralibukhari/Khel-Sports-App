import React from 'react';
import AppRouter from "./routers/AppRouter";
import {Router} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
// import './App.css';

export const history = createHistory()

function App() {
  return (
    <Router history={history}>
      <div>
        <AppRouter/>
      </div>
    </Router>
  );
}

export default App;
