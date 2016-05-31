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
 * MaterialDataTable
 * @version 1.1.3
 * @since 1.1.3
 * @see {@link https://github.com/jasonmayes/mdl-component-design-pattern}
 *
 * Controlled:
 *   - Provide:
 *     - `selection`.
 *   - Should not Provide:
 *     - `defaultSelection`.
 * Uncontrolled otherwise.
 */
class MaterialDataTable extends Component {

  /**
   * Determine the component is controlled or not by its props.
   * @param {Object} props
   */
  _isControlled(props) {
    if (typeof props.selection === 'undefined') {
      // Uncontrolled.
      return false;
    } else {
      // Controlled.

      // Can not have defaultSelection.
      if (typeof props.defaultSelection !== 'undefined') {
        throw new Error('MaterialDataTable must be either controlled or uncontrolled (specify either the selection prop, or the defaultSelection prop, but not both).');
      }

      return true;
    }
  }

  /**
   * Returns true if all items are in the selected set.
   * @param {Array.<Object>} items
   * @param {Set.<String>} selectedSet
   * @returns {Boolean}
   */
  _isAllSelected(items, selectedSet) {
    let result = true;
    for (let item of items) {
      if (!selectedSet.has(item._id)) {
        result = false;
        break;
      }
    }
    return result;
  }

  /**
   * Helper for converting a set to an array.
   * @param {Set.<String>} selectedSet
   */
  _getSelection(selectedSet) {
    const selection = [];
    if (selectedSet instanceof Set) {
      selectedSet.forEach((docId, index) => {
        selection.push(docId);
      });
    }
    return selection;
  }

  /**
   * Callback when a row is selected or deselected.
   * @param {Object} event - The original event causing the change.
   * @param {String} docId - The id of the data item for the row.
   * @param {Boolean} checked
   */
  _onRowSelectedChange(event, docId, checked) {
    const selection_prev = this.state.selection;
    const selection_next = new Set(selection_prev);

    handleExtraHandler(
      () => {
        return this.state[checked ? 'onSelectRow' : 'onDeselectRow'];
      },
      // If the former function prevents default, this won't run.
      (event, docId) => {
        selection_next[checked ? 'add': 'delete'](docId);
      }
    )(event, docId);

    if (!this.state.isControlled) {
      const allSelected = this._isAllSelected(this.data, selection_next);
      this.setState({
        selection: selection_next,
        allSelected
      });
    }

    if (typeof this.state.onSelectionChange === 'function') {
      const newSelection = this._getSelection(selection_next);
      this.state.onSelectionChange(event, newSelection);
    }
  }

  /**
   * Callback when the 'select-all' is toggled.
   * @param {Object} event - The original event causing the change.
   */
  _onAllSelectedChange(event) {
    const checked = event.currentTarget.checked;

    const selection_prev = this.state.selection;
    const selection_next = new Set(selection_prev);

    for (let item of this.data) {
      const itemSelected = selection_prev.has(item._id);
      // No need to do anything if:
      //   - We are selecting all and this item is already in selection.
      //   - We are deselecting all and this item is not in selection.
      if (checked && itemSelected || !checked && !itemSelected) {
        continue;
      }

      // Select or deselect everything.
      handleExtraHandler(
        () => {
          return this.state[checked ? 'onSelectRow' : 'onDeselectRow'];
        },
        // If the former function prevents default, this won't run.
        (event, docId) => {
          selection_next[checked ? 'add': 'delete'](docId);
        }
      )(event, item._id);
    }

    // onSelectRow/onDeselectRow may reject one of the selection changes.
    if (!this.state.isControlled) {
      const allSelected = this._isAllSelected(this.data, selection_next);
      this.setState({
        selection: selection_next,
        allSelected
      });
    }

    if (typeof this.state.onSelectionChange === 'function') {
      const newSelection = this._getSelection(selection_next);
      this.state.onSelectionChange(event, newSelection);
    }
  }

  /**
   * Generate state object from props.
   * @param {Object} props
   */
  _getStateFromProps(props) {
    const firstRun = typeof this.state === 'undefined';

    let controlled_next = this._isControlled(props),
        selection_prev = new Set(props.defaultSelection);

    if (!firstRun) {
      const controlled_prev = this.state.isControlled;
      if (controlled_prev !== controlled_next) {
        controlled_next = controlled_prev;
        throw new Error('MaterialDataTable should not switch from uncontrolled to controlled (or vice versa).');
      }

      selection_prev = this.state.selection;
    }

    const selection_next = (controlled_next) ? new Set(props.selection) : selection_prev;

    const allSelected = this._isAllSelected(props.data, selection_next);

    const classList = getClassList(self, props);
    classList.push(this.CssClasses_.IS_UPGRADED);

    return {
      isControlled: controlled_next,

      onSelectRow: props.onSelectRow || null,
      onDeselectRow: props.onDeselectRow || null,
      onSelectionChange: props.onSelectionChange || null,

      // @type {Set.<String>}
      selection: selection_next,
      allSelected,
      classList
    };
  }

  selectAll() {
    //!
  }

  deselectAll() {
    //!
  }

  selectItem(docId) {
    //!
  }

  deselectItem(docId) {
    //!
  }

  selectRow(rowNum) {
    //!
  }

  deselectRow(rowNum) {
    //!
  }

  constructor(props) {
    super(props);

    this.boundRowSelectedChangeHandler = this._onRowSelectedChange.bind(this);
    this.boundAllSelectedChangeHandler = this._onAllSelectedChange.bind(this);

    this.state = this._getStateFromProps(props);
  }

  get element() {
    return this.element_;
  }

  /**
   * Returns the data source.
   * @returns {Array.<Object>}
   */
  get data() {
    return this.props.data;
  }

  /**
   * Returns the array of selected item IDs.
   * @returns {Array.<String>}
   */
  get selection() {
    return this._getSelection(this.state.selection);
  }

  /**
   * Returns the array of selected item IDs, sorted by the order in which the items appear in the data source.
   * @returns {Array.<String>}
   */
  get sortedSelection() {
    const result = [];
    for (let item of this.data) {
      if (this.state.selection.has(item._id)) {
        result.push(item._id);
      }
    }
    return result;
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this._getStateFromProps(nextProps));
  }
  render() {
    let {
      data,
      selectable,
      ripple,
      selection,
      onSelectRow,
      onDeselectRow,
      onSelectionChange,
      children,
      ...tableProps
    } = this.props;

    const selectedSet = this.state.selection;
    const allSelected = this.state.allSelected;

    // Ensure children is an array.
    children = makeArray(children);

    // Need to find the rows and extract the columns.
    let rowsObj = null;
    const columns = [];

    // Replace placeholders for Rows.
    // Do not change order.
    children = children.map((element, index) => {
      switch (element.type) {
        case self.Rows:
          if (rowsObj) {
            throw new RangeError('Can not have multiple `MaterialDataTable.Rows`.');
          }

          // Parse the children of rows and find columns.

          // Ensure children is an array.
          const children = makeArray(element.props.children);

          // Grab all the column definitions and ignore the rest.
          children.forEach((element, index) => {
            if (element.type !== self.Column) {
              throw new Error('Can only have `MaterialDataTable.Column` in `MaterialDataTable.Rows`.');
            }

            columns.push(element.props);
          });

          return rowsObj = (
            <RealRows {...element.props}
              tableId={tableProps.id}
              data={data}
              columns={columns}
              selectable={selectable}
              ripple={ripple}
              selection={selectedSet}
              onRowSelectedChange={this.boundRowSelectedChangeHandler}
              key={`child_${index}`}
            />
          );
          break;
        case self.Column:
          //! Warn about putting columns outside of rows?
          return element;
          break;
        default:
          return element;
          break;
      }
    });

    const headerColumns = [];

    if (selectable) {
      headerColumns.push(
        <th key="col_select" >
          <Components.MaterialCheckbox
            id={`${tableProps.id}__select-all`}
            className={self.prototype.CssClasses_.SELECT_ELEMENT}
            ripple={ripple}
            checked={allSelected}
            onChange={this.boundAllSelectedChangeHandler}
          />
        </th>
      );
    }

    columns.forEach((col, index) => {
      const classList = getClassList(self.Column, col);

      headerColumns.push(
        <th key={`col_${index}`}
          className={classList.join(' ')}
        >{col.children}</th>
      );
    });

    return (
      <table {...tableProps}
        className={this.state.classList.join(' ')}
        ref={(ref) => this.element_ = ref}
      >
        <thead>
          <tr>{headerColumns}</tr>
        </thead>
        {children}
      </table>
    );
  }
}
const self = Components.MaterialDataTable = MaterialDataTable;

self.cssName = 'mdl-data-table';
self.propTypes = {
  "id": PropTypes.string.isRequired,
  "className": PropTypes.string.isRequired,
  "data": PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired
  })).isRequired,
  "selectable": PropTypes.bool.isRequired,
  "ripple": PropTypes.bool.isRequired,
  "selection": PropTypes.arrayOf(PropTypes.string),
  "defaultSelection": PropTypes.arrayOf(PropTypes.string),
  "onSelectRow": PropTypes.func,
  "onDeselectRow": PropTypes.func,
  "onSelectionChange": PropTypes.func,
  "children": PropTypes.any.isRequired
};
self.defaultProps = {
  "className": "",
  "data": [],
  "selectable": false,
  "ripple": false,
  "children": []
};
registerClassNameFlags(self, {
  "selectable": "mdl-data-table--selectable"
});

// Code from MDL.

/**
 * Store constants in one place so they can be updated easily.
 *
 * @enum {string | number}
 * @private
 */
MaterialDataTable.prototype.Constant_ = {
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
MaterialDataTable.prototype.CssClasses_ = {
  DATA_TABLE: 'mdl-data-table',
  SELECTABLE: 'mdl-data-table--selectable',
  SELECT_ELEMENT: 'mdl-data-table__select',
  IS_SELECTED: 'is-selected',
  IS_UPGRADED: 'is-upgraded'
};

// Placeholder. Does nothing. Real magic happens in RealRows.
class Rows extends Component {render() {return null;}}
self.Rows = Rows;
self.Rows.cssName = '';
self.Rows.propTypes = {
  "className": PropTypes.string.isRequired,
  "children": PropTypes.any.isRequired
};
self.Rows.defaultProps = {
  "className": "",
  "children": []
};

class RealRows extends Rows {

  _onSelectedChange(docId, event) {
    if (typeof this.props.onRowSelectedChange === 'function') {
      this.props.onRowSelectedChange(event, docId, event.currentTarget.checked);
    }
  }

  _getStateFromProps(props) {
    return {
      classList: getClassList(self.Rows, props)
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
      tableId,
      data,
      columns,
      selectable,
      ripple,
      selection,
      onRowSelectedChange,
      children,
      ...props
    } = this.props;

    // Reset references.
    this.element_ = null;

    const rows = [];

    // Generate rows from data.
    data.forEach((item, index) => {
      const rowColumns = [];

      if (selectable) {
        rowColumns.push(
          <td key="col_select" >
            <Components.MaterialCheckbox
              id={`${tableId}__select-row-${index}`}
              className={self.prototype.CssClasses_.SELECT_ELEMENT}
              ripple={ripple}
              checked={selection.has(item._id)}
              onChange={this._onSelectedChange.bind(this, item._id)}
            />
          </td>
        );
      }

      columns.forEach((col, index) => {
        const classList = getClassList(self.Column, col),
              rawValue = item[col.field],
              displayValue = (typeof col.formatter === 'function')
                             ? col.formatter(rawValue, col.field, item)
                             : String(rawValue);

        rowColumns.push(
          <td key={`col_${index}`}
            className={classList.join(' ')}
          >{displayValue}</td>
        );
      });

      rows.push(
        <tr key={`row_${index}`} >{rowColumns}</tr>
      );
    });

    return (
      <tbody
        className={this.state.classList.join(' ')}
        ref={(ref) => this.element_ = ref}
      >{rows}</tbody>
    );
    return null;
  }
}

// Placeholder. Does nothing.
class Column extends Component {render() {return null;}}
self.Column = Column;
// self.Column.cssName = '';
self.Column.propTypes = {
  "className": PropTypes.string.isRequired,
  "field": PropTypes.string.isRequired,
  "formatter": PropTypes.func,
  "children": PropTypes.any.isRequired
};
self.Column.defaultProps = {
  "className": "",
  "children": []
};
registerClassNameFlags(self.Column, {
  "nonNumeric": "mdl-data-table__cell--non-numeric"
});
