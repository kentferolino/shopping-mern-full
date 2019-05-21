import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Shopping from './components/Shopping';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions'
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Main from './components/common/Main';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <AppNavbar />
            <div style={{ display: 'flex' }}>
              <div style={{ padding: '10px', width: '40%', background: '#f0f0f0' }}>
                <ul style={{listStyleType:'none', padding: 0}}>
                  <li><Link to='/'>Home</Link></li>
                  <li><Link to='/bubblegum'>Bubblegum</Link></li>
                  <li><Link to='/shoelaces'>Shoelaces</Link></li>
                </ul>
              </div>
              <div><Main /></div>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
