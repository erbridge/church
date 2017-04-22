import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Link from './Link';

const LINK_RE = /\[\[\s*(.+?)\s*:\s*(.+?)\s*\]\]/g;

export default class Moment extends Component {
  static propTypes = {
    image: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
    safeTextAreas: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    safeTextAreas: [],
  };

  renderParagraph(text, index) {
    text = text.trim();

    let link = LINK_RE.exec(text);
    let outputText = [];
    let lastIndex = 0;

    while (link !== null) {
      outputText.push(text.substring(lastIndex, link.index));
      outputText.push(<Link key={link.index} target={link[2]}>{link[1]}</Link>);

      lastIndex = link.index + link[0].length;

      link = LINK_RE.exec(text);
    }

    if (outputText.length) {
      outputText.push(text.substring(lastIndex));
    }

    return <p key={index}>{outputText.length ? outputText : text}</p>
  }

  render() {
    const { image, paragraphs, safeTextAreas } = this.props;

    const extraContainerStyles = image
      ? { backgroundImage: `url(${image})`, backgroundSize: '100% 100%' }
      : {};
    const extraTextStyles = safeTextAreas && safeTextAreas.length
      ? { position: 'absolute', ...safeTextAreas[0] }
      : {};

    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          ...extraContainerStyles,
        }}
      >
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            textAlign: 'center',
            mixBlendMode: 'difference',
            color: '#bbb',
            fontFamily: 'Asar, serif',
            fontSize: 24,
            ...extraTextStyles,
          }}
        >
          {paragraphs.map((text, i) => this.renderParagraph(text, i))}
        </div>
      </div>
    );
  }
}
