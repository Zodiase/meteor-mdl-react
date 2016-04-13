import { Meteor } from 'meteor/meteor';
import { expect } from 'meteor/practicalmeteor:chai';
import { MDlReact } from 'meteor/zodiase:mdl-react';

const components = [
  'MaterialButton',
  'MaterialLayout',
  'MaterialRipple',
  'MaterialSpinner',
  'MaterialTextfield'
];

describe("mdl-react", () => {
  it("should export", () => {
    expect(MDlReact).to.not.be.undefined;
    for (let component of components) {
      expect(MDlReact[component]).to.not.be.undefined;
    }
  });
});
