import PropTypes from 'prop-types';
import React, { Component } from 'react';
import prefix from 'react-prefixer';
import { connect } from 'react-redux';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import Link from './Link';

import logoImage from '../assets/images/logo.png';

export class Title extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    style: PropTypes.object,
  };

  render() {
    const { dispatch, style } = this.props;

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          ...style,
        }}
      >
        <TransitionGroup
          component="div"
          style={{
            position: 'absolute',
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${logoImage})`,
            backgroundSize: '100% 100%',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Averia Libre',
            fontSize: 72,
          }}
        >
          <Link dispatch={dispatch} fadeDuration={10000} target="start">
            move on
          </Link>
        </TransitionGroup>
        <div
          style={{
            position: 'absolute',
            bottom: '30%',
            width: '100%',
            textAlign: 'center',
            mixBlendMode: 'difference',
            color: '#888',
            fontFamily: 'Averia Libre',
            fontSize: 24,
            ...prefix({
              userSelect: 'none',
            }),
          }}
        >
          Kate Gray | Felix Laurie von Massenbach | Beck Michalak
        </div>
      </div>
    );
  }
}

export default connect()(Title);
