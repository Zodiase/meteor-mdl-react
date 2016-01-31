let { Component, PropTypes } = React;

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
    }
  }

  constructor(props) {
    super(props);
    this.boundButtonBlurHandler = this.blurHandler_.bind(this);
    this.boundRippleBlurHandler = this.blurHandler_.bind(this);
  }

  componentWillMount() {}
  componentDidMount() {
    this._upgrade();
  }
  componentWillUnmount() {
    this._downgrade();
  }

  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    this._downgrade();
  }
  componentDidUpdate(prevProps, prevState) {
    this._upgrade();
  }
  render() {
    // Reset references.
    this.ripple_ = null;
    this.element_ = null;

    let classNames = [
      self.cssName
    ];
    // Add classNames passed in.
    let passedInClassNames = String(this.props.className).split(' ');
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

    let rippleContainer = null;
    if (this.props.ripple) {
      rippleContainer = (
        <Components.MaterialRipple
          onMouseUp={this.boundRippleBlurHandler}
          ref={(ref) => this.ripple_ = ref}
        />
      );
    }

    return (
      <button
        // HTML Button Attributes.
        className={classNameString}
        autofocus={this.props.autofocus}
        disabled={this.props.disabled}
        form={this.props.form}
        formaction={this.props.formaction}
        formenctype={this.props.formenctype}
        formmethod={this.props.formmethod}
        formnovalidate={this.props.formnovalidate}
        formtarget={this.props.formtarget}
        name={this.props.name}
        type={this.props.type}
        value={this.props.value}
        // HTML Global Attributes.
        accesskey={this.props.accesskey}
        contenteditable={this.props.contenteditable}
        contextmenu={this.props.contextmenu}
        dir={this.props.dir}
        draggable={this.props.draggable}
        dropzone={this.props.dropzone}
        hidden={this.props.hidden}
        id={this.props.id}
        lang={this.props.lang}
        spellcheck={this.props.spellcheck}
        style={this.props.style}
        tabindex={this.props.tabindex}
        title={this.props.title}
        translate={this.props.translate}
        // Clipboard Events.
        onCopy={this.props.onCopy}
        onCut={this.props.onCut}
        onPaste={this.props.onPaste}
        // Composition Events.
        onCompositionEnd={this.props.onCompositionEnd}
        onCompositionStart={this.props.onCompositionStart}
        onCompositionUpdate={this.props.onCompositionUpdate}
        // Keyboard Events.
        onKeyDown={this.props.onKeyDown}
        onKeyPress={this.props.onKeyPress}
        onKeyUp={this.props.onKeyUp}
        // Focus Events.
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
        // Form Events.
        onChange={this.props.onChange}
        onInput={this.props.onInput}
        onSubmit={this.props.onSubmit}
        // Mouse Events.
        onClick={this.props.onClick}
        onContextMenu={this.props.onContextMenu}
        onDoubleClick={this.props.onDoubleClick}
        onDrag={this.props.onDrag}
        onDragEnd={this.props.onDragEnd}
        onDragEnter={this.props.onDragEnter}
        onDragExit={this.props.onDragExit}
        onDragLeave={this.props.onDragLeave}
        onDragOver={this.props.onDragOver}
        onDragStart={this.props.onDragStart}
        onDrop={this.props.onDrop}
        onMouseDown={this.props.onMouseDown}
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onMouseMove={this.props.onMouseMove}
        onMouseOut={this.props.onMouseOut}
        onMouseOver={this.props.onMouseOver}
        onMouseUp={this.props.onMouseUp}
        // Selection Events.
        onSelect={this.props.onSelect}
        // Touch Events.
        onTouchCancel={this.props.onTouchCancel}
        onTouchEnd={this.props.onTouchEnd}
        onTouchMove={this.props.onTouchMove}
        onTouchStart={this.props.onTouchStart}
        // UI Events.
        onScroll={this.props.onScroll}
        // Wheel Events.
        onWheel={this.props.onWheel}
        // Media Events.
        onAbort={this.props.onAbort}
        onCanPlay={this.props.onCanPlay}
        onCanPlayThrough={this.props.onCanPlayThrough}
        onDurationChange={this.props.onDurationChange}
        onEmptied={this.props.onEmptied}
        onEncrypted={this.props.onEncrypted}
        onEnded={this.props.onEnded}
        onError={this.props.onError}
        onLoadedData={this.props.onLoadedData}
        onLoadedMetadata={this.props.onLoadedMetadata}
        onLoadStart={this.props.onLoadStart}
        onPause={this.props.onPause}
        onPlay={this.props.onPlay}
        onPlaying={this.props.onPlaying}
        onProgress={this.props.onProgress}
        onRateChange={this.props.onRateChange}
        onSeeked={this.props.onSeeked}
        onSeeking={this.props.onSeeking}
        onStalled={this.props.onStalled}
        onSuspend={this.props.onSuspend}
        onTimeUpdate={this.props.onTimeUpdate}
        onVolumeChange={this.props.onVolumeChange}
        onWaiting={this.props.onWaiting}
        // Image Events.
        onLoad={this.props.onLoad}
        onError={this.props.onError}
        // Save reference.
        ref={(ref) => this.element_ = ref}
      >{rippleContainer}{this.props.children}</button>);
  }

}
const self = Components.MaterialButton = MaterialButton;

self.cssName = 'mdl-button';
self.propTypes = {
  "className": PropTypes.string,
  "disabled": PropTypes.bool,
  "children": PropTypes.any.isRequired
};
self.defaultProps = {
  "className": "",
  "disabled": false
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
