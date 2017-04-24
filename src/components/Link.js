import PropTypes from 'prop-types';
import React, { Component } from 'react';
import prefix from 'react-prefixer';
import { connect } from 'react-redux';

import { chooseMoment } from '../store/actions/story';

export class Link extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
    style: PropTypes.object,
    target: PropTypes.string,
    visited: PropTypes.bool,
  };

  state = {
    isHoveredOver: false,
  };

  render() {
    const { children, dispatch, style, target, visited } = this.props;
    const { isHoveredOver } = this.state;

    return (
      <span
        onMouseOver={() => this.setState({ isHoveredOver: true })}
        onMouseOut={() => this.setState({ isHoveredOver: false })}
        onClick={ev => {
          ev.stopPropagation();
          dispatch(chooseMoment({ moment: target || null }));
        }}
        style={{
          cursor: 'pointer',
          mixBlendMode: 'difference',
          color: visited
            ? isHoveredOver ? '#ddd' : '#999'
            : isHoveredOver ? 'white' : '#ddd',
          textShadow: visited
            ? isHoveredOver ? '0 0 8px #ddd' : '0 0 5px #999'
            : isHoveredOver ? '0 0 8px white' : '0 0 5px #ddd',
          ...style,
          ...prefix({
            userSelect: 'none',
          }),
        }}
      >
        {children}
      </span>
    );
  }
}

export default connect()(Link);
