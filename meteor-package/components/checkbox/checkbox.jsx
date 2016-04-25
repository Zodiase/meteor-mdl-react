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
let { getClassList, handleExtraHandler, joinClassNames, makeArray, registerClassNameFlags } = Helers;

/**
 * MaterialCheckbox
 * @version 1.1.3
 * @since 1.1.3
 * @see {@link https://github.com/jasonmayes/mdl-component-design-pattern}
 */
class MaterialCheckbox extends Component {

  _upgrade() {
    if (this.element_) {
      if (this.ripple_) {
        this.ripple_.bindElement(this.element_);
      }
    }
  }

  _downgrade() {
    if (this.element_) {
      // The ripple will downgrade itself if unmounted.
    }
  }

  _getStateFromProps(props) {
    const classList = getClassList(self, props);
    classList.push(this.CssClasses_.IS_UPGRADED);

    return {
      inputOnChange: props.onChange || null,
      inputChecked: props.checked,
      classList
    };
  }

  constructor(props) {
    super(props);

    this.state = this._getStateFromProps(props);

    // @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/checkbox/checkbox.js#L238}
    this.boundRippleMouseUp = this.onMouseUp_.bind(this);

    // @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/checkbox/checkbox.js#L247}
    this.boundInputOnChange = this.onChange_.bind(this);
    this.boundInputOnFocus = this.onFocus_.bind(this);
    this.boundInputOnBlur = this.onBlur_.bind(this);
    this.boundElementMouseUp = this.onMouseUp_.bind(this);

    this.reactBoundInputOnChange = handleExtraHandler(() => {
      return this.state.inputOnChange;
    }, (event) => {

      this.setState({
        inputChecked: event.target.checked
      });

      // @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/checkbox/checkbox.js#L251}
      this.boundInputOnChange(event);

    });

    this.rippleContainer_ = (
      <Components.MaterialRipple center
        // @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/checkbox/checkbox.js#L235}
        cssName={this.CssClasses_.RIPPLE_CONTAINER}
        // @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/checkbox/checkbox.js#L239}
        onMouseUp={this.boundRippleMouseUp}
        ref={(ref) => this.ripple_ = ref}
      />
    );
  }

  componentDidMount() {
    this._upgrade();
    this.updateClasses_();
  }
  componentWillUnmount() {
    this._downgrade();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._getStateFromProps(nextProps));
  }
  componentWillUpdate(nextProps, nextState) {
    this._downgrade();
  }
  componentDidUpdate(prevProps, prevState) {
    this._upgrade();
    this.updateClasses_();
  }
  render() {
    let {
      id,
      // @type {Boolean}
      ripple,
      children,
      // Filter unwanted props.
      checked,
      onChange,
      ...props
    } = this.props;

    // Ensure children is an array.
    children = makeArray(children);

    const inputId = `${id}__input`;

    // Reset references.
    this.ripple_ = null;
    this.element_ = null;
    this.inputElement_ = null;

    return (
      <label {...props}
        id={id}
        className={this.state.classList.join(' ')}
        htmlFor={inputId}
        // @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/checkbox/checkbox.js#L254}
        onMouseUp={this.boundRippleMouseUp}
        // Save reference.
        ref={(ref) => this.element_ = ref}
      >
        <input
          type="checkbox"
          id={inputId}
          className={this.CssClasses_.INPUT}
          checked={this.state.inputChecked}
          onChange={this.reactBoundInputOnChange}
          onFocus={this.boundInputOnFocus}
          onBlur={this.boundInputOnBlur}
          // Save reference.
          ref={(ref) => this.inputElement_ = ref}
        />
        <span className="mdl-checkbox__label">{children}</span>
        <span className={this.CssClasses_.FOCUS_HELPER}></span>
        <span className={this.CssClasses_.BOX_OUTLINE}>
          <span className={this.CssClasses_.TICK_OUTLINE}></span>
        </span>
        {ripple ? this.rippleContainer_ : null}
      </label>
    );
  }
}
const self = Components.MaterialCheckbox = MaterialCheckbox;

self.cssName = 'mdl-checkbox';
self.propTypes = {
  "id": PropTypes.string.isRequired,
  "className": PropTypes.string.isRequired,
  "checked": PropTypes.bool.isRequired,
  "ripple": PropTypes.bool.isRequired,
  "onChange": PropTypes.func,
  "children": PropTypes.any.isRequired
};
self.defaultProps = {
  "className": "",
  "checked": false,
  "ripple": false,
  "children": []
};
registerClassNameFlags(self, {
//   "ripple": "mdl-js-ripple-effect"
});

// Code from MDL.

/**
 * Store constants in one place so they can be updated easily.
 *
 * @enum {string | number}
 * @private
 */
MaterialCheckbox.prototype.Constant_ = {
  TINY_TIMEOUT: 0.001
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 *
 * @enum {string}
 * @private
 */
MaterialCheckbox.prototype.CssClasses_ = {
  INPUT: 'mdl-checkbox__input',
  BOX_OUTLINE: 'mdl-checkbox__box-outline',
  FOCUS_HELPER: 'mdl-checkbox__focus-helper',
  TICK_OUTLINE: 'mdl-checkbox__tick-outline',
  RIPPLE_EFFECT: 'mdl-js-ripple-effect',
  RIPPLE_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events',
  RIPPLE_CONTAINER: 'mdl-checkbox__ripple-container',
  RIPPLE_CENTER: 'mdl-ripple--center',
  RIPPLE: 'mdl-ripple',
  IS_FOCUSED: 'is-focused',
  IS_DISABLED: 'is-disabled',
  IS_CHECKED: 'is-checked',
  IS_UPGRADED: 'is-upgraded'
};

/**
 * Handle change of state.
 *
 * @param {Event} event The event that fired.
 * @private
 */
MaterialCheckbox.prototype.onChange_ = function(event) {
  this.updateClasses_();
};

/**
 * Handle focus of element.
 *
 * @param {Event} event The event that fired.
 * @private
 */
MaterialCheckbox.prototype.onFocus_ = function(event) {
  this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
};

/**
 * Handle lost focus of element.
 *
 * @param {Event} event The event that fired.
 * @private
 */
MaterialCheckbox.prototype.onBlur_ = function(event) {
  this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
};

/**
 * Handle mouseup.
 *
 * @param {Event} event The event that fired.
 * @private
 */
MaterialCheckbox.prototype.onMouseUp_ = function(event) {
  this.blur_();
};

/**
 * Handle class updates.
 *
 * @private
 */
MaterialCheckbox.prototype.updateClasses_ = function() {
  this.checkDisabled();
  this.checkToggleState();
};

/**
 * Add blur.
 *
 * @private
 */
MaterialCheckbox.prototype.blur_ = function() {
  // TODO: figure out why there's a focus event being fired after our blur,
  // so that we can avoid this hack.
  window.setTimeout(function() {
    this.inputElement_.blur();
  }.bind(this), /** @type {number} */ (this.Constant_.TINY_TIMEOUT));
};

// Public methods.

/**
 * Check the inputs toggle state and update display.
 *
 * @public
 */
MaterialCheckbox.prototype.checkToggleState = function() {
  if (this.inputElement_.checked) {
    this.element_.classList.add(this.CssClasses_.IS_CHECKED);
  } else {
    this.element_.classList.remove(this.CssClasses_.IS_CHECKED);
  }
};
MaterialCheckbox.prototype['checkToggleState'] =
    MaterialCheckbox.prototype.checkToggleState;

/**
 * Check the inputs disabled state and update display.
 *
 * @public
 */
MaterialCheckbox.prototype.checkDisabled = function() {
  if (this.inputElement_.disabled) {
    this.element_.classList.add(this.CssClasses_.IS_DISABLED);
  } else {
    this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
  }
};
MaterialCheckbox.prototype['checkDisabled'] =
    MaterialCheckbox.prototype.checkDisabled;

/**
 * Disable checkbox.
 *
 * @public
 */
MaterialCheckbox.prototype.disable = function() {
  this.inputElement_.disabled = true;
  this.updateClasses_();
};
MaterialCheckbox.prototype['disable'] = MaterialCheckbox.prototype.disable;

/**
 * Enable checkbox.
 *
 * @public
 */
MaterialCheckbox.prototype.enable = function() {
  this.inputElement_.disabled = false;
  this.updateClasses_();
};
MaterialCheckbox.prototype['enable'] = MaterialCheckbox.prototype.enable;

/**
 * Check checkbox.
 *
 * @public
 */
MaterialCheckbox.prototype.check = function() {
  this.inputElement_.checked = true;
  this.updateClasses_();
};
MaterialCheckbox.prototype['check'] = MaterialCheckbox.prototype.check;

/**
 * Uncheck checkbox.
 *
 * @public
 */
MaterialCheckbox.prototype.uncheck = function() {
  this.inputElement_.checked = false;
  this.updateClasses_();
};
MaterialCheckbox.prototype['uncheck'] = MaterialCheckbox.prototype.uncheck;
