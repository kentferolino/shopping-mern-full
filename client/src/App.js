import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Shopping from './components/Shopping';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions'
import { BrowserRouter, Route } from 'react-router-dom';
import Routes from './components/common/Routes';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Routes />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
