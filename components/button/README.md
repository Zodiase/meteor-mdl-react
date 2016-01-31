MaterialButton
==============

All available options
---------------------
```HTML
<MaterialButton
    className={extraClassnames}
    disabled={isDisabled}
    colored={isColored}
    raised={isRaised}
    primary={isPrimary}
    accent={isAccent}
    fab={isFab}
    icon={isIcon}
>
Content
</MaterialButton>
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
