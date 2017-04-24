import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import Link from './Link';

export class Cloud extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        target: PropTypes.string.isRequired,
        visited: PropTypes.bool,
      }),
    ).isRequired,
  };

  state = {
    rotationOffset: 0,
  };

  animateRotation() {
    if (this.animationFrame) {
      window.cancelAnimationFrame(this.animationFrame);
    }

    const { rotationOffset } = this.state;

    this.setState({ rotationOffset: rotationOffset + 0.005 });

    this.animationFrame = window.requestAnimationFrame(() =>
      this.animateRotation(),
    );
  }

  renderItem({ text, target, visited }, index) {
    const { dispatch, items } = this.props;
    const { rotationOffset } = this.state;

    let radius;
    let spacing;
    let direction;

    if (index < 24) {
      radius = 40;
      spacing = 2;
      direction = 1;
    } else if (index < 39) {
      radius = 30 * 2 / 3 + 10;
      spacing = 3;
      direction = -1;
    } else if (index < 49) {
      radius = 30 / 3 + 10;
      spacing = 5;
      direction = 1;
    } else {
      radius = 10;
      spacing = 12;
      direction = -1;
    }

    const angle =
      (index + direction * rotationOffset) *
      spacing *
      2 *
      Math.PI /
      items.length;

    const top = `${50 + radius * Math.cos(angle)}%`;
    const left = `${50 + radius * Math.sin(angle) * 9 / 16}%`;

    return (
      <TransitionGroup
        key={index}
        component="div"
        style={{
          position: 'absolute',
          top,
          left,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Link
          dispatch={dispatch}
          fadeDuration={4000}
          target={target}
          visited={visited}
        >
          {text}
        </Link>
      </TransitionGroup>
    );
  }

  componentDidMount() {
    this.animateRotation();
  }

  componentWillUnmount() {
    if (this.animationFrame) {
      window.cancelAnimationFrame(this.animationFrame);
    }
  }

  render() {
    const { dispatch, items } = this.props;

    return (
      <div
        style={{
          textAlign: 'center',
          fontFamily: 'Averia Libre',
          fontSize: 24,
        }}
      >
        {items.map((item, i) => this.renderItem(item, i))}
        {items.every(({ visited }) => visited) &&
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <Link dispatch={dispatch} target="end">move on</Link>
          </div>}
      </div>
    );
  }
}

export default connect()(Cloud);
