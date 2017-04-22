import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Preload } from 'react-preload';
import { connect } from 'react-redux';

import Narrative from './narrative';

import storySelectors from './store/selectors/story';

import Moment from './components/Moment';
import Window from './components/Window';

import data from './assets/data';

const images = {};

Object.keys(data.images).forEach(
  key => (images[key] = require(`./assets/images/${key}.png`)),
);

export class App extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  static propTypes = {
    image: PropTypes.string,
    moment: PropTypes.string.isRequired,
    paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  constructor(...props) {
    super(...props);

    const { store } = this.context;

    this.narrative = new Narrative(store);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.moment !== this.props.moment) {
      this.narrative.chooseMoment(nextProps.moment);
    }
  }

  componentDidMount() {
    const { moment } = this.props;

    this.narrative.start(moment);
  }

  render() {
    const { image, paragraphs } = this.props;

    let safeTextAreas = [];

    if (image) {
      safeTextAreas = data.images[image].safeTextAreas;
    }

    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
        <Window>
          <Preload
            loadingIndicator={<Moment paragraphs={['Loading...']} />}
            images={Object.values(images)}
          >
            {paragraphs && paragraphs.length
              ? <Moment
                  image={images[image]}
                  paragraphs={paragraphs}
                  safeTextAreas={safeTextAreas}
                />
              : <div />}
          </Preload>
        </Window>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  image: storySelectors.getImage(state),
  moment: storySelectors.getMoment(state),
  paragraphs: storySelectors.getParagraphs(state),
});

export default connect(mapStateToProps)(App);
