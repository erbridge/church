import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Preload } from 'react-preload';
import { connect } from 'react-redux';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import shuffle from 'shuffle-array';

import Narrative from './narrative';

import storySelectors from './store/selectors/story';

import Cloud from './components/Cloud';
import Moment from './components/Moment';
import Title from './components/Title';
import Window from './components/Window';

import data from './assets/data';

const images = {};

Object.keys(data.images).forEach(key => {
  images[key] = require(`./assets/images/${key}.png`);
});

export class App extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired,
  };

  static propTypes = {
    dispatch: PropTypes.func.isRequired,
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
      dispatch,
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
      <div
        onClick={() => this.narrative.fastForward()}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'black',
        }}
      >
        <Window>
          <Preload
            loadingIndicator={
              <Moment
                dispatch={dispatch}
                font="Averia Libre"
                paragraphs={['Loading...']}
              />
            }
            images={Object.values(images)}
          >
            <div
              style={{ position: 'relative', width: '100%', height: '100%' }}
            >
              {Object.keys(images).map(key => (
                <img
                  key={key}
                  src={images[key]}
                  alt=""
                  style={{ position: 'absolute', opacity: 0 }}
                />
              ))}
              <TransitionGroup
                component="div"
                style={{ position: 'absolute', width: '100%', height: '100%' }}
              >
                {moment &&
                  <Moment
                    cloudLinkLocation={moment !== 'end' && cloudLinkLocation}
                    dispatch={dispatch}
                    fadeDuration={1000}
                    font={
                      (this.narrative
                        .getMoments()
                        .find(({ key }) => key === moment) || {}).font
                    }
                    image={images[image]}
                    paragraphs={paragraphs}
                    safeTextAreas={safeTextAreas}
                    showCloudLink={waitingForInput}
                  />}
              </TransitionGroup>
              {!waitingForInput &&
                !moment &&
                <Cloud
                  items={moments.map(({ name, key }) => ({
                    text: name,
                    target: key,
                    visited: visitedMoments.indexOf(key) > -1,
                  }))}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }}
                />}
              {waitingForInput &&
                !moment &&
                <Title
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                  }}
                />}
            </div>
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
