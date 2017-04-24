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
  };

  render() {
    const { dispatch } = this.props;

    return (
      <TransitionGroup
        component="div"
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          backgroundImage: `url(${logoImage})`,
          backgroundSize: '100% 100%',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Averia Libre',
          fontSize: 72,
          ...prefix({
            userSelect: 'none',
          }),
        }}
      >
        <Link dispatch={dispatch} fadeDuration={10000} target="start">
          move on
        </Link>
      </TransitionGroup>
    );
  }
}

export default connect()(Title);
