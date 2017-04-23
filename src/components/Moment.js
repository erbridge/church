import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import Link from './Link';

const LINK_RE = /\[\[\s*(.+?)\s*:\s*(.+?)\s*\]\]/g;

export default class Moment extends Component {
  static propTypes = {
    cloudLinkLocation: PropTypes.object,
    image: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
    safeTextAreas: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    safeTextAreas: [],
  };

  renderParagraph(text, index) {
    let link = LINK_RE.exec(text);
    let outputText = [];
    let lastIndex = 0;

    while (link !== null) {
      outputText.push(
        text
          .substring(lastIndex, link.index)
          .replace(/\t/g, '\u00a0\u00a0\u00a0\u00a0')
          .replace(/ {2}/g, '\u00a0\u00a0'),
      );
      outputText.push(<Link key={link.index} target={link[2]}>{link[1]}</Link>);

      lastIndex = link.index + link[0].length;

      link = LINK_RE.exec(text);
    }

    outputText.push(
      text
        .substring(lastIndex)
        .replace(/\t/g, '\u00a0\u00a0\u00a0\u00a0')
        .replace(/ {2}/g, '\u00a0\u00a0'),
    );

    return <p key={index}>{outputText}</p>;
  }

  render() {
    const { cloudLinkLocation, image, paragraphs, safeTextAreas } = this.props;

    const extraContainerStyles = image
      ? { backgroundImage: `url(${image})`, backgroundSize: '100% 100%' }
      : {};
    const extraTextStyles = safeTextAreas && safeTextAreas.length
      ? { position: 'absolute', ...safeTextAreas[0] }
      : {};

    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {cloudLinkLocation &&
          <div
            style={{
              position: 'absolute',
              mixBlendMode: 'difference',
              color: '#bbb',
              fontFamily: 'Asar, serif',
              fontSize: 36,
              ...cloudLinkLocation,
            }}
          >
            <Link target={null}>move on</Link>
          </div>}
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            alignItems: 'flex-start',
            justifyContent: 'stretch',
            ...extraContainerStyles,
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
              fontFamily: 'Asar, serif',
              fontSize: 24,
              ...extraTextStyles,
            }}
          >
            {paragraphs.map((text, i) => this.renderParagraph(text, i))}
          </Scrollbars>
        </div>
      </div>
    );
  }
}
