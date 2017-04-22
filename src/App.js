import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Preload } from 'react-preload';
import { connect } from 'react-redux';

import Narrative from './narrative';

import storySelectors from './store/selectors/story';

import Moment from './components/Moment';
import Window from './components/Window';

const images = {
  test: require('./assets/images/test.png'),
};

export class App extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  constructor(...props) {
    super(...props);

    const { store } = this.context;

    this.narrative = new Narrative(store);
  }

  componentDidMount() {
    this.narrative.start();
  }

  render() {
    const { paragraphs } = this.props;

    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
        <Window>
          <Preload
            loadingIndicator={<Moment text="Loading..." />}
            images={Object.values(images)}
          >
            {paragraphs && paragraphs.length
              ? <Moment
                  image={images.test}
                  text={paragraphs.map((text, i) => <p key={i}>{text}</p>)}
                />
              : <div />}
          </Preload>
        </Window>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  paragraphs: storySelectors.getParagraphs(state),
});

export default connect(mapStateToProps)(App);
