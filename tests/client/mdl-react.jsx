import { Meteor } from 'meteor/meteor';
import { $ } from 'meteor/jquery';
import { expect } from 'meteor/practicalmeteor:chai';
import React from 'react';
import { render } from 'react-dom';
import { MDlReact } from 'meteor/zodiase:mdl-react';

const {
  MaterialButton,
  MaterialCard,
  MaterialCheckbox,
  MaterialDataTable,
  MaterialLayout,
  MaterialRipple,
  MaterialSpinner,
  MaterialTabs,
  MaterialTextfield
} = MDlReact;

Meteor.startup(() => {

  window.React = React;

  const $renderContainer = $('<div id="render-container">').appendTo(document.body);

  const createContainer = (title) => {
    const renderSet = $('<div class="render-set">').appendTo($renderContainer);
    if (title) {
      $('<h2>').text(title).appendTo(renderSet);
    }
    const container = $('<div>').appendTo(renderSet);
    return container[0];
  };

  render(
    <div>
      <MaterialButton>normal</MaterialButton>
      <MaterialButton raised>raised</MaterialButton>
      <MaterialButton disabled>disabled</MaterialButton>
      <MaterialButton raised disabled>raised disabled</MaterialButton>
      <MaterialButton ripple>ripple</MaterialButton>
      <MaterialButton raised ripple>raised ripple</MaterialButton>
      <MaterialButton colored>colored</MaterialButton>
      <MaterialButton raised colored>raised colored</MaterialButton>
      <MaterialButton primary>primary</MaterialButton>
      <MaterialButton raised primary>raised primary</MaterialButton>
      <MaterialButton accent>accent</MaterialButton>
      <MaterialButton raised accent>raised accent</MaterialButton>
      <MaterialButton fab><i className="material-icons">add</i></MaterialButton>
      <MaterialButton icon><i className="material-icons">add</i></MaterialButton>
      <MaterialButton raised icon><i className="material-icons">add</i></MaterialButton>
    </div>
  , createContainer('Buttons'));

  render(
    <div>
      <MaterialCard>
        <MaterialCard.Title>
           <MaterialCard.TitleText>Auckland Sky Tower<br />Auckland, New Zealand</MaterialCard.TitleText>
        </MaterialCard.Title>
        <MaterialCard.Media>
          <img src="skytower.jpg" width="173" height="157" border="0" alt=""
           style={{padding: '10px'}} />
        </MaterialCard.Media>
        <MaterialCard.Text>
        The Sky Tower is an observation and telecommunications tower located in Auckland,
        New Zealand. It is 328 metres (1,076 ft) tall, making it the tallest man-made structure
        in the Southern Hemisphere.
        </MaterialCard.Text>
        <MaterialCard.Actions>
           <a href="http://en.wikipedia.org/wiki/Sky_Tower_%28Auckland%29">Wikipedia entry</a>
        </MaterialCard.Actions>
      </MaterialCard>
      <MaterialCard className="mdl-shadow--4dp">
        <MaterialCard.Media>
          <img src="skytower.jpg" width="173" height="157" border="0"
            alt="" style={{padding: '10px'}} />
        </MaterialCard.Media>
        <MaterialCard.Text>
          Auckland Sky Tower, taken March 24th, 2014
        </MaterialCard.Text>
        <MaterialCard.Text>
        The Sky Tower is an observation and telecommunications tower located in Auckland,
        New Zealand. It is 328 metres (1,076 ft) tall, making it the tallest man-made structure
        in the Southern Hemisphere.
        </MaterialCard.Text>
      </MaterialCard>
    </div>
  , createContainer('Card'));

  render(
    <div>
      <MaterialCheckbox id="checkbox-default-not-checked">Uncontrolled Not Checked</MaterialCheckbox>
      <MaterialCheckbox id="checkbox-default-checked" defaultChecked={true}>Uncontrolled Checked</MaterialCheckbox>
      <MaterialCheckbox id="checkbox-default-checked-ripple" defaultChecked={true} ripple>Uncontrolled Checked Ripple</MaterialCheckbox>
      <MaterialCheckbox id="checkbox-default-checked-disabled" defaultChecked={true} disabled>Uncontrolled Checked Disabled</MaterialCheckbox>
      <MaterialCheckbox id="checkbox-default-checked-disabled-ripple" defaultChecked={true} disabled ripple>Uncontrolled Checked Disabled Ripple</MaterialCheckbox>

      <MaterialCheckbox id="checkbox-not-checked" checked={false}>Controlled Not Checked</MaterialCheckbox>
      <MaterialCheckbox id="checkbox-checked" checked={true}>Controlled Checked</MaterialCheckbox>
      <MaterialCheckbox id="checkbox-checked-ripple" checked={true} ripple>Controlled Checked Ripple</MaterialCheckbox>
      <MaterialCheckbox id="checkbox-checked-disabled" checked={true} disabled>Controlled Checked Disabled</MaterialCheckbox>
      <MaterialCheckbox id="checkbox-checked-disabled-ripple" checked={true} disabled ripple>Controlled Checked Disabled Ripple</MaterialCheckbox>

      <MaterialCheckbox id="checkbox-ripple" ripple>Ripple Checkbox</MaterialCheckbox>

      {
        // MDL Example
      }
      <MaterialCheckbox id="chkbox1" ripple>Enable AutoSave</MaterialCheckbox>
    </div>
  , createContainer('Checkboxes'));

  render(
    <div>
      <MaterialDataTable
        id="datatable-non-selectable"
        data={[
          {
            _id: '1',
            value: Meteor.uuid()
          },
          {
            _id: '2',
            foo: '2_foo',
            value: Meteor.uuid()
          },
          {
            _id: '3',
            foo: '3_foo',
            bar: '3_bar',
            value: Meteor.uuid()
          }
        ]}
      >

        <MaterialDataTable.Rows>

          <MaterialDataTable.Column
            field="foo"
          >Column Foo</MaterialDataTable.Column>

          <MaterialDataTable.Column
            field="bar"
          >Column Bar</MaterialDataTable.Column>

          <MaterialDataTable.Column
            field="value"
            nonNumeric
          >Column Non-Numeric</MaterialDataTable.Column>

        </MaterialDataTable.Rows>

      </MaterialDataTable>
    </div>
  , createContainer('Non-selectable DataTable'));

  const tableData = [
          {
            _id: '1',
            value: Meteor.uuid()
          },
          {
            _id: '2',
            foo: '2_foo',
            value: Meteor.uuid()
          },
          {
            _id: '3',
            foo: '3_foo',
            bar: '3_bar',
            value: Meteor.uuid()
          }
        ],
        tableSelection = ['1', '3'];

  render(
    <div>
      <MaterialDataTable
        id="datatable-selectable"
        data={tableData}
        selectable
        ripple
        onSelectRow={function (event, docId) {
          console.info('onSelectRow', docId);
        }}
        onDeselectRow={function (event, docId) {
          console.info('onDeselectRow', docId);
        }}
        onSelectionChange={function (event, selection) {
          console.info('onSelectionChange', selection);
        }}
      >

        <MaterialDataTable.Rows>

          <MaterialDataTable.Column
            field="foo"
          >Column Foo</MaterialDataTable.Column>

          <MaterialDataTable.Column
            field="bar"
          >Column Bar</MaterialDataTable.Column>

          <MaterialDataTable.Column
            field="value"
            nonNumeric
          >Column Non-Numeric</MaterialDataTable.Column>

        </MaterialDataTable.Rows>

      </MaterialDataTable>
    </div>
  , createContainer('Uncontrolled Selectable DataTable'));

  render(
    <div>
      <MaterialDataTable
        id="datatable-selectable-default-selection"
        data={tableData}
        selectable
        ripple
        defaultSelection={tableSelection}
        onSelectRow={function (event, docId) {
          console.info('onSelectRow', docId);
        }}
        onDeselectRow={function (event, docId) {
          console.info('onDeselectRow', docId);
        }}
        onSelectionChange={function (event, selection) {
          console.info('onSelectionChange', selection);
        }}
      >

        <MaterialDataTable.Rows>

          <MaterialDataTable.Column
            field="foo"
          >Column Foo</MaterialDataTable.Column>

          <MaterialDataTable.Column
            field="bar"
          >Column Bar</MaterialDataTable.Column>

          <MaterialDataTable.Column
            field="value"
            nonNumeric
          >Column Non-Numeric</MaterialDataTable.Column>

        </MaterialDataTable.Rows>

      </MaterialDataTable>
    </div>
  , createContainer('Uncontrolled Selectable DataTable with Default Selection'));

  render(
    <div>
      <MaterialDataTable
        id="datatable-selectable-selection"
        data={tableData}
        selectable
        ripple
        selection={tableSelection}
        onSelectRow={function (event, docId) {
          console.info('onSelectRow', docId);
        }}
        onDeselectRow={function (event, docId) {
          console.info('onDeselectRow', docId);
        }}
        onSelectionChange={function (event, selection) {
          console.info('onSelectionChange', selection);
        }}
      >

        <MaterialDataTable.Rows>

          <MaterialDataTable.Column
            field="foo"
          >Column Foo</MaterialDataTable.Column>

          <MaterialDataTable.Column
            field="bar"
          >Column Bar</MaterialDataTable.Column>

          <MaterialDataTable.Column
            field="value"
            nonNumeric
          >Column Non-Numeric</MaterialDataTable.Column>

        </MaterialDataTable.Rows>

      </MaterialDataTable>
    </div>
  , createContainer('Controlled Selectable DataTable'));

  render(
    <div>
      <MaterialDataTable
        id="datatable-selectable-disabled"
        data={tableData}
        selectable
        ripple
        onSelectRow={function (event, docId) {
          console.info('onSelectRow', docId);
          if (docId === '2') {
            console.warn('Item disabled.');
            return false;
          }
        }}
        onDeselectRow={function (event, docId) {
          console.info('onDeselectRow', docId);
        }}
        onSelectionChange={function (event, selection) {
          console.info('onSelectionChange', selection);
        }}
      >

        <MaterialDataTable.Rows>

          <MaterialDataTable.Column
            field="foo"
          >Column Foo</MaterialDataTable.Column>

          <MaterialDataTable.Column
            field="bar"
          >Column Bar</MaterialDataTable.Column>

          <MaterialDataTable.Column
            field="value"
            nonNumeric
          >Column Non-Numeric</MaterialDataTable.Column>

        </MaterialDataTable.Rows>

      </MaterialDataTable>
    </div>
  , createContainer('Uncontrolled Selectable DataTable with the Second Row Disabled'));

  render(
    <MaterialTabs defaultTabId="p2" ripple>

      <MaterialTabs.TabBar>

        <MaterialTabs.Tab tabId="p1">Tab 1</MaterialTabs.Tab>
        <MaterialTabs.Tab tabId="p2">Tab 2</MaterialTabs.Tab>
        <MaterialTabs.Tab tabId="p3">Tab 3</MaterialTabs.Tab>

      </MaterialTabs.TabBar>

      <MaterialTabs.Panel tabId="p1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque ipsum eu metus mattis feugiat. Aenean vulputate ex non ex fermentum, id cursus urna porttitor. Maecenas gravida lobortis est vel faucibus. Curabitur diam ligula, eleifend vitae neque eget, facilisis laoreet lacus. Ut in efficitur erat. Pellentesque bibendum orci ac nunc consequat, vel ornare sapien accumsan. Morbi ultrices massa id urna tempus efficitur. Fusce sed mi eleifend, fermentum metus in, laoreet erat. Fusce vel suscipit odio, vel tincidunt velit. Nam laoreet mauris mi, vitae scelerisque nulla ornare ac. Vivamus hendrerit felis risus, vel bibendum justo accumsan efficitur. Sed scelerisque augue sit amet nunc mattis vulputate. Phasellus eu porta dui, nec congue nisi. Cras hendrerit orci non metus placerat porta. Aenean id metus lorem.
      </MaterialTabs.Panel>
      <MaterialTabs.Panel tabId="p2">
        Donec mollis augue et porta commodo. Praesent lobortis, sapien eu posuere vehicula, nisi turpis hendrerit lacus, sed tincidunt justo magna eu augue. Morbi eu maximus tellus. Morbi iaculis justo ornare leo malesuada viverra. Fusce vulputate mauris purus, vel interdum leo tincidunt quis. Praesent id sollicitudin turpis. Proin suscipit non sapien ac sollicitudin. Vestibulum lobortis nibh quis nunc pellentesque, sit amet lobortis diam laoreet. Curabitur at leo eros. Ut id efficitur massa. Pellentesque eleifend odio iaculis dui blandit, non auctor dui tincidunt.
      </MaterialTabs.Panel>
      <MaterialTabs.Panel tabId="p3">
        Aenean vestibulum ex vitae sapien ullamcorper convallis. Donec ex elit, efficitur nec tincidunt viverra, bibendum sit amet lorem. Integer ac leo suscipit, pharetra ante id, lobortis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum dolor a felis dictum dignissim. Suspendisse potenti. Nulla in iaculis nunc. Pellentesque at suscipit odio, at euismod risus. Integer commodo, lectus quis consectetur malesuada, tellus lectus semper nulla, ut convallis ex ex et diam. Morbi sit amet accumsan ante, dapibus blandit purus. Sed placerat bibendum elementum. Integer nulla odio, dignissim in tortor ac, posuere iaculis nibh. Phasellus felis dolor, pulvinar sed aliquam lacinia, condimentum consequat odio. Duis consectetur quam eu efficitur luctus. Aliquam ac luctus lorem. Quisque suscipit, ligula ut venenatis porttitor, ante ligula feugiat nisi, id mattis purus ligula vel arcu.
      </MaterialTabs.Panel>

    </MaterialTabs>
  , createContainer('Tabs with Ripple'));

  render(
    <MaterialTabs defaultTabId="p2">

      <MaterialTabs.TabBar>

        <MaterialTabs.Tab tabId="p1">Tab 1</MaterialTabs.Tab>
        <MaterialTabs.Tab tabId="p2">Tab 2</MaterialTabs.Tab>
        <MaterialTabs.Tab tabId="p3">Tab 3</MaterialTabs.Tab>

      </MaterialTabs.TabBar>

      <MaterialTabs.Panel tabId="p1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque ipsum eu metus mattis feugiat. Aenean vulputate ex non ex fermentum, id cursus urna porttitor. Maecenas gravida lobortis est vel faucibus. Curabitur diam ligula, eleifend vitae neque eget, facilisis laoreet lacus. Ut in efficitur erat. Pellentesque bibendum orci ac nunc consequat, vel ornare sapien accumsan. Morbi ultrices massa id urna tempus efficitur. Fusce sed mi eleifend, fermentum metus in, laoreet erat. Fusce vel suscipit odio, vel tincidunt velit. Nam laoreet mauris mi, vitae scelerisque nulla ornare ac. Vivamus hendrerit felis risus, vel bibendum justo accumsan efficitur. Sed scelerisque augue sit amet nunc mattis vulputate. Phasellus eu porta dui, nec congue nisi. Cras hendrerit orci non metus placerat porta. Aenean id metus lorem.
      </MaterialTabs.Panel>
      <MaterialTabs.Panel tabId="p2">
        Donec mollis augue et porta commodo. Praesent lobortis, sapien eu posuere vehicula, nisi turpis hendrerit lacus, sed tincidunt justo magna eu augue. Morbi eu maximus tellus. Morbi iaculis justo ornare leo malesuada viverra. Fusce vulputate mauris purus, vel interdum leo tincidunt quis. Praesent id sollicitudin turpis. Proin suscipit non sapien ac sollicitudin. Vestibulum lobortis nibh quis nunc pellentesque, sit amet lobortis diam laoreet. Curabitur at leo eros. Ut id efficitur massa. Pellentesque eleifend odio iaculis dui blandit, non auctor dui tincidunt.
      </MaterialTabs.Panel>
      <MaterialTabs.Panel tabId="p3">
        Aenean vestibulum ex vitae sapien ullamcorper convallis. Donec ex elit, efficitur nec tincidunt viverra, bibendum sit amet lorem. Integer ac leo suscipit, pharetra ante id, lobortis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum dolor a felis dictum dignissim. Suspendisse potenti. Nulla in iaculis nunc. Pellentesque at suscipit odio, at euismod risus. Integer commodo, lectus quis consectetur malesuada, tellus lectus semper nulla, ut convallis ex ex et diam. Morbi sit amet accumsan ante, dapibus blandit purus. Sed placerat bibendum elementum. Integer nulla odio, dignissim in tortor ac, posuere iaculis nibh. Phasellus felis dolor, pulvinar sed aliquam lacinia, condimentum consequat odio. Duis consectetur quam eu efficitur luctus. Aliquam ac luctus lorem. Quisque suscipit, ligula ut venenatis porttitor, ante ligula feugiat nisi, id mattis purus ligula vel arcu.
      </MaterialTabs.Panel>

    </MaterialTabs>
  , createContainer('Tabs without Ripple'));

  render(
    <MaterialTabs defaultTabId="p2">

      <MaterialTabs.TabBar>

        <span>Span</span>
        <MaterialTabs.Tab tabId="p1">Tab 1</MaterialTabs.Tab>
        <span>Span</span>
        <MaterialTabs.Tab tabId="p2">Tab 2</MaterialTabs.Tab>
        <span>Span</span>
        <MaterialTabs.Tab tabId="p3">Tab 3</MaterialTabs.Tab>
        <span>Span</span>

      </MaterialTabs.TabBar>

      <span>Span</span>
      <MaterialTabs.Panel tabId="p1">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque ipsum eu metus mattis feugiat. Aenean vulputate ex non ex fermentum, id cursus urna porttitor. Maecenas gravida lobortis est vel faucibus. Curabitur diam ligula, eleifend vitae neque eget, facilisis laoreet lacus. Ut in efficitur erat. Pellentesque bibendum orci ac nunc consequat, vel ornare sapien accumsan. Morbi ultrices massa id urna tempus efficitur. Fusce sed mi eleifend, fermentum metus in, laoreet erat. Fusce vel suscipit odio, vel tincidunt velit. Nam laoreet mauris mi, vitae scelerisque nulla ornare ac. Vivamus hendrerit felis risus, vel bibendum justo accumsan efficitur. Sed scelerisque augue sit amet nunc mattis vulputate. Phasellus eu porta dui, nec congue nisi. Cras hendrerit orci non metus placerat porta. Aenean id metus lorem.
      </MaterialTabs.Panel>
      <span>Span</span>
      <MaterialTabs.Panel tabId="p2">
        Donec mollis augue et porta commodo. Praesent lobortis, sapien eu posuere vehicula, nisi turpis hendrerit lacus, sed tincidunt justo magna eu augue. Morbi eu maximus tellus. Morbi iaculis justo ornare leo malesuada viverra. Fusce vulputate mauris purus, vel interdum leo tincidunt quis. Praesent id sollicitudin turpis. Proin suscipit non sapien ac sollicitudin. Vestibulum lobortis nibh quis nunc pellentesque, sit amet lobortis diam laoreet. Curabitur at leo eros. Ut id efficitur massa. Pellentesque eleifend odio iaculis dui blandit, non auctor dui tincidunt.
      </MaterialTabs.Panel>
      <span>Span</span>
      <MaterialTabs.Panel tabId="p3">
        Aenean vestibulum ex vitae sapien ullamcorper convallis. Donec ex elit, efficitur nec tincidunt viverra, bibendum sit amet lorem. Integer ac leo suscipit, pharetra ante id, lobortis nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque fermentum dolor a felis dictum dignissim. Suspendisse potenti. Nulla in iaculis nunc. Pellentesque at suscipit odio, at euismod risus. Integer commodo, lectus quis consectetur malesuada, tellus lectus semper nulla, ut convallis ex ex et diam. Morbi sit amet accumsan ante, dapibus blandit purus. Sed placerat bibendum elementum. Integer nulla odio, dignissim in tortor ac, posuere iaculis nibh. Phasellus felis dolor, pulvinar sed aliquam lacinia, condimentum consequat odio. Duis consectetur quam eu efficitur luctus. Aliquam ac luctus lorem. Quisque suscipit, ligula ut venenatis porttitor, ante ligula feugiat nisi, id mattis purus ligula vel arcu.
      </MaterialTabs.Panel>
      <span>Span</span>

    </MaterialTabs>
  , createContainer('Tabs with Impurity'));

  render(
    <MaterialTabs ripple defaultTabId="about-panel">
      <MaterialTabs.TabBar>
        <MaterialTabs.Tab tabId="about-panel">About the Beatles</MaterialTabs.Tab>
        <MaterialTabs.Tab tabId="members-panel">Members</MaterialTabs.Tab>
        <MaterialTabs.Tab tabId="albums-panel">Discography</MaterialTabs.Tab>
      </MaterialTabs.TabBar>
      <MaterialTabs.Panel tabId="about-panel">
        <p><b>The Beatles</b> were a four-piece musical group from Liverpool, England.
        Formed in 1960, their career spanned just over a decade, yet they are widely
        regarded as the most influential band in history.</p>
        <p>Their songs are among the best-loved music of all time. It is said that every
        minute of every day, a radio station somewhere is playing a Beatles song.</p>
      </MaterialTabs.Panel>
      <MaterialTabs.Panel tabId="members-panel">
        <p>The Beatles' members were:</p>
        <ul>
          <li>John Lennon (1940-1980)</li>
          <li>Paul McCartney (1942-)</li>
          <li>George Harrison (1943-2001)</li>
          <li>Ringo Starr (1940-)</li>
        </ul>
      </MaterialTabs.Panel>
      <MaterialTabs.Panel tabId="albums-panel">
        <p>The Beatles' original UK LPs, in order of release:</p>
        <ol>
          <li>Please Please Me (1963)</li>
          <li>With the Beatles (1963)</li>
          <li>A Hard Day's Night (1964)</li>
          <li>Beatles for Sale (1964)</li>
          <li>Help! (1965)</li>
          <li>Rubber Soul (1965)</li>
          <li>Revolver (1966)</li>
          <li>Sgt. Pepper's Lonely Hearts Club Band (1967)</li>
          <li>The Beatles ("The White Album", 1968)</li>
          <li>Yellow Submarine (1969)</li>
          <li>Abbey Road (1969)</li>
          <li>Let It Be (1970)</li>
        </ol>
      </MaterialTabs.Panel>
    </MaterialTabs>
  , createContainer('Tabs Example from MDL'));
});