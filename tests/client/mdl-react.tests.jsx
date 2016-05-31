import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import { describe, it } from 'meteor/practicalmeteor:mocha';
import { expect } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { render } from 'react-dom';
import { MDlReact } from 'meteor/zodiase:mdl-react';

import MaterialButtonTests from './imports/MaterialButton.tests.js';
import MaterialCardTests from './imports/MaterialCard.tests.js';
import MaterialCheckboxTests from './imports/MaterialCheckbox.tests.js';
import MaterialDataTableTests from './imports/MaterialDataTable.tests.js';
import MaterialLayoutTests from './imports/MaterialLayout.tests.js';
import MaterialSpinnerTests from './imports/MaterialSpinner.tests.js';
import MaterialTabsTests from './imports/MaterialTabs.tests.js';
import MaterialTextfieldTests from './imports/MaterialTextfield.tests.js';

const components = [
  'MaterialButton',
  'MaterialCard',
  'MaterialCheckbox',
  'MaterialDataTable',
  'MaterialLayout',
  'MaterialRipple',
  'MaterialSpinner',
  'MaterialTabs',
  'MaterialTextfield'
];

Meteor.startup(() => {

  const $renderContainer = $('<div id="render-container">');
  $renderContainer
  .css({
    position: 'fixed',
    top: '0',
    right: '0',
    bottom: '0',
    left: '0',
    padding: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    zIndex: '2'
  })
  .appendTo(document.body);

  const $renderSwitch = $('<div id="render-switch">');
  $renderSwitch
  .css({
    position: 'fixed',
    top: '0',
    left: '0',
    width: '30px',
    height: '30px',
    borderRadius: '0 0 10px 0',
    backgroundColor: 'red',
    zIndex: '3',
    display: 'block',
    cursor: 'pointer'
  })
  .click(() => {
    if ($renderContainer.css('display') === 'block') {
      $renderContainer.css('display', 'none');
    } else {
      $renderContainer.css('display', 'block');
    }
  })
  .appendTo(document.body);

  const createContainer = () => {
    return $('<div>').appendTo($renderContainer)[0];
  };

  describe("mdl-react", () => {

    it("should export", () => {
      expect(MDlReact).to.not.be.undefined;
      for (let component of components) {
        expect(MDlReact[component]).to.not.be.undefined;
      }
    });

  });

  MaterialButtonTests(createContainer);

  MaterialCardTests(createContainer);

  MaterialCheckboxTests(createContainer);

  MaterialDataTableTests(createContainer);

  MaterialLayoutTests(createContainer);

  MaterialSpinnerTests(createContainer);

  MaterialTabsTests(createContainer);

  MaterialTextfieldTests(createContainer);

});