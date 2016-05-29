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
let { getClassList, makeArray } = Helers;

/**
 * MaterialCard
 * @version 1.1.3
 * @since 1.1.3
 * @see {@link https://github.com/jasonmayes/mdl-component-design-pattern}
 */
class MaterialCard extends Component {

  _getStateFromProps(props) {
    const classList = getClassList(self, props);

    return {
      classList
    };
  }

  constructor(props) {
    super(props);

    this.state = this._getStateFromProps(props);
  }
  componentWillReceiveProps(nextProps) {
    this.setState(this._getStateFromProps(nextProps));
  }
  render() {
    let {
      children,
      ...props
    } = this.props;

    return (
      <div {...props}
        className={this.state.classList.join(' ')}
        ref={(ref) => this.element_ = ref}
      >{children}</div>
    );
  }
}
const self = Components.MaterialCard = MaterialCard;

self.cssName = 'mdl-card';
self.propTypes = {
  "className": PropTypes.string.isRequired,
  "children": PropTypes.any.isRequired
};
self.defaultProps = {
  "className": "",
  "children": []
};

class Title extends Component {

  _getStateFromProps(props) {
    const classList = getClassList(self.Title, props);

    return {
      classList
    };
  }

  constructor(props) {
    super(props);

    this.state = this._getStateFromProps(props);
  }
  componentWillReceiveProps(nextProps) {
    this.setState(this._getStateFromProps(nextProps));
  }
  render() {
    let {
      children,
      ...props
    } = this.props;

    return (
      <div {...props}
        className={this.state.classList.join(' ')}
        ref={(ref) => this.element_ = ref}
      >{children}</div>
    );
  }
}
self.Title = Title;
self.Title.cssName = 'mdl-card__title';
self.Title.propTypes = {
  "className": PropTypes.string.isRequired,
  "children": PropTypes.any.isRequired
};
self.Title.defaultProps = {
  "className": "",
  "children": []
};

class Media extends Component {

  _getStateFromProps(props) {
    const classList = getClassList(self.Media, props);

    return {
      classList
    };
  }

  constructor(props) {
    super(props);

    this.state = this._getStateFromProps(props);
  }
  componentWillReceiveProps(nextProps) {
    this.setState(this._getStateFromProps(nextProps));
  }
  render() {
    let {
      children,
      ...props
    } = this.props;

    return (
      <div {...props}
        className={this.state.classList.join(' ')}
        ref={(ref) => this.element_ = ref}
      >{children}</div>
    );
  }
}
self.Media = Media;
self.Media.cssName = 'mdl-card__media';
self.Media.propTypes = {
  "className": PropTypes.string.isRequired,
  "children": PropTypes.any.isRequired
};
self.Media.defaultProps = {
  "className": "",
  "children": []
};

class Text extends Component {

  _getStateFromProps(props) {
    const classList = getClassList(self.Text, props);

    return {
      classList
    };
  }

  constructor(props) {
    super(props);

    this.state = this._getStateFromProps(props);
  }
  componentWillReceiveProps(nextProps) {
    this.setState(this._getStateFromProps(nextProps));
  }
  render() {
    let {
      children,
      ...props
    } = this.props;

    return (
      <div {...props}
        className={this.state.classList.join(' ')}
        ref={(ref) => this.element_ = ref}
      >{children}</div>
    );
  }
}
self.Text = Text;
self.Text.cssName = 'mdl-card__supporting-text';
self.Text.propTypes = {
  "className": PropTypes.string.isRequired,
  "children": PropTypes.any.isRequired
};
self.Text.defaultProps = {
  "className": "",
  "children": []
};

class Actions extends Component {

  _getStateFromProps(props) {
    const classList = getClassList(self.Actions, props);

    return {
      classList
    };
  }

  constructor(props) {
    super(props);

    this.state = this._getStateFromProps(props);
  }
  componentWillReceiveProps(nextProps) {
    this.setState(this._getStateFromProps(nextProps));
  }
  render() {
    let {
      children,
      ...props
    } = this.props;

    return (
      <div {...props}
        className={this.state.classList.join(' ')}
        ref={(ref) => this.element_ = ref}
      >{children}</div>
    );
  }
}
self.Actions = Actions;
self.Actions.cssName = 'mdl-card__actions';
self.Actions.propTypes = {
  "className": PropTypes.string.isRequired,
  "children": PropTypes.any.isRequired
};
self.Actions.defaultProps = {
  "className": "",
  "children": []
};
class Menu extends Component {

  _getStateFromProps(props) {
    const classList = getClassList(self.Menu, props);

    return {
      classList
    };
  }

  constructor(props) {
    super(props);

    this.state = this._getStateFromProps(props);
  }
  componentWillReceiveProps(nextProps) {
    this.setState(this._getStateFromProps(nextProps));
  }
  render() {
    let {
      children,
      ...props
    } = this.props;

    return (
      <div {...props}
        className={this.state.classList.join(' ')}
        ref={(ref) => this.element_ = ref}
      >{children}</div>
    );
  }
}
self.Menu = Menu;
self.Menu.cssName = 'mdl-card__menu';
self.Menu.propTypes = {
  "className": PropTypes.string.isRequired,
  "children": PropTypes.any.isRequired
};
self.Menu.defaultProps = {
  "className": "",
  "children": []
};
