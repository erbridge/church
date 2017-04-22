import React, { Component } from 'react';
import { Preload } from 'react-preload';
import { Provider } from 'react-redux';

import { createStore } from './store';

import Moment from './components/Moment';
import Window from './components/Window';

const images = {
  test: require('./assets/test/test.png'),
};

const store = createStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div
          style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
        >
          <Window>
            <Preload
              loadingIndicator={<Moment text="Loading..." />}
              images={Object.values(images)}
            >
              <Moment image={images.test} text="This is the story!" />
            </Preload>
          </Window>
        </div>
      </Provider>
    );
  }
}
