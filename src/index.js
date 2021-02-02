import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import App from './App';
import {firebase} from './firebase/firebase';
import {history} from './App';


let hasRendered = false

const renderApp = () => {
  if(!hasRendered) {
    ReactDOM.render(<App />,document.getElementById('root'));
    hasRendered = true
  }
}

export let userID = ''

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    renderApp()
    userID = user.uid
    if(history.location.pathname === '/login') {
      history.push('/dashboard')
    }
  } else {
    renderApp()
    history.push('/login')
  }
})
