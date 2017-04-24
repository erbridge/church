import React, { Component } from 'react';
import prefix from 'react-prefixer';

import Link from './Link';

import logoImage from '../assets/images/logo.png';

export default class Title extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${logoImage})`,
          backgroundSize: '100% 100%',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Cabin, sans-serif',
          fontSize: 72,
          ...prefix({
            userSelect: 'none',
          }),
        }}
      >
        <Link target="start">move on</Link>
      </div>
    );
  }
}
