import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Moment extends Component {
  static propTypes = {
    image: PropTypes.string,
    text: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  };

  render() {
    const { image, text } = this.props;

    const extraStyles = image
      ? { backgroundImage: `url(${image})`, backgroundSize: '100% 100%' }
      : {};

    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          ...extraStyles,
        }}
      >
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            color: 'grey',
            mixBlendMode: 'difference',
            fontFamily: 'Asar, serif',
            fontSize: 48,
          }}
        >
          {text}
        </div>
      </div>
    );
  }
}
