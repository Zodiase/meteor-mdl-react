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
 * MaterialButton
 * @version 1.1.1
 * @since 1.0.6
 */

class MaterialButton extends Component {

  _upgrade() {
    if (this.element_) {
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

  constructor(props) {
    super(props);
    this.boundButtonBlurHandler = this.blurHandler_.bind(this);
    this.boundRippleBlurHandler = this.blurHandler_.bind(this);
  }

  //componentWillMount() {}
  componentDidMount() {
    this._upgrade();
  }
  componentWillUnmount() {
    this._downgrade();
  }

  //componentWillReceiveProps(nextProps) {}
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
      className,
      ripple,
      children,
      ...props
    } = this.props;

    // Reset references.
    this.ripple_ = null;
    this.element_ = null;

    let classNames = [
      self.cssName
    ];
    // Add classNames passed in.
    let passedInClassNames = String(className).split(' ');
    for (let name of passedInClassNames) {
      if (name.length > 0) {
        classNames.push(name);
      }
    }
    // Add flag classNames.
    for (let flagClassName of self.flagClassNames) {
      if (this.props[flagClassName]) {
        classNames.push(self.classNames[flagClassName]);
      }
    }
    let classNameString = classNames.join(" ");

    // Create ripple if requested.
    let rippleContainer = null;
    if (ripple) {
      rippleContainer = (
        <Components.MaterialRipple
          onMouseUp={this.boundRippleBlurHandler}
          ref={(ref) => this.ripple_ = ref}
        />
      );
    }

    let tagName = 'button';
    if (props.htmlFor) {
      // `for` only works with `label`.
      tagName = 'label';
    }

    return React.createElement(
      tagName,
      {
        ...props,
        className: classNameString,
        // Save reference.
        ref: (ref) => this.element_ = ref
      },
      rippleContainer,
      children
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
  "ripple": false
};
self.classNames = {
  "colored": "mdl-button--colored",
  "raised": "mdl-button--raised",
  "primary": "mdl-button--primary",
  "accent": "mdl-button--accent",
  "fab": "mdl-button--fab",
  "icon": "mdl-button--icon"
};
self.flagClassNames = ["colored", "raised", "primary", "accent", "fab", "icon"];
for (let flagClassName of self.flagClassNames) {
  self.propTypes[flagClassName] = PropTypes.bool;
}

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
