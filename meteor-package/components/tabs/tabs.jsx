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

  _upgrade() {
    if (this.element_ && this.tabBar_) {
      // @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/tabs/tabs.js#L142}
      $(this.tabBar_).on('click', `.${this.CssClasses_.TAB_CLASS}`, this.boundTabClickHandler); //x

      const tabIndices = Object.keys(this.tabs_);
      while (tabIndices.length > 0) {
        const tabIndex = tabIndices.shift();
        this.ripples_[tabIndex].bindElement(this.tabs_[tabIndex]); //x
      }
    }
  }

  _downgrade() {
    if (this.element_ && this.tabBar_) {
      $(this.tabBar_).off('click', `.${this.CssClasses_.TAB_CLASS}`, this.boundTabClickHandler); //x

      const tabIndices = Object.keys(this.tabs_);
      while (tabIndices.length > 0) {
        const tabIndex = tabIndices.shift();
        this.ripples_[tabIndex].unbindElement(); //x
      }
    }
  }

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

    this.boundTabClickHandler = function(e) {
      const target = e.currentTarget;
      if (target && target.classList &&
          target.classList.contains(this.CssClasses_.TAB_CLASS)) {
        const tabId = target.getAttribute('data-tabid');
        if (tabId) {
          e.preventDefault();
          this.setState({
            activeTabId: tabId
          });
        }
      }
      return true;
    }.bind(this);

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
    this.tabBar_ = null;
    this.tabs_ = {};
    this.ripples_ = {};
    this.panels = [];

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
    props.className = this._joinClassNames(baseClasses, props.className, flaggedClassNames);

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

          let {
            children: tabBarChildren,
            ...tabBarProps
          } = element.props;
          tabBarProps.className = this._joinClassNames([this.CssClasses_.TABBAR_CLASS], tabBarProps.className || '');
          // Replace tabs placeholders with real tabs.
          // Do not change order.
          tabBarChildren = tabBarChildren.map((element, index) => {
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
                // @see {@link https://github.com/google/material-design-lite/blob/v1.1.3/src/tabs/tabs.js#L130}
                let {
                  tabId,
                  children,
                  ...tabProps
                } = element.props;
                let baseClasses = [this.CssClasses_.TAB_CLASS];
                if (tabId === this.state.activeTabId) {
                  baseClasses.push(this.CssClasses_.ACTIVE_CLASS);
                }
                tabProps.className = this._joinClassNames(baseClasses, tabProps.className);

                // Create ripple if requested.
                let rippleContainer = null;
                if (ripple) {
                  rippleContainer = (
                    <Components.MaterialRipple
                      cssName={this.CssClasses_.MDL_RIPPLE_CONTAINER}
                      ref={(ref) => this.ripples_[index] = ref}
                    />
                  );
                }

                tabProps.key = tabProps.key || ('child_' + index);
                tabProps.href = '#';
                tabProps['data-tabid'] = tabId;

                const realTab = (
                  <a {...tabProps}
                    ref={(ref) => this.tabs_[index] = ref}
                  >{children}{rippleContainer}</a>
                );
                return realTab;
                break;
              default:
                return element;
                break;
            }
          });

          tabBarProps.key = tabBarProps.key || 'tab-bar';

          return tabBar = (
            <div {...tabBarProps}
              ref={(ref) => this.tabBar_ = ref}
            >{tabBarChildren}</div>
          );
          break;
        case self.Panel:
          let {
            tabId,
            children: panelChildren,
            ...panelProps
          } = element.props;
          let baseClasses = [this.CssClasses_.PANEL_CLASS];
          if (tabId === this.state.activeTabId) {
            baseClasses.push(this.CssClasses_.ACTIVE_CLASS);
          }
          panelProps.className = this._joinClassNames(baseClasses, panelProps.className || '');

          panelProps.key = panelProps.key || ('child_' + index);

          return (
            <div {...panelProps}>{panelChildren}</div>
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

    props.key = props.key || 'tabs';

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

// Placeholder. Does nothing. Real magic happens in MaterialTabs.
class TabBar extends Component {render() {return null;}}
self.TabBar = TabBar;

// Placeholder. Does nothing. Real magic happens in MaterialTabs.
class Tab extends Component {render() {return null;}}
self.Tab = Tab;

// Placeholder. Does nothing. Real magic happens in MaterialTabs.
class Panel extends Component {render() {return null;}}
self.Panel = Panel;