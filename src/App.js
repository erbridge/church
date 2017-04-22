import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { createStore } from './store';

import Moment from './components/Moment';
import Window from './components/Window';

import testImage from './assets/test/test.png';

const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div
          style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
        >
          <Window style={{ backgroundColor: 'white' }}>
            <Moment image={testImage} text={'This is the story!'} />
          </Window>
        </div>
      </Provider>
    );
  }
}
