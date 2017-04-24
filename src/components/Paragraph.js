import PropTypes from 'prop-types';
import React, { Component } from 'react';
import prefix from 'react-prefixer';

import Link from './Link';

const LINK_RE = /\[\[\s*(.+?)\s*:\s*(.+?)\s*\]\]/g;
const EMPH_BOLD_RE = /\^\^&&(.+?)&&\^\^/g;
const BOLD_RE = /&&(.+?)&&/g;
const EMPH_RE = /\^\^(.+?)\^\^/g;

const FADE_DURATION = 2000;

export default class Paragraph extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
  };

  canFade = false;

  state = {
    opacity: 0,
    textNodes: [],
  };

  updateTextNodes(props) {
    let { text } = props;

    text = text.replace(/%%/g, '');

    const linkedText = [];
    let link = LINK_RE.exec(text);
    let lastIndex = 0;

    while (link !== null) {
      linkedText.push(
        text.substring(lastIndex, link.index).replace(/ {2}/g, '\u00a0\u00a0'),
      );
      linkedText.push(<Link key={link.index} target={link[2]}>{link[1]}</Link>);

      lastIndex = link.index + link[0].length;

      link = LINK_RE.exec(text);
    }

    linkedText.push(text.substring(lastIndex).replace(/ {2}/g, '\u00a0\u00a0'));

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

    this.setState({ textNodes: emphasizedText });
  }

  fade(opacity) {
    setTimeout(() => {
      if (this.canFade) {
        this.setState({ opacity });
      }
    }, 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.text !== this.props.text) {
      this.updateTextNodes(nextProps);
    }
  }

  componentWillMount() {
    this.canFade = true;
    this.setState({ opacity: 0 });

    this.updateTextNodes(this.props);
  }

  componentDidAppear() {
    this.fade(1);
  }

  componentDidEnter() {
    this.fade(1);
  }

  componentWillLeave(done) {
    this.fade(0);

    setTimeout(() => done(), FADE_DURATION);
  }

  componentWillUnmount() {
    this.canFade = false;
  }

  render() {
    const { opacity, textNodes } = this.state;

    return (
      <p
        style={{
          opacity,
          transition: `opacity ${FADE_DURATION}ms`,
          ...prefix({ userSelect: 'none' }),
        }}
      >
        {textNodes}
      </p>
    );
  }
}
