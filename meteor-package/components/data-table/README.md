MaterialDataTable
================

All available options
---------------------
```HTML
<MaterialDataTable
    {String} id
    {String} [className=""]
    {Array.<Object>} [data=[]]
        An array of data objects to be displayed in the table.
    {Boolean} [selectable=false]
        Set to true to add a checkbox column.
    {Boolean} [ripple=false]
        Set to true to add ripple to the checkboxes.
    {Array.<String>} [selection]
        An array of IDs of the data items that should be selected.
        This makes the component a controlled one.
    {Array.<String>} [defaultSelection]
        An array of IDs of the data items that should be selected by default.
        This should not be given along with 'selection'.
    {Function} [onSelectRow]
        Only when 'selectable' is set to true, triggers when a row is selected.
        Return false to prevent the change.
        Function is called with the event as the first argument and the ID of
            the selected data item as the second argument.
    {Function} [onDeselectRow]
        Only when 'selectable' is set to true, triggers when a row is
            deselected.
        Return false to prevent the change.
        Function is called with the event as the first argument and the ID of
            the selected data item as the second argument.
    {Function} [onSelectionChange]
        Only when 'selectable' is set to true, triggers when row selection is
            changed.
        Function is called with the event as the first argument and the array of
            selected row ids as the second argument.
>

  <MaterialDataTable.Rows>

    <MaterialDataTable.Column
      {String} field
          Name of the field of the data.
      {Function} [formatter]
          Format the field value for displaying.
          Function is called with the field value as the first argument, the
              field name as the second argument and the data item as the third
              argument.
    >Column Title</MaterialDataTable.Column>

  </MaterialDataTable.Rows>

</MaterialDataTable>
```
