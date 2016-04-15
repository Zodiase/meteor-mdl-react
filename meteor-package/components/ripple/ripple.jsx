/**
 * @license
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let { Component, PropTypes } = React;

/**
 * MaterialRipple
 * @version 1.1.3
 * @since 1.0.6
 * @see {@link https://github.com/jasonmayes/mdl-component-design-pattern}
 */
class MaterialRipple extends Component {

  /**
   * Connect this ripple to an external element.
   * @param {HTMLElement} element
   * @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/ripple/ripple.js#L137}
   */
  bindElement(element) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError('Ripple can only bind to a HTMLElement.');
    }

    if (!element.classList.contains(this.CssClasses_.RIPPLE_EFFECT_IGNORE_EVENTS)) {
      if (!this.element_) {
        this.element_ = element;

        this.frameCount_ = 0;
        this.rippleSize_ = 0;
        this.x_ = 0;
        this.y_ = 0;
        // Touch start produces a compat mouse down event, which would cause a
        // second ripples. To avoid that, we use this property to ignore the first
        // mouse down after a touch start.
        this.ignoringMouseDown_ = false;

        this.element_.addEventListener('mousedown', this.boundDownHandler);
        this.element_.addEventListener('touchstart', this.boundDownHandler);
        this.element_.addEventListener('mouseup', this.boundUpHandler);
        this.element_.addEventListener('mouseleave', this.boundUpHandler);
        this.element_.addEventListener('touchend', this.boundUpHandler);
        this.element_.addEventListener('blur', this.boundUpHandler);
      }
    }
  }

  /**
   * Disconnect this ripple from the external element previously connected to.
   */
  unbindElement() {
    if (this.element_) {
      this.element_.removeEventListener('mousedown', this.boundDownHandler);
      this.element_.removeEventListener('touchstart', this.boundDownHandler);
      this.element_.removeEventListener('mouseup', this.boundUpHandler);
      this.element_.removeEventListener('mouseleave', this.boundUpHandler);
      this.element_.removeEventListener('touchend', this.boundUpHandler);
      this.element_.removeEventListener('blur', this.boundUpHandler);
      this.element_ = null;
    }
  }

  /**
   * Getter for frameCount_.
   * @return {number} the frame count.
   * @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/ripple/ripple.js#L167}
   */
  getFrameCount() {
    return this.frameCount_;
  }

  /**
   * Setter for frameCount_.
   * @param {number} fC the frame count.
   * @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/ripple/ripple.js#L175}
   */
  setFrameCount(fC) {
    this.frameCount_ = fC;
  };

  /**
   * Getter for rippleElement_.
   * @return {Element} the ripple element.
   * @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/ripple/ripple.js#L183}
   */
  getRippleElement() {
    return this.rippleElement_;
  };

  /**
   * Sets the ripple X and Y coordinates.
   * @param  {number} newX the new X coordinate
   * @param  {number} newY the new Y coordinate
   * @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/ripple/ripple.js#L191}
   */
  setRippleXY(newX, newY) {
    this.x_ = newX;
    this.y_ = newY;
  };

  /**
   * Sets the ripple styles.
   * @param  {boolean} start whether or not this is the start frame.
   * @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/ripple/ripple.js#L201}
   */
  setRippleStyles(start) {
    if (this.rippleElement_ !== null) {
      var transformString;
      var scale;
      var size;
      var offset = 'translate(' + this.x_ + 'px, ' + this.y_ + 'px)';

      if (start) {
        scale = this.Constant_.INITIAL_SCALE;
        size = this.Constant_.INITIAL_SIZE;
      } else {
        scale = this.Constant_.FINAL_SCALE;
        size = this.rippleSize_ + 'px';
        if (this.state.recentering) {
          offset = 'translate(' + this.boundWidth / 2 + 'px, ' +
            this.boundHeight / 2 + 'px)';
        }
      }

      transformString = 'translate(-50%, -50%) ' + offset + scale;

      this.rippleElement_.style.webkitTransform = transformString;
      this.rippleElement_.style.msTransform = transformString;
      this.rippleElement_.style.transform = transformString;

      if (start) {
        this.rippleElement_.classList.remove(this.CssClasses_.IS_ANIMATING);
      } else {
        this.rippleElement_.classList.add(this.CssClasses_.IS_ANIMATING);
      }
    }
  };

  /**
   * Handles an animation frame.
   * @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/ripple/ripple.js#L238}
   */
  animFrameHandler() {
    if (this.frameCount_-- > 0) {
      window.requestAnimationFrame(this.animFrameHandler.bind(this));
    } else {
      this.setRippleStyles(false);
    }
  };

  _getStateFromProps(props) {
    return {
      "recentering": props.center
    };
  }

  constructor(props) {
    super(props);

    this.state = this._getStateFromProps(props);

    this.element_ = null;

    this.boundDownHandler = this.downHandler_.bind(this);
    this.boundUpHandler = this.upHandler_.bind(this);
  }

  //componentWillMount() {}
  //componentDidMount() {}
  componentWillUnmount() {
    this.unbindElement();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._getStateFromProps(nextProps));
  }
  //shouldComponentUpdate(nextProps, nextState) {
  //  return true;
  //}
  //componentWillUpdate(nextProps, nextState) {}
  //componentDidUpdate(prevProps, prevState) {}
  render() {
    return (
      <span className={this.props.cssName || self.cssName}>
        <span
          className={this.CssClasses_.RIPPLE}
          onMouseUp={this.props.onMouseUp}
          ref={(ref) => this.rippleElement_ = ref}
        ></span>
      </span>
    );
  }
}
const self = Components.MaterialRipple = MaterialRipple;

self.cssName = 'mdl-button__ripple-container';
self.propTypes = {
  "cssName": PropTypes.string,
  "center": PropTypes.bool.isRequired
};
self.defaultProps = {
  "center": false
};

// Code from MDL.

/**
 * Store constants in one place so they can be updated easily.
 *
 * @enum {string | number}
 * @private
 */
MaterialRipple.prototype.Constant_ = {
  INITIAL_SCALE: 'scale(0.0001, 0.0001)',
  INITIAL_SIZE: '1px',
  INITIAL_OPACITY: '0.4',
  FINAL_OPACITY: '0',
  FINAL_SCALE: ''
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 *
 * @enum {string}
 * @private
 */
MaterialRipple.prototype.CssClasses_ = {
  RIPPLE_CENTER: 'mdl-ripple--center',
  RIPPLE_EFFECT_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
  RIPPLE: 'mdl-ripple',
  IS_ANIMATING: 'is-animating',
  IS_VISIBLE: 'is-visible'
};

/**
 * Handle mouse / finger down on element.
 *
 * @param {Event} event The event that fired.
 * @private
 */
MaterialRipple.prototype.downHandler_ = function(event) {
  if (!this.rippleElement_.style.width && !this.rippleElement_.style.height) {
    var rect = this.element_.getBoundingClientRect();
    this.boundHeight = rect.height;
    this.boundWidth = rect.width;
    this.rippleSize_ = Math.sqrt(rect.width * rect.width +
        rect.height * rect.height) * 2 + 2;
    this.rippleElement_.style.width = this.rippleSize_ + 'px';
    this.rippleElement_.style.height = this.rippleSize_ + 'px';
  }

  this.rippleElement_.classList.add(this.CssClasses_.IS_VISIBLE);

  if (event.type === 'mousedown' && this.ignoringMouseDown_) {
    this.ignoringMouseDown_ = false;
  } else {
    if (event.type === 'touchstart') {
      this.ignoringMouseDown_ = true;
    }
    var frameCount = this.getFrameCount();
    if (frameCount > 0) {
      return;
    }
    this.setFrameCount(1);
    var bound = event.currentTarget.getBoundingClientRect();
    var x;
    var y;
    // Check if we are handling a keyboard click.
    if (event.clientX === 0 && event.clientY === 0) {
      x = Math.round(bound.width / 2);
      y = Math.round(bound.height / 2);
    } else {
      var clientX = event.clientX ? event.clientX : event.touches[0].clientX;
      var clientY = event.clientY ? event.clientY : event.touches[0].clientY;
      x = Math.round(clientX - bound.left);
      y = Math.round(clientY - bound.top);
    }
    this.setRippleXY(x, y);
    this.setRippleStyles(true);
    window.requestAnimationFrame(this.animFrameHandler.bind(this));
  }
};

/**
 * Handle mouse / finger up on element.
 *
 * @param {Event} event The event that fired.
 * @private
 */
MaterialRipple.prototype.upHandler_ = function(event) {
  // Don't fire for the artificial "mouseup" generated by a double-click.
  if (event && event.detail !== 2) {
    // Allow a repaint to occur before removing this class, so the animation
    // shows for tap events, which seem to trigger a mouseup too soon after
    // mousedown.
    window.setTimeout(function() {
      // Added safeguard to avoid undefined-related errors.
      if (!this.rippleElement_) {
        return;
      }
      this.rippleElement_.classList.remove(this.CssClasses_.IS_VISIBLE);
    }.bind(this), 0);
  }
};
