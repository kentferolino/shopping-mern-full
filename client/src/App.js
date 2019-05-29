import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <div>
              <Main />
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
