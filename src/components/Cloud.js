import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Link from './Link';

export default class Cloud extends Component {
  static propTypes = {
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
    if (visited) console.log(target);

    const { items } = this.props;
    const { rotationOffset } = this.state;

    let radius;
    let spacing;
    let direction;

    if (index < 25) {
      radius = 40;
      spacing = 2;
      direction = 1;
    } else if (index < 40) {
      radius = 30 * 2 / 3 + 10;
      spacing = 3;
      direction = -1;
    } else if (index < 50) {
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
      <div
        key={index}
        style={{
          position: 'absolute',
          top,
          left,
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          fontFamily: 'Asar, serif',
          fontSize: 24,
        }}
      >
        <Link
          target={target}
          style={{
            mixBlendMode: 'difference',
            color: visited ? '#999' : 'white',
          }}
        >
          {text}
        </Link>
      </div>
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
    const { items } = this.props;

    return (
      <div>
        {items.map((item, i) => this.renderItem(item, i))}
      </div>
    );
  }
}
