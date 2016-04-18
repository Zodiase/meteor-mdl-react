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
let { makeArray, getClassList, registerClassNameFlags } = Helers;

/**
 * MaterialButton
 * @version 1.1.3
 * @since 1.0.6
 * @see {@link https://github.com/jasonmayes/mdl-component-design-pattern}
 */
class MaterialButton extends Component {

  _upgrade() {
    if (this.element_) {
      // @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/button/button.js#L110}
      this.element_.addEventListener('mouseup', this.boundButtonBlurHandler);
      this.element_.addEventListener('mouseleave', this.boundButtonBlurHandler);

      if (this.ripple_) {
        this.ripple_.bindElement(this.element_);
      }
    }
  }

  _downgrade() {
    if (this.element_) {
      this.element_.removeEventListener('mouseup', this.boundButtonBlurHandler);
      this.element_.removeEventListener('mouseleave', this.boundButtonBlurHandler);

      // The ripple will downgrade itself if unmounted.
    }
  }

  _getStateFromProps(props) {
    return {
      // `for` only works with `label`.
      tagName: props.htmlFor ? 'label' : 'button',
      classList: getClassList(self, props)
    };
  }

  constructor(props) {
    super(props);

    this.boundButtonBlurHandler = this.blurHandler_.bind(this);
    this.boundRippleBlurHandler = this.blurHandler_.bind(this);

    this.rippleContainer_ = (
      <Components.MaterialRipple
        onMouseUp={this.boundRippleBlurHandler}
        ref={(ref) => this.ripple_ = ref}
      />
    );

    this.state = this._getStateFromProps(props);
  }

  //componentWillMount() {}
  componentDidMount() {
    this._upgrade();
  }
  componentWillUnmount() {
    this._downgrade();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._getStateFromProps(props));
  }
  //shouldComponentUpdate(nextProps, nextState) {
  //  return true;
  //}
  componentWillUpdate(nextProps, nextState) {
    this._downgrade();
  }
  componentDidUpdate(prevProps, prevState) {
    this._upgrade();
  }
  render() {
    let {
      // @type {Boolean}
      ripple,
      children,
      ...props
    } = this.props;

    // Ensure children is an array.
    children = makeArray(children);

    // Reset references.
    this.ripple_ = null;
    this.element_ = null;

    return React.createElement(
      this.state.tagName,
      {
        ...props,
        className: this.state.classList.join(' '),
        // Save reference.
        ref: (ref) => this.element_ = ref
      },
      children,
      ripple ? this.rippleContainer_ : null
    );
  }
}
const self = Components.MaterialButton = MaterialButton;

self.cssName = 'mdl-button';
self.propTypes = {
  "className": PropTypes.string.isRequired,
  "type": PropTypes.oneOf([
    'button', 'submit', 'reset'
  ]).isRequired,
  "disabled": PropTypes.bool.isRequired,
  "ripple": PropTypes.bool.isRequired,
  "children": PropTypes.any.isRequired
};
self.defaultProps = {
  "className": "",
  "type": "button",
  "disabled": false,
  "ripple": false,
  "children": []
};
registerClassNameFlags(self, {
  "colored": "mdl-button--colored",
  "raised": "mdl-button--raised",
  "primary": "mdl-button--primary",
  "accent": "mdl-button--accent",
  "fab": "mdl-button--fab",
  "icon": "mdl-button--icon"
});

// Code from MDL.

/**
 * Store constants in one place so they can be updated easily.
 *
 * @enum {string | number}
 * @private
 */
MaterialButton.prototype.Constant_ = {
  // None for now.
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 *
 * @enum {string}
 * @private
 */
MaterialButton.prototype.CssClasses_ = {
  // None for now.
};

/**
 * Handle blur of element.
 *
 * @param {Event} event The event that fired.
 * @private
 */
MaterialButton.prototype.blurHandler_ = function(event) {
  if (event) {
    this.element_.blur();
  }
};

// Public methods.

/**
 * Disable button.
 *
 * @public
 */
MaterialButton.prototype.disable = function() {
  this.element_.disabled = true;
};
MaterialButton.prototype['disable'] = MaterialButton.prototype.disable;

/**
 * Enable button.
 *
 * @public
 */
MaterialButton.prototype.enable = function() {
  this.element_.disabled = false;
};
MaterialButton.prototype['enable'] = MaterialButton.prototype.enable;
