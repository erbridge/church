import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import Link from './Link';

import bgImage from '../assets/images/bg.png';

const LINK_RE = /\[\[\s*(.+?)\s*:\s*(.+?)\s*\]\]/g;
const EMPH_BOLD_RE = /\^\^&&(.+?)&&\^\^/g;
const BOLD_RE = /&&(.+?)&&/g;
const EMPH_RE = /\^\^(.+?)\^\^/g;

export default class Moment extends Component {
  static propTypes = {
    cloudLinkLocation: PropTypes.object,
    image: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
    safeTextAreas: PropTypes.arrayOf(PropTypes.object),
    showCloudLink: PropTypes.bool,
  };

  static defaultProps = {
    image: bgImage,
    safeTextAreas: [],
  };

  renderParagraph(text, index) {
    const linkedText = [];
    let link = LINK_RE.exec(text);
    let lastIndex = 0;

    while (link !== null) {
      linkedText.push(
        text
          .substring(lastIndex, link.index)
          .replace(/\t/g, '\u00a0\u00a0\u00a0\u00a0')
          .replace(/ {2}/g, '\u00a0\u00a0'),
      );
      linkedText.push(<Link key={link.index} target={link[2]}>{link[1]}</Link>);

      lastIndex = link.index + link[0].length;

      link = LINK_RE.exec(text);
    }

    linkedText.push(
      text
        .substring(lastIndex)
        .replace(/\t/g, '\u00a0\u00a0\u00a0\u00a0')
        .replace(/ {2}/g, '\u00a0\u00a0'),
    );

    const emphasizedEmboldenedText = [];

    linkedText.forEach(text => {
      if (typeof text === 'string' || text instanceof String) {
        let emphBold = EMPH_BOLD_RE.exec(text);
        lastIndex = 0;

        while (emphBold !== null) {
          emphasizedEmboldenedText.push(
            text.substring(lastIndex, emphBold.index),
          );
          emphasizedEmboldenedText.push(
            <em key={emphBold.index}><b>{emphBold[1]}</b></em>,
          );

          lastIndex = emphBold.index + emphBold[0].length;

          emphBold = EMPH_BOLD_RE.exec(text);
        }

        emphasizedEmboldenedText.push(text.substring(lastIndex));
      } else {
        emphasizedEmboldenedText.push(text);
      }
    });

    const emboldenedText = [];

    emphasizedEmboldenedText.forEach(text => {
      if (typeof text === 'string' || text instanceof String) {
        let bold = BOLD_RE.exec(text);
        lastIndex = 0;

        while (bold !== null) {
          emboldenedText.push(text.substring(lastIndex, bold.index));
          emboldenedText.push(<b key={bold.index}>{bold[1]}</b>);

          lastIndex = bold.index + bold[0].length;

          bold = BOLD_RE.exec(text);
        }

        emboldenedText.push(text.substring(lastIndex));
      } else {
        emboldenedText.push(text);
      }
    });

    const emphasizedText = [];

    emboldenedText.forEach(text => {
      if (typeof text === 'string' || text instanceof String) {
        let emph = EMPH_RE.exec(text);
        lastIndex = 0;

        while (emph !== null) {
          emphasizedText.push(text.substring(lastIndex, emph.index));
          emphasizedText.push(<em key={emph.index}>{emph[1]}</em>);

          lastIndex = emph.index + emph[0].length;

          emph = EMPH_RE.exec(text);
        }

        emphasizedText.push(text.substring(lastIndex));
      } else {
        emphasizedText.push(text);
      }
    });

    return <p key={index}>{emphasizedText}</p>;
  }

  render() {
    const {
      cloudLinkLocation,
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
              fontFamily: 'Asar, serif',
              fontSize: 24,
              ...extraTextStyles,
            }}
          >
            {paragraphs.map((text, i) => this.renderParagraph(text, i))}
          </Scrollbars>
        </div>
        {showCloudLink &&
          cloudLinkLocation &&
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
      </div>
    );
  }
}
