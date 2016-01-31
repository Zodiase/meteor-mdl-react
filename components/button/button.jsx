let { Component, PropTypes } = React;

class MaterialButton extends Component {

  _bindRipple() {
    if (this.element_ && this.ripple_) {
      this.ripple_.bindElement(this.element_);
    }
  }

  constructor(props) {
    super(props);
    this.boundButtonBlurHandler = this.blurHandler_.bind(this);
    this.boundRippleBlurHandler = this.blurHandler_.bind(this);
  }

  componentWillMount() {}
  componentDidMount() {
    this._bindRipple();
  }
  componentWillUnmount() {}

  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentWillUpdate(nextProps, nextState) {}
  componentDidUpdate(prevProps, prevState) {
    this._bindRipple();
  }
  render() {
    // Reset references.
    this.ripple_ = null;
    this.element_ = null;

    let classNames = [
      self.cssName
    ];
    // Add flag classNames.
    for (let flagClassName of self.flagClassNames) {
      if (this.props[flagClassName]) {
        classNames.push(self.classNames[flagClassName]);
      }
    }
    let classNameString = classNames.join(" ");

    let rippleContainer = null;
    if (this.props.ripple) {
      rippleContainer = (
        <Components.Ripple
          onMouseUp={this.boundRippleBlurHandler}
          ref={(ref) => this.ripple_ = ref}
        />
      );
    }

    return (
      <button
        className={classNameString}
        htmlFor={this.props.htmlFor}
        onClick={this.props.onClick}
        onMouseUp={this.boundButtonBlurHandler}
        onMouseLeave={this.boundButtonBlurHandler}
        ref={(ref) => this.element_ = ref}
      >{rippleContainer}{this.props.children}</button>);
  }

}
const self = Components.Button = MaterialButton;

self.cssName = 'mdl-button';
self.propTypes = {
  "children": PropTypes.any.isRequired
};
self.defaultProps = {};
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
