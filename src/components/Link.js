import PropTypes from 'prop-types';
import React, { Component } from 'react';
import prefix from 'react-prefixer';

import { chooseMoment } from '../store/actions/story';

export default class Link extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    dispatch: PropTypes.func.isRequired,
    fadeDuration: PropTypes.number,
    style: PropTypes.object,
    target: PropTypes.string,
    visited: PropTypes.bool,
  };

  canFade = false;

  state = {
    isHoveredOver: false,
    opacity: 0,
  };

  fade(opacity) {
    setTimeout(() => {
      if (this.canFade) {
        this.setState({ opacity });
      }
    }, 0);
  }

  componentWillMount() {
    const { fadeDuration } = this.props;

    if (fadeDuration) {
      this.canFade = true;
      this.setState({ opacity: 0 });
    } else {
      this.setState({ opacity: 1 });
    }
  }

  componentDidAppear() {
    this.fade(1);
  }

  componentDidEnter() {
    this.fade(1);
  }

  componentWillUnmount() {
    this.canFade = false;
  }

  render() {
    const {
      children,
      dispatch,
      fadeDuration,
      style,
      target,
      visited,
    } = this.props;
    const { isHoveredOver, opacity } = this.state;

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
          opacity,
          transition: `opacity ${fadeDuration}ms`,
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
