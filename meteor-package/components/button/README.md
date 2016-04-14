MaterialButton
==============

All available options
---------------------
```HTML
<MaterialButton
    {String} [className=""]
    {Boolean} [disabled=false]
    {Boolean} [ripple=false]
    {Boolean} [colored=false]
    {Boolean} [raised=false]
    {Boolean} [primary=false]
    {Boolean} [accent=false]
    {Boolean} [fab=false]
    {Boolean} [icon=false]
>
Content
</MaterialButton>
```

Styling (SASS)
--------------
```SCSS
@import "{zodiase:mdl-react}/components/button/button";
// If ripple effect is needed, also need to import it.
@import "{zodiase:mdl-react}/components/ripple/ripple";
```

Examples
--------
A button with the "raised" effect.
```HTML
<MaterialButton raised>Save</MaterialButton>
<!-- Equivalent to (with zodiase:mdl) -->
<button class="mdl-button mdl-js-button mdl-button--raised">Save</button>
```

A button with the "fab" effect.
```HTML
<MaterialButton fab>OK</MaterialButton>
<!-- Equivalent to (with zodiase:mdl) -->
<button class="mdl-button mdl-js-button mdl-button--fab">OK</button>
```

A button with the "icon" and "colored" effects.
```HTML
<MaterialButton icon colored>?</MaterialButton>
<!-- Equivalent to (with zodiase:mdl) -->
<button class="mdl-button mdl-js-button mdl-button--icon mdl-button--colored">?</button>
```
