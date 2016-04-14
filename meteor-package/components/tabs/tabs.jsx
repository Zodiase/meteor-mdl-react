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
 * MaterialTabs
 * @version 1.1.3
 * @since 1.1.3
 */

class MaterialTabs extends Component {

  _joinClassNames(extraBase, currentClassName = '', extraMore = []) {
    return [
      ...extraBase,
      ...(String(currentClassName).split(' ')),
      ...extraMore
    ].filter((name) => String(name).length > 0).join(' ');
  }

  _getStateFromProps(props) {
    // Set the active tab ID by the default tab ID.
    return {
      activeTabId: props.defaultTabId
    };
  }

  constructor(props) {
    super(props);

    this.state = this._getStateFromProps(props);
  }

  render() {
    let {
      className,
      children,
      ...props
    } = this.props;

    // Ensure children is an array.
    if (!Array.isArray(children)) {
      children = [children];
    }

    // Reset references.
    this.element_ = null;
    this.tabBar_ = null;
    this.tabs_ = [];
    this.panels = [];

    let flaggedClassNames = [];
    // Add flag classNames.
    for (let name of self.flagClassNames) {
      if (this.props[name]) {
        flaggedClassNames.push(self.classNames[name]);
      }
    }

    let classNameString = this._joinClassNames([self.cssName], className, flaggedClassNames);

    // Pick out the tab bar, tabs, tab panels and leave the rest.
    let tabBar = null,
        panels = [];
    children = children.filter(function (element) {
      switch (element.type) {
        case self.TabBar:
          tabBar = element;
          return false;
          break;
        case self.Panel:
          panels.push(element);
          return false;
          break;
        case self.Tab:
          //! Warn about putting tabs outside of tab bar.
          return true;
          break;
        default:
          return true;
          break;
      }
    });
    console.info('filtered children', children);

    // Tab bar must exist.
    if (!tabBar) {
      throw new Error('Can not find the tab bar.');
    }
    let {children: tabBarChildren, ...tabBarProps} = {...tabBar.props};
    tabBarProps.className = this._joinClassNames([this.CssClasses_.TABBAR_CLASS], tabBarProps.className || '');
    // Replace tabs placeholders with real tabs.
    // Do not change order.
    tabBarChildren = tabBarChildren.map((element, index) => {
      switch (element.type) {
        case self.TabBar:
          //! Warn about putting tab bar inside of tab bar.
          return element;
          break;
        case self.Panel:
          //! Warn about putting tab panel inside of tab bar.
          return element;
          break;
        case self.Tab:
          //! Create the real tab.
          let {
            ...tabProps
          } = element.props;
          tabProps.className = this._joinClassNames([this.CssClasses_.TAB_CLASS], tabProps.className);
          const realTab = (
            <a {...tabProps}
              key={'child_' + index}
              href="#"
            />
          );
          return realTab;
          break;
        default:
          return element;
          break;
      }
    });

    tabBar = (
      <div {...tabBarProps}
        ref={(ref) => this.tabBar_ = ref}
      >{tabBarChildren}</div>
    );

    //!
    return (
      <div
        key="tabs"
        className={classNameString}
        ref={(ref) => this.element_ = ref}
      >{tabBar}{panels}</div>
    );
  }
}
const self = Components.MaterialTabs = MaterialTabs;

self.cssName = 'mdl-tabs';
self.propTypes = {
  "className": PropTypes.string.isRequired,
  "children": PropTypes.any.isRequired
};
self.defaultProps = {
  "className": "",
  "children": []
};
self.classNames = {
/*
  "colored": "mdl-button--colored",
  "raised": "mdl-button--raised",
  "primary": "mdl-button--primary",
  "accent": "mdl-button--accent",
  "fab": "mdl-button--fab",
  "icon": "mdl-button--icon"
*/
};
self.flagClassNames = [/* "colored", "raised", "primary", "accent", "fab", "icon" */];
for (let flagClassName of self.flagClassNames) {
  self.propTypes[flagClassName] = PropTypes.bool;
}

// Code from MDL.

/**
 * Store constants in one place so they can be updated easily.
 *
 * @enum {string}
 * @private
 */
MaterialTabs.prototype.Constant_ = {
  // None at the moment.
};

/**
 * Store strings for class names defined by this component that are used in
 * JavaScript. This allows us to simply change it in one place should we
 * decide to modify at a later date.
 *
 * @enum {string}
 * @private
 */
MaterialTabs.prototype.CssClasses_ = {
  TABBAR_CLASS: 'mdl-tabs__tab-bar',
  TAB_CLASS: 'mdl-tabs__tab',
  PANEL_CLASS: 'mdl-tabs__panel',
  ACTIVE_CLASS: 'is-active',
  UPGRADED_CLASS: 'is-upgraded',

  MDL_JS_RIPPLE_EFFECT: 'mdl-js-ripple-effect',
  MDL_RIPPLE_CONTAINER: 'mdl-tabs__ripple-container',
  MDL_RIPPLE: 'mdl-ripple',
  MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS: 'mdl-js-ripple-effect--ignore-events'
};

/**
 * Handle clicks to a tabs component
 *
 * @private
 */
MaterialTabs.prototype.initTabs_ = function() {
  if (this.element_.classList.contains(this.CssClasses_.MDL_JS_RIPPLE_EFFECT)) {
    this.element_.classList.add(
      this.CssClasses_.MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS);
  }

  // Select element tabs, document panels
  this.tabs_ = this.element_.querySelectorAll('.' + this.CssClasses_.TAB_CLASS);
  this.panels_ =
      this.element_.querySelectorAll('.' + this.CssClasses_.PANEL_CLASS);

  // Create new tabs for each tab element
  for (var i = 0; i < this.tabs_.length; i++) {
    new MaterialTab(this.tabs_[i], this);
  }

  this.element_.classList.add(this.CssClasses_.UPGRADED_CLASS);
};

/**
 * Reset tab state, dropping active classes
 *
 * @private
 */
MaterialTabs.prototype.resetTabState_ = function() {
  for (var k = 0; k < this.tabs_.length; k++) {
    this.tabs_[k].classList.remove(this.CssClasses_.ACTIVE_CLASS);
  }
};

/**
 * Reset panel state, droping active classes
 *
 * @private
 */
MaterialTabs.prototype.resetPanelState_ = function() {
  for (var j = 0; j < this.panels_.length; j++) {
    this.panels_[j].classList.remove(this.CssClasses_.ACTIVE_CLASS);
  }
};

/**
 * Initialize element.
 */
MaterialTabs.prototype.init = function() {
  if (this.element_) {
    this.initTabs_();
  }
};

// Placeholder. Does nothing. Real magic happens in MaterialTabs.
class TabBar extends Component {render() {return null;}}
self.TabBar = TabBar;

// Placeholder. Does nothing. Real magic happens in MaterialTabs.
class Tab extends Component {render() {return null;}}
self.Tab = Tab;

// Placeholder. Does nothing. Real magic happens in MaterialTabs.
class Panel extends Component {render() {return null;}}
self.Panel = Panel;