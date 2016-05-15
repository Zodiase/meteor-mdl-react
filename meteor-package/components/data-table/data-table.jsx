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
let { getClassList, joinClassNames, makeArray, registerClassNameFlags } = Helers;

/**
 * MaterialDataTable
 * @version 1.1.3
 * @since 1.1.3
 * @see {@link https://github.com/jasonmayes/mdl-component-design-pattern}
 */
class MaterialDataTable extends Component {
}
const self = Components.MaterialDataTable = MaterialDataTable;

self.cssName = 'mdl-data-table';
self.propTypes = {
  "className": PropTypes.string.isRequired,
  "children": PropTypes.any.isRequired
};
self.defaultProps = {
  "className": "",
  "children": []
};
registerClassNameFlags(self, {
  "selectable": "mdl-data-table--selectable"
});

// Code from MDL.

