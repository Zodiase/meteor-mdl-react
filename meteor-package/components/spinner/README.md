MaterialSpinner
===============

All available options
---------------------
```HTML
<MaterialSpinner
    {String} [className=""]
    {Boolean} [active=false]
    {Boolean} [singleColor=false]
/>
```

Styling (SASS)
--------------
```SCSS
@import "{zodiase:mdl-react}/components/spinner/spinner";
```

Examples
--------
A default spinner in a div.
```HTML
<MaterialSpinner active />
<!-- Equivalent to (with zodiase:mdl) -->
<div class="mdl-spinner mdl-js-spinner is-active"></div>
```

A single-color spinner in a div.
```HTML
<MaterialSpinner active singleColor />
<!-- Equivalent to (with zodiase:mdl) -->
<div class="mdl-spinner mdl-js-spinner mdl-spinner--single-color is-active"></div>
```
