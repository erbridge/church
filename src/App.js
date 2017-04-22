import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { createStore } from './store';

import logo from './logo.svg';

const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              backgroundColor: '#222',
              height: 150,
              padding: 20,
              color: 'white',
            }}
          >
            <img src={logo} alt="logo" style={{ height: 80 }} />
            <h2>Welcome to React</h2>
          </div>
          <p style={{ fontSize: 'large' }}>
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
      </Provider>
    );
  }
}
