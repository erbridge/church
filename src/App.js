import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Preload } from 'react-preload';
import { connect } from 'react-redux';
import shuffle from 'shuffle-array';

import Narrative from './narrative';

import storySelectors from './store/selectors/story';

import Cloud from './components/Cloud';
import Moment from './components/Moment';
import Title from './components/Title';
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
    moment: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  state = {
    moments: [],
  };

  constructor(...props) {
    super(...props);

    const { store } = this.context;

    this.narrative = new Narrative(store);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.moment !== this.props.moment) {
      this.narrative.chooseMoment(nextProps.moment);

      if (nextProps.moment === null) {
        this.setState({ moments: shuffle(this.narrative.getMoments()) });
      }
    }
  }

  componentDidMount() {
    const { moment } = this.props;

    this.narrative.start(moment);
  }

  render() {
    const {
      image,
      moment,
      paragraphs,
      visitedMoments,
      waitingForInput,
    } = this.props;
    const { moments } = this.state;

    let cloudLinkLocation;
    let safeTextAreas = [];

    if (image) {
      const imageData = data.images[image];

      if (imageData) {
        cloudLinkLocation = imageData.cloudLinkLocation;
        safeTextAreas = imageData.safeTextAreas;
      }
    }

    return (
      <div style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
        <Window>
          <Preload
            loadingIndicator={<Moment paragraphs={['Loading...']} />}
            images={Object.values(images)}
          >
            {waitingForInput && !moment
              ? <Title />
              : moment && paragraphs && paragraphs.length
                  ? <Moment
                      cloudLinkLocation={moment !== 'end' && cloudLinkLocation}
                      image={images[image]}
                      paragraphs={paragraphs}
                      safeTextAreas={safeTextAreas}
                      showCloudLink={waitingForInput}
                    />
                  : <Cloud
                      items={moments.map(moment => ({
                        text: moment.replace(/_/g, ' '),
                        target: moment,
                        visited: visitedMoments.indexOf(moment) > -1,
                      }))}
                    />}
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
  visitedMoments: storySelectors.getVisitedMoments(state),
  waitingForInput: storySelectors.getWaitingForInput(state),
});

export default connect(mapStateToProps)(App);
