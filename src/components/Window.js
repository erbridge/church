import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class Window extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    ratio: PropTypes.number,
    style: PropTypes.object,
  };

  static defaultProps = {
    ratio: 16 / 9,
  };

  state = {
    height: 0,
    left: 0,
    top: 0,
    width: 0,
  };

  updateDimensions(props) {
    const { ratio } = props;

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const screenRatio = screenWidth / screenHeight;

    let width = screenWidth;
    let height = screenHeight;

    if (screenRatio > ratio) {
      width = screenHeight * ratio;
    } else {
      height = screenWidth / ratio;
    }

    this.setState({
      left: (screenWidth - width) / 2,
      top: (screenHeight - height) / 2,
      width,
      height,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.updateDimensions(nextProps);
  }

  componentWillMount() {
    this.updateDimensions(this.props);
  }

  componentDidMount() {
    this.onResize = () => this.updateDimensions(this.props);

    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);

    delete this.onResize;
  }

  render() {
    const { children, style } = this.props;
    const { height, left, top, width } = this.state;

    return (
      <div
        style={{
          ...style,
          position: 'absolute',
          left,
          top,
          width,
          height,
          overflow: 'hidden',
        }}
      >
        {children}
      </div>
    );
  }
}
