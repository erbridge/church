import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { chooseMoment } from '../store/actions/story';

export class Link extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
    style: PropTypes.object,
    target: PropTypes.string,
  };

  render() {
    const { children, dispatch, style, target } = this.props;

    return (
      <span
        onClick={() => dispatch(chooseMoment({ moment: target || null }))}
        style={{
          cursor: 'pointer',
          color: 'white',
          textShadow: '0 0 5px white',
          ...style
        }}
      >
        {children}
      </span>
    );
  }
}

export default connect()(Link);
