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
 * @see {@link https://github.com/jasonmayes/mdl-component-design-pattern}
 */
class MaterialTabs extends Component {

  _tabSelectHandler(tabId) {
    this.setState({
      activeTabId: tabId
    });
  }

  _getStateFromProps(props) {
    // Set the active tab ID by the default tab ID.
    return {
      activeTabId: props.defaultTabId
    };
  }

  constructor(props) {
    super(props);

    this.boundTabSelectHandler = this._tabSelectHandler.bind(this);

    this.state = this._getStateFromProps(props);
  }
  componentWillReceiveProps(nextProps) {
    this.setState(this._getStateFromProps(nextProps));
  }
  //shouldComponentUpdate(nextProps, nextState) {
  //  return true;
  //}
  render() {
    let {
      ripple,
      children,
      ...props
    } = this.props;

    // Ensure children is an array.
    if (!Array.isArray(children)) {
      children = [children];
    }

    // Reset references.
    this.element_ = null;

    let flaggedClassNames = [];
    // Add flag classNames.
    for (let name of self.flagClassNames) {
      if (this.props[name]) {
        flaggedClassNames.push(self.classNames[name]);
      }
    }

    let baseClasses = [self.cssName, this.CssClasses_.UPGRADED_CLASS];
    // @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/tabs/tabs.js#L74}
    if (ripple) {
      baseClasses.push(this.CssClasses_.MDL_JS_RIPPLE_EFFECT_IGNORE_EVENTS);
    }
    props.className = self._joinClassNames(baseClasses, props.className, flaggedClassNames);

    // Need to find the tab bar.
    let tabBar = null;

    // Replace placeholders for tab bar, tabs, tab panels with real ones.
    // Do not change order.
    children = children.map((element, index) => {
      switch (element.type) {
        case self.TabBar:
          if (tabBar) {
            throw new RangeError('Can not have multiple tab bars.');
          }
          return tabBar = (
            <RealTabBar {...element.props}
              cssClasses={this.CssClasses_}
              onTabSelect={this.boundTabSelectHandler}
              activeTabId={this.state.activeTabId}
              ripple={ripple}
              key='tab-bar'
            />
          );
          break;
        case self.Panel:
          return (
            <RealPanel {...element.props}
              cssClasses={this.CssClasses_}
              activeTabId={this.state.activeTabId}
              key={'child_' + index}
            />
          );
          break;
        case self.Tab:
          //! Warn about putting tabs outside of tab bar?
          return element;
          break;
        default:
          return element;
          break;
      }
    });

    // Tab bar must exist.
    if (!tabBar) {
      throw new Error('Can not find the tab bar.');
    }

    return (
      <div {...props}
        ref={(ref) => this.element_ = ref}
      >{children}</div>
    );
  }
}
const self = Components.MaterialTabs = MaterialTabs;

self.cssName = 'mdl-tabs';
self.propTypes = {
  "className": PropTypes.string.isRequired,
  "defaultTabId": PropTypes.string,
  "ripple": PropTypes.bool.isRequired,
  "children": PropTypes.any.isRequired
};
self.defaultProps = {
  "className": "",
  "ripple": false,
  "children": []
};
self.classNames = {};
self.flagClassNames = [];
for (let flagClassName of self.flagClassNames) {
  self.propTypes[flagClassName] = PropTypes.bool;
}
self._joinClassNames = (extraBase, currentClassName = '', extraMore = []) => {
  return [
    ...extraBase,
    ...(String(currentClassName).split(' ')),
    ...extraMore
  ].filter((name) => String(name).length > 0).join(' ');
};

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

// Placeholder. Does nothing. Real magic happens in RealTabBar.
class TabBar extends Component {render() {return null;}}
self.TabBar = TabBar;
self.TabBar.propTypes = {
  "className": PropTypes.string.isRequired,
  "children": PropTypes.any.isRequired
};
self.TabBar.defaultProps = {
  "className": "",
  "children": []
};

class RealTabBar extends TabBar {
  constructor(props) {
    super(props);

    if (typeof props.onTabSelect !== 'function') {
      throw new TypeError('Invalid onTabSelect.');
    }
    this.onTabSelect_ = props.onTabSelect;
  }
  render() {
    let {
      cssClasses,
      activeTabId,
      ripple,
      children,
      ...tabBarProps
    } = this.props;

    // Ensure children is an array.
    if (!Array.isArray(children)) {
      children = [children];
    }

    // Reset references.
    this.element_ = null;
    this.tabs_ = {};
    this.ripples_ = {};

    let baseClasses = [cssClasses.TABBAR_CLASS];
    tabBarProps.className = self._joinClassNames(baseClasses, tabBarProps.className);

    // Replace tabs placeholders with real tabs.
    // Do not change order.
    children = children.map((element, index) => {
      switch (element.type) {
        case self.TabBar:
          //! Warn about putting tab bar inside of tab bar?
          return element;
          break;
        case self.Panel:
          //! Warn about putting tab panel inside of tab bar?
          return element;
          break;
        case self.Tab:
          // Create the real tab.
          return (
            <RealTab {...element.props}
              cssClasses={cssClasses}
              onTabSelect={this.onTabSelect_}
              activeTabId={activeTabId}
              ripple={ripple}
              key={'child_' + index}
            />
          );
          break;
        default:
          return element;
          break;
      }
    });

    tabBarProps.key = tabBarProps.key || 'tab-bar';

    return tabBar = (
      <div {...tabBarProps}
        ref={(ref) => this.element_ = ref}
      >{children}</div>
    );
  }
}

// Placeholder. Does nothing. Real magic happens in RealTab.
class Tab extends Component {render() {return null;}}
self.Tab = Tab;
self.Tab.propTypes = {
  "className": PropTypes.string.isRequired,
  "tabId": PropTypes.string.isRequired,
  "children": PropTypes.any.isRequired
};
self.Tab.defaultProps = {
  "className": "",
  "children": []
};

// @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/tabs/tabs.js#L130}
class RealTab extends Tab {

  _upgrade() {
    if (this.element_) {
      // @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/tabs/tabs.js#L142}
      this.element_.addEventListener('click', this.boundTabClickHandler); //x

      if (this.ripple_) {
        this.ripple_.bindElement(this.element_); //x
      }
    }
  }

  _downgrade() {
    if (this.element_) {
      this.element_.removeEventListener('click', this.boundTabClickHandler); //x

      if (this.ripple_) {
        this.ripple_.unbindElement(); //x
      }
    }
  }

  constructor(props) {
    super(props);

    if (typeof props.onTabSelect !== 'function') {
      throw new TypeError('Invalid onTabSelect.');
    }
    this.onTabSelect_ = props.onTabSelect;

    this.tabId_ = props.tabId;

    this.boundTabClickHandler = function(e) {
      e.preventDefault();
      this.onTabSelect_(this.tabId_);
    }.bind(this);
  }
  componentDidMount() {
    this._upgrade();
  }
  componentWillUnmount() {
    this._downgrade();
  }

  componentWillUpdate(nextProps, nextState) {
    this._downgrade();
  }
  componentDidUpdate(prevProps, prevState) {
    this._upgrade();
  }
  render() {
    let {
      cssClasses,
      // @type {String}
      activeTabId,
      // @type {Boolean}
      ripple,
      // @type {String}
      tabId,
      children,
      ...tabProps
    } = this.props;

    // Ensure children is an array.
    if (!Array.isArray(children)) {
      children = [children];
    }

    // Reset references.
    this.element_ = null;
    this.ripple_ = null;

    let baseClasses = [cssClasses.TAB_CLASS];
    if (tabId === activeTabId) {
      baseClasses.push(cssClasses.ACTIVE_CLASS);
    }
    tabProps.className = self._joinClassNames(baseClasses, tabProps.className);

    // Create ripple if requested.
    let rippleContainer = null;
    if (ripple) {
      rippleContainer = (
        <Components.MaterialRipple
          cssName={cssClasses.MDL_RIPPLE_CONTAINER}
          ref={(ref) => this.ripple_ = ref}
        />
      );
    }

    tabProps.href = '#';
    tabProps['data-tabid'] = tabId;

    return (
      <a {...tabProps}
        ref={(ref) => this.element_ = ref}
      >{children}{rippleContainer}</a>
    );
  }
}

// Placeholder. Does nothing. Real magic happens in RealPanel.
class Panel extends Component {render() {return null;}}
self.Panel = Panel;
self.Panel.propTypes = {
  "className": PropTypes.string.isRequired,
  "tabId": PropTypes.string.isRequired,
  "children": PropTypes.any.isRequired
};
self.Panel.defaultProps = {
  "className": "",
  "children": []
};

class RealPanel extends Panel {
  render() {
    let {
      cssClasses,
      activeTabId,
      tabId,
      ...panelProps
    } = this.props;

    let baseClasses = [cssClasses.PANEL_CLASS];
    if (tabId === activeTabId) {
      baseClasses.push(cssClasses.ACTIVE_CLASS);
    }
    panelProps.className = self._joinClassNames(baseClasses, panelProps.className);

    return (
      <div {...panelProps} />
    );
  }
}