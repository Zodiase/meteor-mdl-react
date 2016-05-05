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
let { getClassList, makeArray, registerClassNameFlags } = Helers;

/**
 * MaterialTextfield
 * @version 1.1.1
 * @since 1.0.6
 * @see {@link https://github.com/jasonmayes/mdl-component-design-pattern}
 */
class MaterialTextfield extends Component {

  _upgrade() {
    if (this.element_) {

      if (this.input_) {
        this.input_.addEventListener('input', this.boundUpdateClassesHandler);
        this.input_.addEventListener('focus', this.boundFocusHandler);
        this.input_.addEventListener('blur', this.boundBlurHandler);
        this.input_.addEventListener('reset', this.boundResetHandler);
        if (this.state.maxRows !== this.Constant_.NO_MAX_ROWS) {
          // TODO: This should handle pasting multi line text.
          // Currently doesn't.
          this.input_.addEventListener('keydown', this.boundKeyDownHandler);
        }
        this.updateClasses_();
      }
    }
  }

  _downgrade() {
    if (this.element_) {

      if (this.input_) {
        this.input_.removeEventListener('input', this.boundUpdateClassesHandler);
        this.input_.removeEventListener('focus', this.boundFocusHandler);
        this.input_.removeEventListener('blur', this.boundBlurHandler);
        this.input_.removeEventListener('reset', this.boundResetHandler);
        this.input_.removeEventListener('keydown', this.boundKeyDownHandler);
      }
    }
  }

  _getStateFromProps(props) {
    let maxRows = parseInt(props.maxRows, 10);
    if (isNaN(maxRows)) {
      maxRows = this.Constant_.NO_MAX_ROWS;
    }

    return {
      inputValue: props.value,
      maxRows: maxRows,
      classList: getClassList(self, props)
    };
  }

  constructor(props) {
    super(props);

    this.state = this._getStateFromProps(props);

    this.boundUpdateClassesHandler = this.updateClasses_.bind(this);
    this.boundFocusHandler = this.onFocus_.bind(this);
    this.boundBlurHandler = this.onBlur_.bind(this);
    this.boundResetHandler = this.onReset_.bind(this);
    // TODO: This should handle pasting multi line text.
    // Currently doesn't.
    this.boundKeyDownHandler = this.onKeyDown_.bind(this);
  }

  //componentWillMount() {}
  componentDidMount() {
    this._upgrade();
    if (this.props.autoFocus) {
      this.element_.focus();
      this.checkFocus();
    }
  }
  componentWillUnmount() {
    this._downgrade();
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._getStateFromProps(nextProps));
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
      id,
      className,
      multiline,
      label,
      errorMessage,
      expandable,
      icon,
      // Must take `children` out.
      children,
      onChange,
      ...inputProps
    } = this.props;

    const inputId = `${id}__input`;

    let inputElement = null;
    if (multiline) {
      inputElement = (
        <textarea {...inputProps}
          key="input"
          id={inputId}
          className={this.CssClasses_.INPUT}
          value={this.state.inputValue}
          onChange={onChange.bind(this)}
          // Save reference.
          ref={(ref) => this.input_ = ref}
        />
      );
    } else {
      inputElement = (
        <input {...inputProps}
          key="input"
          id={inputId}
          className={this.CssClasses_.INPUT}
          value={this.state.inputValue}
          onChange={onChange.bind(this)}
          // Save reference.
          ref={(ref) => this.input_ = ref}
        />
      );
    }

    let labelElement = (
      <label
        key="label"
        className={this.CssClasses_.LABEL}
        htmlFor={inputId}
        // Save reference.
        ref={(ref) => this.label_ = ref}
      >{label}</label>
    );

    let errMsgElement = null;
    if (errorMessage) {
      errMsgElement = (
        <span
          key="message"
          className="mdl-textfield__error"
        >{errorMessage}</span>
      );
    }

    let coreElements = [
      inputElement,
      labelElement,
      errMsgElement
    ];

    let content;
    if (expandable) {
      content = [];
      content.push(
        <Components.MaterialButton icon
          key="toggle"
          htmlFor={inputId}
        ><i className="material-icons">{icon}</i></Components.MaterialButton>
      );
      content.push(
        <div
          key="holder"
          className="mdl-textfield__expandable-holder"
        >{coreElements}</div>
      );
    } else {
      content = coreElements;
    }

    return (
      <div
        id={id}
        className={this.state.classList.join(' ')}
        // Save reference.
        ref={(ref) => this.element_ = ref}
      >{content}</div>
    );
  }
}
const self = Components.MaterialTextfield = MaterialTextfield;

self.cssName = 'mdl-textfield';
self.propTypes = {
  "className": PropTypes.string,
  "id": PropTypes.string.isRequired,
  "type": PropTypes.oneOf([
    // Pickers
    'color', 'date', 'datetime-local', 'month', 'number', 'time', 'week',
    // Text
    'datetime', 'email', 'password', 'search', 'tel', 'text', 'url'
  ]).isRequired,
  "multiline": PropTypes.bool,
  "label": PropTypes.string,
  "pattern": PropTypes.string,
  "errorMessage": PropTypes.string,
  "icon": PropTypes.string,
  "autoFocus": PropTypes.bool,
  "maxRows": PropTypes.number,
  "maxLength": PropTypes.string,
  "onChange": PropTypes.func.isRequired,
  "value": PropTypes.string
};
self.defaultProps = {
  "className": "",
  "type": "text",
  "maxRows": -1,
  "onChange": function(event) {
    this.setState({
      "inputValue": event.target.value
    });
  }
};
registerClassNameFlags(self, {
  "floatingLabel": "mdl-textfield--floating-label",
  "expandable": "mdl-textfield--expandable"
});

// Code from MDL.

/**
 * Store constants in one place so they can be updated easily.
 *
 * @enum {string | number}
 * @private
 */
MaterialTextfield.prototype.Constant_ = {
  NO_MAX_ROWS: -1,
  MAX_ROWS_ATTRIBUTE: 'maxrows'
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 *
 * @enum {string}
 * @private
 */
MaterialTextfield.prototype.CssClasses_ = {
  LABEL: 'mdl-textfield__label',
  INPUT: 'mdl-textfield__input',
  IS_DIRTY: 'is-dirty',
  IS_FOCUSED: 'is-focused',
  IS_DISABLED: 'is-disabled',
  IS_INVALID: 'is-invalid',
  IS_UPGRADED: 'is-upgraded'
};

/**
 * Handle input being entered.
 *
 * @param {Event} event The event that fired.
 * @private
 */
MaterialTextfield.prototype.onKeyDown_ = function(event) {
  var currentRowCount = event.target.value.split('\n').length;
  if (event.keyCode === 13) {
    if (currentRowCount >= this.maxRows) {
      event.preventDefault();
    }
  }
};

/**
 * Handle focus.
 *
 * @param {Event} event The event that fired.
 * @private
 */
MaterialTextfield.prototype.onFocus_ = function(event) {
  this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
};

/**
 * Handle lost focus.
 *
 * @param {Event} event The event that fired.
 * @private
 */
MaterialTextfield.prototype.onBlur_ = function(event) {
  this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
};

/**
 * Handle reset event from out side.
 *
 * @param {Event} event The event that fired.
 * @private
 */
MaterialTextfield.prototype.onReset_ = function(event) {
  this.updateClasses_();
};

/**
 * Handle class updates.
 *
 * @private
 */
MaterialTextfield.prototype.updateClasses_ = function() {
  this.checkDisabled();
  this.checkValidity();
  this.checkDirty();
  this.checkFocus();
};

// Public methods.

/**
 * Check the disabled state and update field accordingly.
 *
 * @public
 */
MaterialTextfield.prototype.checkDisabled = function() {
  if (this.input_.disabled) {
    this.element_.classList.add(this.CssClasses_.IS_DISABLED);
  } else {
    this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
  }
};
MaterialTextfield.prototype['checkDisabled'] =
    MaterialTextfield.prototype.checkDisabled;

/**
* Check the focus state and update field accordingly.
*
* @public
*/
MaterialTextfield.prototype.checkFocus = function() {
  if (Boolean(this.element_.querySelector(':focus'))) {
    this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
  } else {
    this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
  }
};
MaterialTextfield.prototype['checkFocus'] =
  MaterialTextfield.prototype.checkFocus;

/**
 * Check the validity state and update field accordingly.
 *
 * @public
 */
MaterialTextfield.prototype.checkValidity = function() {
  if (this.input_.validity) {
    if (this.input_.validity.valid) {
      this.element_.classList.remove(this.CssClasses_.IS_INVALID);
    } else {
      this.element_.classList.add(this.CssClasses_.IS_INVALID);
    }
  }
};
MaterialTextfield.prototype['checkValidity'] =
    MaterialTextfield.prototype.checkValidity;

/**
 * Check the dirty state and update field accordingly.
 *
 * @public
 */
MaterialTextfield.prototype.checkDirty = function() {
  if (this.input_.value && this.input_.value.length > 0) {
    this.element_.classList.add(this.CssClasses_.IS_DIRTY);
  } else {
    this.element_.classList.remove(this.CssClasses_.IS_DIRTY);
  }
};
MaterialTextfield.prototype['checkDirty'] =
    MaterialTextfield.prototype.checkDirty;

/**
 * Disable text field.
 *
 * @public
 */
MaterialTextfield.prototype.disable = function() {
  this.input_.disabled = true;
  this.updateClasses_();
};
MaterialTextfield.prototype['disable'] = MaterialTextfield.prototype.disable;

/**
 * Enable text field.
 *
 * @public
 */
MaterialTextfield.prototype.enable = function() {
  this.input_.disabled = false;
  this.updateClasses_();
};
MaterialTextfield.prototype['enable'] = MaterialTextfield.prototype.enable;

/**
 * Update text field value.
 *
 * @param {string} value The value to which to set the control (optional).
 * @public
 */
MaterialTextfield.prototype.change = function(value) {

  this.input_.value = value || '';
  this.updateClasses_();
};
MaterialTextfield.prototype['change'] = MaterialTextfield.prototype.change;
