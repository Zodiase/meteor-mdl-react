MaterialCheckbox
================

All available options
---------------------
```HTML
<MaterialCheckbox
    {String} id
    {String} [className=""]
    {Boolean} [checked]
    {Boolean} [defaultChecked]
    {String} [name]
    {String} [value]
    {Boolean} [disabled=false]
    {Boolean} [ripple=false]
    {Function} [onChange]
>
Label
</MaterialCheckbox>
```

Styling (SASS)
--------------
```SCSS
@import "{zodiase:mdl-react}/components/checkbox/checkbox";
// If ripple effect is needed, also need to import it.
@import "{zodiase:mdl-react}/components/ripple/ripple";
```

Examples
--------
A checkbox with a ripple click effect.
```HTML
<MaterialCheckbox id="chkbox1" ripple>Enable AutoSave</MaterialCheckbox>

<!-- Equivalent to (with zodiase:mdl) -->

<label id="chkbox1" for="chkbox1__input" class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect">
  <input type="checkbox" id="chkbox1__input" class="mdl-checkbox__input">
  <span class="mdl-checkbox__label">Enable AutoSave</span>
</label>
```
