import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import Link from './Link';
import Paragraph from './Paragraph';

import bgImage from '../assets/images/bg.png';

export default class Moment extends Component {
  static propTypes = {
    cloudLinkLocation: PropTypes.object,
    font: PropTypes.string,
    image: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
    safeTextAreas: PropTypes.arrayOf(PropTypes.object),
    showCloudLink: PropTypes.bool,
  };

  static defaultProps = {
    font: 'Arsenal',
    image: bgImage,
    safeTextAreas: [],
  };

  render() {
    const {
      cloudLinkLocation,
      font,
      image,
      paragraphs,
      safeTextAreas,
      showCloudLink,
    } = this.props;

    const extraTextStyles = safeTextAreas && safeTextAreas.length
      ? { position: 'absolute', ...safeTextAreas[0] }
      : {};

    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${image})`,
            backgroundSize: '100% 100%',
            alignItems: 'flex-start',
            justifyContent: 'stretch',
          }}
        >
          <Scrollbars
            renderTrackHorizontal={() => <div />}
            renderThumbHorizontal={() => <div />}
            renderThumbVertical={({ style, ...props }) => (
              <div
                {...props}
                style={{
                  ...style,
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                }}
              />
            )}
            style={{
              flex: 1,
              mixBlendMode: 'difference',
              color: '#bbb',
              fontFamily: font,
              fontSize: 24,
              ...extraTextStyles,
            }}
          >
            <TransitionGroup component="div">
              {paragraphs.map((text, i) => <Paragraph key={i} text={text} />)}
            </TransitionGroup>
          </Scrollbars>
        </div>
        {showCloudLink &&
          cloudLinkLocation &&
          <div
            style={{
              position: 'absolute',
              mixBlendMode: 'difference',
              color: '#bbb',
              fontFamily: 'Averia Libre',
              fontSize: 36,
              ...cloudLinkLocation,
            }}
          >
            <Link target={null}>move on</Link>
          </div>}
      </div>
    );
  }
}
