import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Moment extends Component {
  static propTypes = {
    image: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
    safeTextAreas: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    safeTextAreas: [],
  };

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
            color: '#eee',
            fontFamily: 'Asar, serif',
            fontSize: 24,
            ...extraTextStyles,
          }}
        >
          {paragraphs.map((text, i) => (
            <p key={i}>
              {text}
            </p>
          ))}
        </div>
      </div>
    );
  }
}
