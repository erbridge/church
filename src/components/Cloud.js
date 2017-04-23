import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Link from './Link';

export default class Cloud extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        target: PropTypes.string.isRequired,
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

  renderItem({ text, target }, index) {
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
      radius = 30;
      spacing = 3;
      direction = -1;
    } else if (index < 50) {
      radius = 20;
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
    const left = `${50 + radius * Math.sin(angle)}%`;

    return (
      <div
        key={index}
        style={{
          position: 'absolute',
          top,
          left,
          padding: 10,
          textAlign: 'center',
          mixBlendMode: 'difference',
          color: '#bbb',
          fontFamily: 'Asar, serif',
          fontSize: 24,
        }}
      >
        <Link target={target}>{text}</Link>
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
