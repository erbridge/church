import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { createStore } from './store';

import Window from './components/Window';

const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div
          style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
        >
          <Window style={{ backgroundColor: 'white' }}>
            <div>This is the story!</div>
          </Window>
        </div>
      </Provider>
    );
  }
}
