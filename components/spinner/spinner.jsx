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

class MaterialSpinner extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {}
  componentDidMount() {}
  componentWillUnmount() {}

  componentWillReceiveProps(nextProps) {}
  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }
  componentWillUpdate(nextProps, nextState) {}
  componentDidUpdate(prevProps, prevState) {}
  render() {
    let classNames = [
      self.cssName,
      'is-upgraded'
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

    let layers = [];
    for (let i = 1; i <= this.Constant_.MDL_SPINNER_LAYER_COUNT; i++) {
      let circle = (
        <div className={[this.CssClasses_.MDL_SPINNER_CIRCLE].join(' ')}></div>
      );

      let leftClipper = (
        <div className={[this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER, this.CssClasses_.MDL_SPINNER_LEFT].join(' ')}>{circle}</div>
      );
      let gapPatch = (
        <div className={[this.CssClasses_.MDL_SPINNER_GAP_PATCH].join(' ')}>{circle}</div>
      );
      let rightClipper = (
        <div className={[this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER, this.CssClasses_.MDL_SPINNER_RIGHT].join(' ')}>{circle}</div>
      );

      let layer = (
        <div key={'layer-' + i} className={[this.CssClasses_.MDL_SPINNER_LAYER, this.CssClasses_.MDL_SPINNER_LAYER + '-' + i].join(' ')}>{leftClipper}{gapPatch}{rightClipper}</div>
      );

      layers.push(layer);
    }

    return (
      <div
        // HTML Button Attributes.
        className={classNameString}
        align={this.props.align}
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
      >{layers}</div>
    );
  }
}
const self = Components.MaterialSpinner = MaterialSpinner;

self.cssName = 'mdl-spinner';
self.propTypes = {
  "className": PropTypes.string
};
self.defaultProps = {
  "className": ""
};
self.classNames = {
  "active": "is-active",
  "singleColor": "mdl-spinner--single-color"
};
self.flagClassNames = ["active", "singleColor"];
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
MaterialSpinner.prototype.Constant_ = {
  MDL_SPINNER_LAYER_COUNT: 4
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 *
 * @enum {string}
 * @private
 */
MaterialSpinner.prototype.CssClasses_ = {
  MDL_SPINNER_LAYER: 'mdl-spinner__layer',
  MDL_SPINNER_CIRCLE_CLIPPER: 'mdl-spinner__circle-clipper',
  MDL_SPINNER_CIRCLE: 'mdl-spinner__circle',
  MDL_SPINNER_GAP_PATCH: 'mdl-spinner__gap-patch',
  MDL_SPINNER_LEFT: 'mdl-spinner__left',
  MDL_SPINNER_RIGHT: 'mdl-spinner__right'
};

/**
 * Auxiliary method to create a spinner layer.
 *
 * @param {number} index Index of the layer to be created.
 * @public
 */
MaterialSpinner.prototype.createLayer = function(index) {
  var layer = document.createElement('div');
  layer.classList.add(this.CssClasses_.MDL_SPINNER_LAYER);
  layer.classList.add(this.CssClasses_.MDL_SPINNER_LAYER + '-' + index);

  var leftClipper = document.createElement('div');
  leftClipper.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER);
  leftClipper.classList.add(this.CssClasses_.MDL_SPINNER_LEFT);

  var gapPatch = document.createElement('div');
  gapPatch.classList.add(this.CssClasses_.MDL_SPINNER_GAP_PATCH);

  var rightClipper = document.createElement('div');
  rightClipper.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE_CLIPPER);
  rightClipper.classList.add(this.CssClasses_.MDL_SPINNER_RIGHT);

  var circleOwners = [leftClipper, gapPatch, rightClipper];

  for (var i = 0; i < circleOwners.length; i++) {
    var circle = document.createElement('div');
    circle.classList.add(this.CssClasses_.MDL_SPINNER_CIRCLE);
    circleOwners[i].appendChild(circle);
  }

  layer.appendChild(leftClipper);
  layer.appendChild(gapPatch);
  layer.appendChild(rightClipper);

  this.element_.appendChild(layer);
};
MaterialSpinner.prototype['createLayer'] =
    MaterialSpinner.prototype.createLayer;

/**
 * Stops the spinner animation.
 * Public method for users who need to stop the spinner for any reason.
 *
 * @public
 */
MaterialSpinner.prototype.stop = function() {
  this.element_.classList.remove('is-active');
};
MaterialSpinner.prototype['stop'] = MaterialSpinner.prototype.stop;

/**
 * Starts the spinner animation.
 * Public method for users who need to manually start the spinner for any reason
 * (instead of just adding the 'is-active' class to their markup).
 *
 * @public
 */
MaterialSpinner.prototype.start = function() {
  this.element_.classList.add('is-active');
};
MaterialSpinner.prototype['start'] = MaterialSpinner.prototype.start;
