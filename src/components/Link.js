import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { chooseMoment } from '../store/actions/story';

export class Link extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
    target: PropTypes.string.isRequired,
  };

  render() {
    const { children, dispatch, target } = this.props;

    return (
      <span onClick={() => dispatch(chooseMoment({ moment: target }))}>
        {children}
      </span>
    );
  }
}

export default connect()(Link);
