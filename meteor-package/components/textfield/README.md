MaterialTextfield
=================

All available options
---------------------
```HTML
<MaterialTextfield
    id={id}
    className={extraClassnames}
    readOnly={isReadOnly}
    disabled={isDisabled}
    type={type}
    multiline={multiline}
    label={label}
    pattern={pattern}
    errorMessage={errorMessage}
    floatingLabel={floatingLabel}
    expandable={isExpandable}
    icon={icon}
>
Content
</MaterialTextfield>
```

Examples
--------
Single-line text field with a standard label.
```HTML
<MaterialTextfield id="fname" label="First name" />
<!-- Equivalent to (with zodiase:mdl) -->
<div class="mdl-textfield mdl-js-textfield">
  <input class="mdl-textfield__input" type="text" id="fname">
  <label class="mdl-textfield__label" for="fname">First name</label>
</div>
```

Single-line text field with a floating label.
```HTML
<MaterialTextfield id="addr1" label="Address line 1" floatingLabel />
<!-- Equivalent to (with zodiase:mdl) -->
<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
  <input class="mdl-textfield__input" type="text" id="addr1">
  <label class="mdl-textfield__label" for="addr1">Address line 1</label>
</div>
```

Single-line text field with a standard label, pattern matching, and error message.
```HTML
<MaterialTextfield id="phone" label="Phone" pattern="[0-9]*" errorMessage="Digits only" />
<!-- Equivalent to (with zodiase:mdl) -->
<div class="mdl-textfield mdl-js-textfield">
  <input class="mdl-textfield__input" type="text" pattern="[0-9]*" id="phone">
  <label class="mdl-textfield__label" for="phone">Phone</label>
  <span class="mdl-textfield__error">Digits only</span>
</div>
```

Multi-line text field with one visible input line.
```HTML
<MaterialTextfield id="schools" label="Schools attended" multiline rows="1" />
<!-- Equivalent to (with zodiase:mdl) -->
<div class="mdl-textfield mdl-js-textfield">
  <textarea class="mdl-textfield__input" type="text" rows="1" id="schools"></textarea>
  <label class="mdl-textfield__label" for="schools">Schools attended</label>
</div>
```

Multi-line text field with one visible input line and floating label.
```HTML
<MaterialTextfield id="schools" label="Schools attended" multiline rows="1" floatingLabel />
<!-- Equivalent to (with zodiase:mdl) -->
<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
  <textarea class="mdl-textfield__input" type="text" rows= "1" id="schools"></textarea>
  <label class="mdl-textfield__label" for="schools">Schools attended</label>
</div>
```

Multi-line text field with multiple visible input lines and a maximum number of lines.
```HTML
<MaterialTextfield id="schools" label="Schools attended (max. 6)" multiline rows="3" maxRows="6" />
<!-- Equivalent to (with zodiase:mdl) -->
<div class="mdl-textfield mdl-js-textfield">
  <textarea class="mdl-textfield__input" type="text" rows="3" maxrows="6" id="schools"></textarea>
  <label class="mdl-textfield__label" for="schools">Schools attended (max. 6)</label>
</div>
```

Expandable text field with a standard label.
```HTML
<MaterialTextfield id="search-expandable" label="Search text" expandable icon="search" />
<!-- Equivalent to (with zodiase:mdl) -->
<div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable">
  <label class="mdl-button mdl-js-button mdl-button--icon" for="search-expandable">
    <i class="material-icons">search</i>
  </label>
  <div class="mdl-textfield__expandable-holder">
    <input class="mdl-textfield__input" type="text" id="search-expandable">
    <label class="mdl-textfield__label" for="search-expandable">Search text</label>
  </div>
</div>
```

Expandable text field with a floating label.
```HTML
<MaterialTextfield id="search-expandable2" label="Enter search text below" expandable icon="search" floatingLabel />
<!-- Equivalent to (with zodiase:mdl) -->
<div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable mdl-textfield--floating-label">
  <label class="mdl-button mdl-js-button mdl-button--icon" for="search-expandable2">
    <i class="material-icons">search</i>
  </label>
  <div class="mdl-textfield__expandable-holder">
    <input class="mdl-textfield__input" type="text" id="search-expandable2">
    <label class="mdl-textfield__label" for="search-expandable2">
      Enter search text below
    </label>
  </div>
</div>
```
