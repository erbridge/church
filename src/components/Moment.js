import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import Link from './Link';
import Paragraph from './Paragraph';

import bgImage from '../assets/images/bg.png';

const SCROLL_LOCK_OFFSET = 40;

export default class Moment extends Component {
  static propTypes = {
    cloudLinkLocation: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    fadeDuration: PropTypes.number,
    font: PropTypes.string,
    image: PropTypes.string,
    paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
    safeTextAreas: PropTypes.arrayOf(PropTypes.object),
    showCloudLink: PropTypes.bool,
  };

  static defaultProps = {
    font: 'Arsenal',
    image: bgImage,
    safeTextAreas: [],
  };

  canFade = false;

  state = {
    opacity: 0,
    shouldScroll: false,
  };

  updateScroll() {
    const { shouldScroll } = this.state;

    if (shouldScroll) {
      const {
        clientHeight,
        scrollHeight,
        scrollTop,
      } = this.scrollbarsNode.getValues();

      if (scrollTop < scrollHeight - clientHeight) {
        this.scrollbarsNode.scrollTop(
          scrollTop +
            Math.ceil((scrollHeight - clientHeight - scrollTop) * 0.025),
        );
      } else {
        this.setState({ shouldScroll: false });
      }
    }

    this.scrollFrame = window.requestAnimationFrame(() => this.updateScroll());
  }

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

  componentDidMount() {
    this.updateScroll();
  }

  componentDidAppear() {
    this.fade(1);
  }

  componentDidEnter() {
    this.fade(1);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.paragraphs.length !== this.props.paragraphs.length) {
      const {
        clientHeight,
        scrollHeight,
        scrollTop,
      } = this.scrollbarsNode.getValues();

      if (scrollTop + SCROLL_LOCK_OFFSET >= scrollHeight - clientHeight) {
        this.setState({ shouldScroll: true });
      }
    }
  }

  componentWillLeave(done) {
    const { fadeDuration } = this.props;

    this.fade(0);

    setTimeout(() => done(), fadeDuration);
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.scrollFrame);

    delete this.scrollFrame;

    this.canFade = false;
  }

  render() {
    const {
      cloudLinkLocation,
      dispatch,
      fadeDuration,
      font,
      image,
      paragraphs,
      safeTextAreas,
      showCloudLink,
    } = this.props;
    const { opacity } = this.state;

    const extraTextStyles = safeTextAreas && safeTextAreas.length
      ? { position: 'absolute', ...safeTextAreas[0] }
      : {};

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          opacity,
          transition: `opacity ${fadeDuration}ms`,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            backgroundImage: `url(${image})`,
            backgroundSize: '100% 100%',
            alignItems: 'flex-start',
            justifyContent: 'stretch',
          }}
        >
          <Scrollbars
            ref={node => {
              this.scrollbarsNode = node;
            }}
            renderTrackHorizontal={() => <div />}
            renderThumbHorizontal={() => <div />}
            renderThumbVertical={({ style, ...props }) => (
              <div
                {...props}
                style={{
                  ...style,
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                }}
              />
            )}
            style={{
              flex: 1,
              mixBlendMode: 'difference',
              color: '#bbb',
              fontFamily: font,
              fontSize: 24,
              ...extraTextStyles,
            }}
          >
            <TransitionGroup component="div">
              {paragraphs.map((text, i) => (
                <Paragraph key={i} dispatch={dispatch} text={text} />
              ))}
            </TransitionGroup>
          </Scrollbars>
        </div>
        {showCloudLink &&
          cloudLinkLocation &&
          <TransitionGroup
            component="div"
            style={{
              position: 'absolute',
              mixBlendMode: 'difference',
              color: '#bbb',
              fontFamily: 'Averia Libre',
              fontSize: 36,
              ...cloudLinkLocation,
            }}
          >
            <Link dispatch={dispatch} fadeDuration={5000} target={null}>
              move on
            </Link>
          </TransitionGroup>}
      </div>
    );
  }
}
